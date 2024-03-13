export const dynamic = "force-dynamic";
 import { SERVER_BASE_URL } from "@/constants";
import PersonalInfo from "@/src/components/applicant/PersonalInfo";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { authOptions } from "../../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";



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
    let response = await fetch(`${SERVER_BASE_URL}/api/applicant/personal?qry=${qry}`, { cache: 'no-store',headers:headers() });


    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}


export default async function Page({ searchParams }: any) {
    const session: any = await getServerSession(authOptions);
    const userRole = session?.user.userRoleId

    if (userRole != 4) {
        return redirect('/auth/login')
    }



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