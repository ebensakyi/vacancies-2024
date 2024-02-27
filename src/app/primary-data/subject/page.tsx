import { SERVER_BASE_URL } from "@/constants";
import Subject from "@/src/components/admin/primary-data/Subject";

export const dynamic = "force-dynamic";



async function getSubjects(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/subject?qry=${qry}`, { cache: 'no-store' });


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


async function getSubjectTypes(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/subject-type?qry=${qry}`, { cache: 'no-store' });


    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}



export default async function Page({ searchParams }: any) {


    const subjects = await getSubjects(searchParams)
    const examTypes = await getExamTypes(searchParams)
    const subjectTypes = await getSubjectTypes(searchParams)


    let data: any = {
        subjects, examTypes,subjectTypes
    }

    return <Subject data={data} />


}