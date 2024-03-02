export const dynamic = "force-dynamic";
 import { SERVER_BASE_URL } from "@/constants";
import Employment from "@/src/components/application/Employment";
import Publication from "@/src/components/application/Publication";




async function getJobs(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/admin/job?qry=${qry}`, { cache: 'no-store' });


    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}


export default async function Page({ searchParams }: any) {


    const jobs = await getJobs(searchParams)


    let data: any = {
     jobs
    }

    return <Publication data={data} />


}