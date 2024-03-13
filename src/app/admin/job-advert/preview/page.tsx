export const dynamic = "force-dynamic";
import { SERVER_BASE_URL } from "@/constants";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/options";
import JobAdvertPreview from "@/src/components/admin/JobAdvertPreview";
import { getServerSession } from "next-auth";
import { headers } from "next/headers"
import { redirect } from "next/navigation";


async function getJobById(searchParams: any) {
    let { id } = searchParams


    let response = await fetch(`${SERVER_BASE_URL}/api/admin/job-advert/preview?id=${id}`, { cache: 'no-store', headers: headers() });


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


    const job = await getJobById(searchParams)


    let data: any = {
        job
    }

    return <JobAdvertPreview data={data} />


}