import { SERVER_BASE_URL } from "@/constants";
import { adminUser } from "@/lib/user-roles";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/options";
import SetupPortal from "@/src/components/admin/SetupPortal";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";



async function getSetupPortal(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/admin/setup-portal?qry=${qry}`, { cache: 'no-store' });


    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}


async function getRecruitments(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/admin/recruitment?qry=${qry}`, { cache: 'no-store' });


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


    const currentSetup = await getSetupPortal(searchParams)
    const recruitments = await getRecruitments(searchParams)


    let data: any = {
        recruitments,currentSetup
    }

    return <SetupPortal data={data} />


}