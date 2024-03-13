export const dynamic = "force-dynamic";
import { SERVER_BASE_URL } from "@/constants";
import Applications from "@/src/components/applicant/Applications";
import { getServerSession } from "next-auth";

import { headers } from "next/headers";
import { authOptions } from "../../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";



async function getApplications(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/applicant/applications`, { cache: 'no-store' });


    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}


export default async function Page({ searchParams }: any) {
    const session: any = await getServerSession(authOptions);
    const userRole = session?.user.userRoleId

    if (userRole != 4) {
        return redirect('/auth/login')
    }


    const applications = await getApplications(searchParams)


    let data: any = {
        applications
    }

    return <Applications data={data} />


}