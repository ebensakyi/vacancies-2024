import { SERVER_BASE_URL } from "@/constants";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/options";
import BroadsheetPositionSummary from "@/src/components/admin/broadsheet/BroadsheetPositionSummary";
import { getServerSession } from "next-auth";
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

    const session: any = await getServerSession(authOptions);
    const userRole = session

    const positionSummaries = await getPositionSummary(searchParams)


    let data: any = {
        positionSummaries
    }

    return <BroadsheetPositionSummary data={data} />


}