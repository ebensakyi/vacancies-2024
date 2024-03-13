export const dynamic = "force-dynamic";
 import { SERVER_BASE_URL } from "@/constants";
import { Essay } from "@/src/components/applicant/Essay";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";




async function getEssay(searchParams: any) {
    let { qry } = searchParams
    let response = await fetch(`${SERVER_BASE_URL}/api/applicant/essay?qry=${qry}`, { cache: 'no-store' });


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



    const essay = await getEssay(searchParams)
  

    let data: any = {
        essay
    }

    return <Essay data={data} />


}