export const educationCheck = async (education: any, eduLevel: any) => {
  let _eduLevel = Number(eduLevel)
  const has = await convertToArray(education).includes(_eduLevel);
  return has
};

function convertToArray(education: any[]) {
  return education.map((element: { educationLevelId: any; }) => element.educationLevelId);
}
