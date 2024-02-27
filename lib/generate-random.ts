const randomstring = require("randomstring");

export const genCode = async (length) => {
    const password = await randomstring.generate({
      length: length,
      charset: "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789",
    });
    return password;
  };
  