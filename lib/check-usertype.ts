import { verifyToken } from "./token-verifier"
import cookie from "cookie";
import { prisma } from "@/prisma/db";


export const getUserType = async (userId: any) => {
    try {
        let userType = await prisma.user.findFirst({ where: { id: userId } })
        return userType.userTypeId
    } catch (error) {
        console.log(">>>>>>>>>>", error);
    }
};