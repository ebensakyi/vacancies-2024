export const dynamic = "force-dynamic";
import { SERVER_BASE_URL } from "@/constants";
import ExamType from "@/src/components/admin/primary-data/ExamType";



async function getExamTypes(searchParams: any) {
    try {
         let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/exam-type?qry=${qry}`, { cache: 'no-store' });



    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();
    } catch (error) {
        console.log(error);
        
    }
   

}




export default async function Page({ searchParams }: any) {


    const examTypes = await getExamTypes(searchParams)


    let data: any = {
        examTypes
    }

    return <ExamType data={data} />


}