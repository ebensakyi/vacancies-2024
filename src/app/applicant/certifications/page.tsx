export const dynamic = "force-dynamic";
 import { SERVER_BASE_URL } from "@/constants";
import Certificate from "@/src/components/applicant/Certificate";
import { getServerSession } from "next-auth";

import { headers } from "next/headers";
import { authOptions } from "../../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";



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
    const session: any = await getServerSession(authOptions);
    const userRole = session?.user.userRoleId

    if (userRole != 4) {
        return redirect('/auth/login')
    }



    const certificates = await getCertificates(searchParams)
    const educationLevels = await getEduLevel(searchParams)
  

    let data: any = {
        certificates,educationLevels
    }

    return <Certificate data={data} />


}