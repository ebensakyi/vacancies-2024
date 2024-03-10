import { SERVER_BASE_URL } from "@/constants";
import BroadsheetPositionSummary from "@/src/components/admin/broadsheet/BroadsheetPositionSummary";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";



async function getPositionSummary(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/admin/broadsheet/position-summary?qry=${qry}`, { cache: 'no-store',headers:headers() });

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}




export default async function Page({ searchParams }: any) {


    const positionSummaries = await getPositionSummary(searchParams)


    let data: any = {
        positionSummaries
    }

    return <BroadsheetPositionSummary data={data} />


}