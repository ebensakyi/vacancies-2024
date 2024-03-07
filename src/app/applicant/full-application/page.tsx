export const dynamic = "force-dynamic";
 import { SERVER_BASE_URL } from "@/constants";
import FullApplication from "@/src/components/applicant/FullApplication";
import { headers } from "next/headers";




async function getApplication(searchParams: any) {
    let { id } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/applicant/full-application?id=${id}`, { cache: 'no-store',headers:headers() });


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