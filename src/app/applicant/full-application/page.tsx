export const dynamic = "force-dynamic";
 import { SERVER_BASE_URL } from "@/constants";
import FullApplication from "@/src/components/admin/FullApplication";




async function getApplication(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/applicant/full-application?qry=${qry}`, { cache: 'no-store' });


    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}


export default async function Page({ searchParams }: any) {


    const application = await getApplication(searchParams)
  

    let data: any = {
        application
    }

    return <FullApplication data={data} />


}