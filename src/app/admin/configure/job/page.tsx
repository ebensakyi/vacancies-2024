import { SERVER_BASE_URL } from "@/constants";
import Job from "@/src/components/admin/configure/JobList";

export const dynamic = "force-dynamic";



async function getJobs(searchParams: any) {
    try {
        let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/configure/jobs?qry=${qry}`, { cache: 'no-store' });


    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();
 
    } catch (error) {
        console.log(error);
        
    }
   
}




export default async function Page({ searchParams }: any) {


    const jobs = await getJobs(searchParams)


    let data: any = {
        jobs
    }

    return <Job data={data} />


}