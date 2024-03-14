import { SERVER_BASE_URL } from "@/constants";
import Policy from "@/src/components/admin/configure/Policy";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { adminUser } from "@/lib/user-roles";

export const dynamic = "force-dynamic";


// import dynamic from "next/dynamic";

// const Notification = dynamic(() => import('@/src/components/messaging/Notification'), {
//     ssr: false, // Prevent pre-rendering at build time
//   });
async function getExamTypes(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/primary-data/exam-type?qry=${qry}`, { cache: 'no-store' });

    console.log(response);
    

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


    const examTypes = await getExamTypes(searchParams)


    let data:any = {
        examTypes
    }

    return <Policy data={data} />


}