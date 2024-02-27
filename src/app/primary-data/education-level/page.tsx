import { SERVER_BASE_URL } from "@/constants";
import EducationLevel from "@/src/components/admin/primary-data/EducationLevel";
export const dynamic = "force-dynamic";



async function getEducationLevels(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/edu-level?qry=${qry}`, { cache: 'no-store' });

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}




export default async function Page({ searchParams }: any) {


    const educationLevels = await getEducationLevels(searchParams)


    let data: any = {
        educationLevels
    }

    return <EducationLevel data={data} />


}