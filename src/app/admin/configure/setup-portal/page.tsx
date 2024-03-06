import { SERVER_BASE_URL } from "@/constants";
import SetupPortal from "@/src/components/admin/SetupPortal";

export const dynamic = "force-dynamic";



async function getUserRoles(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/user-role?qry=${qry}`, { cache: 'no-store' });


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


    const userRoles = await getUserRoles(searchParams)
    const recruitments = await getRecruitments(searchParams)


    let data: any = {
        userRoles,recruitments
    }

    return <SetupPortal data={data} />


}