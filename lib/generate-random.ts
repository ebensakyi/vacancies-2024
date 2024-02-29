import randomstring from "randomstring";

export const genCode = async (length:number) => {
    const password = await randomstring.generate({
      length: length,
      charset: "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789",
    });
    return password;
  };
  