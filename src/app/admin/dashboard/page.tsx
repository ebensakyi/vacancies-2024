import { SERVER_BASE_URL } from "@/constants";
import Dashboard from "@/src/components/admin/Dashboard";


export const dynamic = "force-dynamic";


async function getExamTypes(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/exam-type?qry=${qry}`, { cache: 'no-store' });
    

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}




export default async function Page({ searchParams }: any) {


    const examTypes = await getExamTypes(searchParams)


    let data:any = {
        examTypes
    }

    return <Dashboard data={data} />


}