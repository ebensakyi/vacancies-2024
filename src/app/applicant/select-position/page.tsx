export const dynamic = "force-dynamic";
 import { SERVER_BASE_URL } from "@/constants";
import SelectPositions from "@/src/components/applicant/SelectPositions";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { authOptions } from "../../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";




async function getPositions(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/admin/job?pub=1`, { cache: 'no-store', headers: headers() });


    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}

async function getSelectedPositions(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/applicant/select-position?qry=${qry}`, { cache: 'no-store', headers: headers() });

    

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


    const jobs = await getPositions(searchParams)
    const selectedPositions = await getSelectedPositions(searchParams)


    let data: any = {
     jobs,selectedPositions
    }

    return <SelectPositions data={data} />


}