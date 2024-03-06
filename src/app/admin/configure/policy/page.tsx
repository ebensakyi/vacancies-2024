export const dynamic = "force-dynamic";
import { SERVER_BASE_URL } from "@/constants";
import Policy from "@/src/components/admin/configure/Policy";


async function getPolicies(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/admin/policy?qry=${qry}`, { cache: 'no-store' });


    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}



async function getEducationLevel(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/education-level?qry=${qry}`, { cache: 'no-store' });


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


    const levels = await getEducationLevel(searchParams)
    const policies = await getPolicies(searchParams)
    const recruitments = await getRecruitments(searchParams)


    let data: any = {
        levels,policies,recruitments
    }

    return <Policy data={data} />


}