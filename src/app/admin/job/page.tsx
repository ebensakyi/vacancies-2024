import { SERVER_BASE_URL } from "@/constants";
import Job from "@/src/components/admin/Job";

export const dynamic = "force-dynamic";



async function getJobs(searchParams: any) {
    try {
        let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/admin/job?qry=${qry}`, { cache: 'no-store' });


    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();
 
    } catch (error) {
        console.log(error);
        
    }
   
}

async function getPolicies(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/admin/policy?qry=${qry}`, { cache: 'no-store' });


    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}





export default async function Page({ searchParams }: any) {


    const jobs = await getJobs(searchParams)
    const policies = await getPolicies(searchParams)


    let data: any = {
        jobs,policies
    }

    return <Job data={data} />


}