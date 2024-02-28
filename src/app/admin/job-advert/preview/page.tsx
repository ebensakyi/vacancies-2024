export const dynamic = "force-dynamic";
import { SERVER_BASE_URL } from "@/constants";
import JobAdvertPreview from "@/src/components/admin/JobAdvertPreview";
import { headers } from "next/headers"


async function getJobById(searchParams: any) {
    let { id } = searchParams


    let response = await fetch(`${SERVER_BASE_URL}/api/admin/job-advert/preview?id=${id}`, { cache: 'no-store', headers: headers() });


    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}





export default async function Page({ searchParams }: any) {


    const job = await getJobById(searchParams)


    let data: any = {
        job
    }

    return <JobAdvertPreview data={data} />


}