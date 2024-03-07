export const dynamic = "force-dynamic";
 import { SERVER_BASE_URL } from "@/constants";
import Reference from "@/src/components/applicant/Reference";




async function getReferences(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/applicant/references?qry=${qry}`, { cache: 'no-store' });


    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}


export default async function Page({ searchParams }: any) {


    const references = await getReferences(searchParams)


    let data: any = {
        references
    }

    return <Reference data={data} />


}