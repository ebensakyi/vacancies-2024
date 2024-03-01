export const dynamic = "force-dynamic";
 import { SERVER_BASE_URL } from "@/constants";
import PersonalInfo from "@/src/components/application/PersonalInfo";



async function getSex(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/sex`);


    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getTitle(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/admin/title`);


    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getMaritalStatus(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/marital-status`);


    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}


async function getPersonalInfo(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/admin/job?qry=${qry}`, { cache: 'no-store' });


    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}


export default async function Page({ searchParams }: any) {


    const personalInfo = await getPersonalInfo(searchParams)
    const sexes = await getSex(searchParams)
    const maritalStatuses = await getMaritalStatus(searchParams)
    const titles = await getTitle(searchParams)


    let data: any = {
        personalInfo,sexes,maritalStatuses,titles
    }

    return <PersonalInfo data={data} />


}