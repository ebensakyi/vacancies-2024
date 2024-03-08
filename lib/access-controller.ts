import { redirect } from "next/navigation";

export const accessController = (accessiblePages: any, currentPath: any) => {

    console.log("accessController ==> ",accessiblePages);
    
  if (!accessiblePages?.includes(currentPath)) {
    return redirect("/");
  }
  console.log("HAS ACCESS");
};
