export const dynamic = "force-dynamic";
 import { SERVER_BASE_URL } from "@/constants";
import Certificate from "@/src/components/applicant/Certificate";

import { headers } from "next/headers";



async function getEduLevel(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/education-level`,{cache:'force-cache'});


    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getCertificates(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/applicant/certifications?qry=${qry}`, { cache: 'no-store',headers: headers() });


    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}


export default async function Page({ searchParams }: any) {


    const certificates = await getCertificates(searchParams)
    const educationLevels = await getEduLevel(searchParams)
  

    let data: any = {
        certificates,educationLevels
    }

    return <Certificate data={data} />


}