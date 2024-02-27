import { SERVER_BASE_URL } from "@/constants";
import StaffType from "@/src/components/admin/primary-data/StaffType";

export const dynamic = "force-dynamic";


async function getStaffTypes(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/staff-type?qry=${qry}`, { cache: 'no-store' });
    

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}




export default async function Page({ searchParams }: any) {


    const staffTypes = await getStaffTypes(searchParams)


    let data:any = {
        staffTypes
    }

    return <StaffType data={data} />


}


