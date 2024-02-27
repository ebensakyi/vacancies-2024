import { SERVER_BASE_URL } from "@/constants";
import Grade from "@/src/components/admin/primary-data/Grade";

export const dynamic = "force-dynamic";


// import dynamic from "next/dynamic";

// const Notification = dynamic(() => import('@/src/components/messaging/Notification'), {
//     ssr: false, // Prevent pre-rendering at build time
//   });
async function getGrades(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/grade?qry=${qry}`, { cache: 'no-store' });
    

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}




export default async function Page({ searchParams }: any) {


    const grades = await getGrades(searchParams)


    let data:any = {
        grades
    }

    return <Grade data={data} />


}