export const dynamic = "force-dynamic";
import { SERVER_BASE_URL } from "@/constants";
import Dashboard from "@/src/components/admin/Dashboard";
import { authOptions } from "../../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { adminUser } from "@/lib/user-roles";


async function getApplicationSummary(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/admin/dashboard?qry=${qry}`, { cache: 'no-store' });
    

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}


async function getRecrutments(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/admin/recruitment?qry=${qry}`, { cache: 'no-store' });
    

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}


async function getStats(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/admin/dashboard?qry=${qry}`, { cache: 'no-store' });
    

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}



export default async function Page({ searchParams }: any) {

    const session: any = await getServerSession(authOptions);
    const userRole = session?.user.userRoleId

    if (!adminUser(userRole)) {
        return redirect('/auth/login')
    }



    const recruitments = await getRecrutments(searchParams)
    const stats = await getStats(searchParams)
    const applicationSummary = await getApplicationSummary(searchParams)
    


    let data:any = {
        recruitments,stats,applicationSummary
    }

    return <Dashboard data={data} />


}