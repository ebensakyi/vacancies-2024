export const dynamic = "force-dynamic";
 import { SERVER_BASE_URL } from "@/constants";
import Publication from "@/src/components/applicant/Publication";




async function getPublications(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/applicant/publication?qry=${qry}`, { cache: 'no-store' });


    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}


export default async function Page({ searchParams }: any) {


    const publications = await getPublications(searchParams)


    let data: any = {
        publications
    }

    return <Publication data={data} />


}