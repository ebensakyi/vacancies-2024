import { SERVER_BASE_URL } from "@/constants";
import Broadsheet from "@/src/components/admin/broadsheet/Broadsheet";
import BroadsheetPositionSummary from "@/src/components/admin/broadsheet/BroadsheetPositionSummary";

export const dynamic = "force-dynamic";



async function getBroadsheets(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/admin/broadshhet?qry=${qry}`, { cache: 'no-store' });



    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}




export default async function Page({ searchParams }: any) {


    const broadsheet = await getBroadsheets(searchParams)


    let data: any = {
        broadsheet
    }

    return <Broadsheet data={data} />


}