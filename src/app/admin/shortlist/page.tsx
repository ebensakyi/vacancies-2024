export const dynamic = "force-dynamic";
import { SERVER_BASE_URL } from "@/constants";
import Shortlist from "@/src/components/admin/Shortlist";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";





async function getApplication(searchParams: any) {
    let { id } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/admin/shortlist?id=${id}`, { cache: 'no-store' });



    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}


async function getRejectReasons(searchParams: any) {
    let { id } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/reject-reason?id=${id}`, { cache: 'no-store' });



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



    const application = await getApplication(searchParams)
    const rejectReasons = await getRejectReasons(searchParams)


    let data: any = {
        application,rejectReasons
    }

    return <Shortlist data={data} />


}