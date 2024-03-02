export const dynamic = "force-dynamic";
 import { SERVER_BASE_URL } from "@/constants";
import PersonalInfo from "@/src/components/applicant/PersonalInfo";



async function getSex(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/sex`,{cache:'force-cache'});


    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getTitle(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/title`,{cache:'force-cache'});


    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getMaritalStatus(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/marital-status`,{cache:'force-cache'});


    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getYesNo(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/yes-no`,{cache:'force-cache'});


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
    const yesNo = await getYesNo(searchParams)


    let data: any = {
        personalInfo,sexes,maritalStatuses,titles,yesNo,
    }

    return <PersonalInfo data={data} />


}