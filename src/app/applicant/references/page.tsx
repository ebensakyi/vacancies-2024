export const dynamic = "force-dynamic";
import { SERVER_BASE_URL } from "@/constants";
import Reference from "@/src/components/applicant/Reference";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

async function getReferences(searchParams: any) {
  let { qry } = searchParams;
  let response = await fetch(
    `${SERVER_BASE_URL}/api/applicant/references?qry=${qry}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return await response.json();
}

async function getStaffType(searchParams: any) {
  let { qry } = searchParams;
  let response = await fetch(
    `${SERVER_BASE_URL}/api/applicant/select-position/stafftype`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return await response.json();
}

export default async function Page({ searchParams }: any) {
  const session: any = await getServerSession(authOptions);
  const userRole = session?.user.userRoleId;

  if (userRole != 4) {
    return redirect("/auth/login");
  }

  const references = await getReferences(searchParams);
  const staffTypes = await getStaffType(searchParams);

  let data: any = {
    references,
    staffTypes,
  };

  return <Reference data={data} />;
}
