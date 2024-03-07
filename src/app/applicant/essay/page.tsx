export const dynamic = "force-dynamic";
 import { SERVER_BASE_URL } from "@/constants";
import { Essay } from "@/src/components/applicant/Essay";




async function getEssay(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/applicant/essay?qry=${qry}`, { cache: 'no-store' });


    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}


export default async function Page({ searchParams }: any) {


    const essay = await getEssay(searchParams)
  

    let data: any = {
        essay
    }

    return <Essay data={data} />


}