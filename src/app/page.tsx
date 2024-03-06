export const dynamic = "force-dynamic";

import { SERVER_BASE_URL } from "@/constants";

import ExternalJobAdverts from "../components/ExternalJobAdverts";

async function getJobAds(searchParams:any) {
  try {
    let response = await fetch(`${SERVER_BASE_URL}/api/admin/job-advert`, { cache: 'force-cache' });


    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }
    return await response.json();

  } catch (error) {
    console.log(error);

  }

}
export default async function Page({ searchParams }: any) {


  const jobAds = await getJobAds(searchParams)


  let data: any = {
    jobAds
  }


  return <ExternalJobAdverts data={data} />
}

