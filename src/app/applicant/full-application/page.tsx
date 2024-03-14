export const dynamic = "force-dynamic";
 import { SERVER_BASE_URL } from "@/constants";
import FullApplication from "@/src/components/applicant/FullApplication";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { authOptions } from "../../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { applicantUser } from "@/lib/user-roles";




async function getApplication(searchParams: any) {
    let { id } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/applicant/full-application?id=${id}`, { cache: 'no-store',headers:headers() });


    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return await response.json();

}


export default async function Page({ searchParams }: any) {
    const session: any = await getServerSession(authOptions);
    const userRole = session?.user.userRoleId

 
    if (!applicantUser(userRole)) {
        return redirect('/auth/login')
    }


    const application = await getApplication(searchParams)


    let data: any = {
        application
    }

    return <FullApplication data={data} />


}