export const dynamic = "force-dynamic";
 import { SERVER_BASE_URL } from "@/constants";
import Applications from "@/src/components/applicant/Applications";

import { headers } from "next/headers";



async function getApplications(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/applicant/applications`,{cache:'force-cache'});


    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}


export default async function Page({ searchParams }: any) {


    const applications = await getApplications(searchParams)
  

    let data: any = {
       applications
    }

    return <Applications data={data} />


}