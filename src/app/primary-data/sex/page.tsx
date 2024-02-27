export const dynamic = "force-dynamic";
import { SERVER_BASE_URL } from "@/constants";
import Sex from "@/src/components/admin/primary-data/Sex";



// import dynamic from "next/dynamic";

// const Notification = dynamic(() => import('@/src/components/messaging/Notification'), {
//     ssr: false, // Prevent pre-rendering at build time
//   });
async function getSexes(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/exam-type?qry=${qry}`, { cache: 'no-store' });
    

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}




export default async function Page({ searchParams }: any) {


    const sexes = await getSexes(searchParams)


    let data:any = {
        sexes
    }

    return <Sex data={data} />


}