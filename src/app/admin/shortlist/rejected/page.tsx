export const dynamic = "force-dynamic";
import { SERVER_BASE_URL } from "@/constants";
import Rejected from "@/src/components/admin/Rejected";





async function getApplication(searchParams: any) {
    let { id } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/admin/shortlist/rejected?id=${id}`, { cache: 'no-store' });



    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}


async function getRejectReasons(searchParams: any) {
    let { id } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/reject-reason?id=${id}`, { cache: 'no-store' });



    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}


export default async function Page({ searchParams }: any) {


    const application = await getApplication(searchParams)
    const rejectReasons = await getRejectReasons(searchParams)


    let data: any = {
        application,rejectReasons
    }

    return <Rejected data={data} />


}