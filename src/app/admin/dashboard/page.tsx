export const dynamic = "force-dynamic";
import { SERVER_BASE_URL } from "@/constants";
import Dashboard from "@/src/components/admin/Dashboard";


async function getApplicationSummary(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/admin/dashboard?qry=${qry}`, { cache: 'no-store' });
    

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}


async function getRecrutments(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/admin/recruitment?qry=${qry}`, { cache: 'no-store' });
    

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}


async function getStats(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/admin/dashboard?qry=${qry}`, { cache: 'no-store' });
    

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}



export default async function Page({ searchParams }: any) {


    const recruitments = await getRecrutments(searchParams)
    const stats = await getStats(searchParams)
    const applicationSummary = await getApplicationSummary(searchParams)
    


    let data:any = {
        recruitments,stats,applicationSummary
    }

    return <Dashboard data={data} />


}