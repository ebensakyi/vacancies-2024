export const dynamic = "force-dynamic";
import { SERVER_BASE_URL } from "@/constants";
import Broadsheet from "@/src/components/admin/broadsheet/Broadsheet";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { headers } from "next/headers";




async function getBroadsheets(searchParams: any) {

    let { page } = searchParams
    let { searchText } = searchParams
    let { id } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/admin/broadsheet?id=${id}&page=${page}&searchText=${searchText}`, { cache: 'no-store',headers: headers() });



    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}




export default async function Page({ searchParams }: any) {

    const session: any = await getServerSession(authOptions);
    const userRole = session?.user.userRoleId

    if (userRole != 1 && userRole != 2 && userRole != 3) {
        return redirect('/auth/admin/login')
    }


    const broadsheet = await getBroadsheets(searchParams)


    let data: any = {
        broadsheet
    }

    return <Broadsheet data={data} />


}