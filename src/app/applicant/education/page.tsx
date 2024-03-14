export const dynamic = "force-dynamic";
 import { SERVER_BASE_URL } from "@/constants";
import Education from "@/src/components/applicant/Education";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/options";
import { applicantUser } from "@/lib/user-roles";



async function getEducationLevel(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/education-level?qry=${qry}`, { cache: 'no-store' });


    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getSchoolsAttended(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/applicant/education/schools-attended?qry=${qry}`, { cache: 'no-store' });


    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getExamTypes(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/exam-type?qry=${qry}`, { cache: 'no-store' });


    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}


async function getVerified(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/applicant/education/index-numbers?qry=${qry}`, { cache: 'no-store' });


    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}


export default async function Page({ searchParams }: any) {
    const session: any = await getServerSession(authOptions);
    const userRole = session?.user.userRoleId

  
    if (!applicantUser(userRole)) {
        return redirect('/auth/login')
    }


    const educationLevels = await getEducationLevel(searchParams)
    const examTypes = await getExamTypes(searchParams)
    const schoolsAttended = await getSchoolsAttended(searchParams)
    const verifiedIndexNumbers = await getVerified(searchParams)


    let data: any = {
        educationLevels,examTypes,schoolsAttended,verifiedIndexNumbers
    }

    return <Education data={data} />


}