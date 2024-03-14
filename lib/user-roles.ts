export let adminUser = (userRole: number) => {
  let adminRole = [1, 2, 3];
 return adminRole.includes(userRole);
};

export let applicantUser = (userRole: number) => {
    let applicantRole = [4];
   return applicantRole.includes(userRole);
  };
  