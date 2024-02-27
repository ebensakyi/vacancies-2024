export default {
  personal: { name: "PERSONAL", condition: "==", requiredCount: 1 },
  schools: { name: "SCHOOLS", condition: ">=", requiredCount: 1 },
  grades: { name: "GRADE", condition: ">=", requiredCount: 5 },
  references: { name: "REFERENCES", condition: "==", requiredCount: 3 },
  publications: { name: "PUBLICATIONS", condition: "==", requiredCount: 1 },
  certifications: { name: "CERTIFICATIONS", condition: "==", requiredCount: 1 },
  positions: { name: "POSITIONS", condition: "==", requiredCount: 1 },
  employment: { name: "EMPLOYMENT", condition: ">=", requiredCount: 1 },

};
