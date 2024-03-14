export const dynamic = "force-dynamic";
import { SERVER_BASE_URL } from "@/constants";
import { adminUser } from "@/lib/user-roles";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/options";
import Rejected from "@/src/components/admin/Rejected";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";





async function getApplication(searchParams: any) {
    let { id } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/admin/shortlist/rejected?id=${id}`, { cache: 'no-store' });



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
    if (!adminUser(userRole)) {
        return redirect('/auth/login')
    }



    const application = await getApplication(searchParams)
    const rejectReasons = await getRejectReasons(searchParams)


    let data: any = {
        application,rejectReasons
    }

    return <Rejected data={data} />


}