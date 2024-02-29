import { SERVER_BASE_URL } from "@/constants";
import UserRole from "@/src/components/admin/configure/UserRole";

export const dynamic = "force-dynamic";



async function getUserRoles(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/admin/configure/user-role?qry=${qry}`, { cache: 'no-store' });


    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getPages(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/page?qry=${qry}`, { cache: 'no-store' });


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


    const userRoles = await getUserRoles(searchParams)
    const pages = await getPages(searchParams)
    const jobs = await getJobs(searchParams)


    let data: any = {
        userRoles,pages,jobs
    }

    return <UserRole data={data} />


}