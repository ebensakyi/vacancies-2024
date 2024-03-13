import { SERVER_BASE_URL } from "@/constants";
import Job from "@/src/components/admin/Job";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";



async function getJobs(searchParams: any) {
    try {
        let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/admin/job?qry=${qry}`, { cache: 'no-store' });


    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();
 
    } catch (error) {
        console.log(error);
        
    }
   
}

async function getPolicies(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/admin/policy?qry=${qry}`, { cache: 'no-store' });


    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}





export default async function Page({ searchParams }: any) {

    const session: any = await getServerSession(authOptions);
    const userRole = session?.user.userRoleId

    if (userRole != 1 && userRole != 2 && userRole != 3) {
        return redirect('/auth/admin/login')
    }



    const jobs = await getJobs(searchParams)
    const policies = await getPolicies(searchParams)


    let data: any = {
        jobs,policies
    }

    return <Job data={data} />


}