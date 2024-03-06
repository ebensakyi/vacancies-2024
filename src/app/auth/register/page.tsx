import { SERVER_BASE_URL } from "@/constants";
import { Register } from "@/src/components/auth/Register";

export const dynamic = "force-dynamic";




export default async function Page({ searchParams }: any) {


    return <Register  />


}