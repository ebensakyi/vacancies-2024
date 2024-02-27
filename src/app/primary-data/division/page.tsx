import { SERVER_BASE_URL } from "@/constants";
import Division from "@/src/components/admin/primary-data/Division";

export const dynamic = "force-dynamic";


async function getDivisions(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/division?qry=${qry}`, { cache: 'no-store' });
    

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}




export default async function Page({ searchParams }: any) {


    const divisions = await getDivisions(searchParams)


    let data:any = {
        divisions
    }

    return <Division data={data} />


}


