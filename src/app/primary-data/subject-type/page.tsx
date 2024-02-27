import { SERVER_BASE_URL } from "@/constants";
import SubjectType from "@/src/components/admin/primary-data/SubjectType";

export const dynamic = "force-dynamic";



async function getSubjectTypes(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/exam-type?qry=${qry}`, { cache: 'no-store' });

    console.log(response);
    

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}




export default async function Page({ searchParams }: any) {


    const subjectTypes = await getSubjectTypes(searchParams)


    let data:any = {
        subjectTypes
    }

    return <SubjectType data={data} />


}