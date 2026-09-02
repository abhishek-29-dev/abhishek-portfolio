export const contact = {
  email: "aj29abhishek@gmail.com",
  linkedin: "https://www.linkedin.com/in/abhishek-j-dev",
  github: "https://github.com/abhishek-29-dev",
  phone: "+91 95137 87521",
} as const;

const BASE = import.meta.env.BASE_URL;

export const pdfs = {
  resume: `${BASE}Abhishek_J_Resume.pdf`,
  certificate: `${BASE}Abhishek_J_Internship_Certificate.pdf`,
} as const;