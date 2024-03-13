export const dynamic = "force-dynamic";
 import { SERVER_BASE_URL } from "@/constants";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/options";
import User from "@/src/components/admin/User";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";



async function getDepartment(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/department?qry=${qry}`, { cache: 'no-store' });


    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getUsers(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/admin/user?qry=${qry}`, { cache: 'no-store' });


    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getUserRoles(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/user-role?qry=${qry}`, { cache: 'no-store' });


    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}


async function getJobs(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/admin/job?qry=${qry}`, { cache: 'no-store' });


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



    const users = await getUsers(searchParams)
    const departments = await getDepartment(searchParams)
    const userRoles = await getUserRoles(searchParams)
    const jobs = await getJobs(searchParams)


    let data: any = {
        users,departments,userRoles,jobs
    }

    return <User data={data} />


}