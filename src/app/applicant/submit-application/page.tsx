export const dynamic = "force-dynamic";
 import { SERVER_BASE_URL } from "@/constants";
import { SubmitApplication } from "@/src/components/applicant/SubmitApplication";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";




async function getSelectedPositions(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/admin/job?qry=${qry}`, { cache: 'no-store' });


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



    const selectedPositions = await getSelectedPositions(searchParams)


    let data: any = {
     selectedPositions
    }

    return <SubmitApplication data={data} />


}