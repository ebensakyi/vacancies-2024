export const dynamic = "force-dynamic";
import { SERVER_BASE_URL } from "@/constants";
import JobAdvert from "@/src/components/admin/JobAdvert";



async function getPolicies(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/admin/policy?qry=${qry}`, { cache: 'no-store' });


    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}


async function getJobAds(searchParams: any) {
    try {
        let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/admin/job-advert?qry=${qry}`, { cache: 'no-store' });


    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();
 
    } catch (error) {
        console.log(error);
        
    }
   
}




export default async function Page({ searchParams }: any) {


    const jobAds = await getJobAds(searchParams)
    const policies = await getPolicies(searchParams)


    let data: any = {
        jobAds,policies
    }

    return <JobAdvert data={data} />


}