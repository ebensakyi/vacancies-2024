export const dynamic = "force-dynamic";
import { SERVER_BASE_URL } from "@/constants";
import DegreePrefix from "@/src/components/admin/primary-data/DegreePrefix";



// import dynamic from "next/dynamic";

// const Notification = dynamic(() => import('@/src/components/messaging/Notification'), {
//     ssr: false, // Prevent pre-rendering at build time
//   });
async function getDegreePrefixes(searchParams: any) {
    try {
          let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/degree-prefix?qry=${qry}`);



    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

    } catch (error) {
        console.log("getDegreePrefixes===>");
        
    }
  
}




export default async function Page({ searchParams }: any) {


    const degrees = await getDegreePrefixes(searchParams)


    let data = {
        degrees
    }

    return <DegreePrefix data={data} />


}