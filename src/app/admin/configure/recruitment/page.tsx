import { SERVER_BASE_URL } from "@/constants";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/options";
import Recruitment from "@/src/components/admin/Recruitment";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";



async function getUserRoles(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/user-role?qry=${qry}`, { cache: 'no-store' });


    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getStaffType(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/staff-type?qry=${qry}`, { cache: 'no-store' });


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

    if (userRole != 1 || userRole != 2 || userRole != 3) {
        return redirect('/auth/admin/login')
    }



    const userRoles = await getUserRoles(searchParams)
    const staffTypes = await getStaffType(searchParams)
    const recruitments = await getRecruitments(searchParams)


    let data: any = {
        userRoles,staffTypes,recruitments
    }

    return <Recruitment data={data} />


}