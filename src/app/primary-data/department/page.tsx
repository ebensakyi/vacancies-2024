export const dynamic = "force-dynamic";
import { SERVER_BASE_URL } from "@/constants";
import Department from "@/src/components/admin/primary-data/Department";



async function getDepartments(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/department?qry=${qry}`, { cache: 'no-store' });
    

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getDivisions(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/division?qry=${qry}`, { cache: 'no-store' });
    

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}



export default async function Page({ searchParams }: any) {


    const departments = await getDepartments(searchParams)
    const divisions = await getDivisions(searchParams)


    let data:any = {
        departments,divisions
    }

    return <Department data={data} />


}


