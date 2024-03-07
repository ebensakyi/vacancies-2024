export const dynamic = "force-dynamic";
 import { SERVER_BASE_URL } from "@/constants";
import Employment from "@/src/components/applicant/Employment";




async function getEmployments(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/applicant/employment?qry=${qry}`, { cache: 'no-store' });


    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}


export default async function Page({ searchParams }: any) {


    const employments = await getEmployments(searchParams)
  

    let data: any = {
       employments
    }

    return <Employment data={data} />


}