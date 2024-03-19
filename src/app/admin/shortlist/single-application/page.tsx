export const dynamic = "force-dynamic";
import { SERVER_BASE_URL } from "@/constants";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/options";
import Broadsheet from "@/src/components/admin/broadsheet/Broadsheet";
import SingleApplication from "@/src/components/admin/broadsheet/SingleApplication";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";




async function getApplication(searchParams: any) {
    let { id } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/admin/broadsheet/single-application?id=${id}`, { cache: 'no-store' });



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

    return <SingleApplication data={data} />


}