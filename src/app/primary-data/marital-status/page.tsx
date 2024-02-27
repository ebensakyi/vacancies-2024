import { SERVER_BASE_URL } from "@/constants";
import MaritalStatus from "@/src/components/admin/primary-data/MaritalStatus";

export const dynamic = "force-dynamic";


// import dynamic from "next/dynamic";

// const Notification = dynamic(() => import('@/src/components/messaging/Notification'), {
//     ssr: false, // Prevent pre-rendering at build time
//   });
async function getMaritalStatus(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/exam-type?qry=${qry}`, { cache: 'no-store' });

    console.log(response);
    

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}




export default async function Page({ searchParams }: any) {


    const maritalStatuses = await getMaritalStatus(searchParams)


    let data:any = {
        maritalStatuses
    }

    return <MaritalStatus data={data} />


}