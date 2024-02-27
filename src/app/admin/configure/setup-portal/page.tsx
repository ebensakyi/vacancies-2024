import { SERVER_BASE_URL } from "@/constants";
import SetupPortal from "@/src/components/admin/SetupPortal";

export const dynamic = "force-dynamic";



async function getUserRoles(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/user-role?qry=${qry}`, { cache: 'no-store' });


    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}




export default async function Page({ searchParams }: any) {


    const userRoles = await getUserRoles(searchParams)


    let data: any = {
        userRoles
    }

    return <SetupPortal data={data} />


}