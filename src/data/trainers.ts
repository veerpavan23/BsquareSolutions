export interface Trainer {
  id: string;
  name: string;
  designation: string;
  experienceYears: number;
  certifications: string[];
  technologies: string[];
  coursesHandled: string[];
  rating: number;
  studentCount: number;
  linkedinUrl: string;
  bio: string;
  avatarText: string; // Initials or fallback SVG placeholder indicator
}

export const TRAINERS: Trainer[] = [
  {
    id: "trainer-sf-lead",
    name: "Senior Salesforce Architect",
    designation: "Lead Salesforce Instructor & Certified Application Architect",
    experienceYears: 14,
    certifications: [
      "Salesforce Certified Application Architect",
      "Salesforce Certified Administrator",
      "Salesforce Certified Platform Developer II",
      "Salesforce Certified AI Specialist"
    ],
    technologies: ["Salesforce Admin", "Apex", "LWC", "Flow", "Sales & Service Cloud"],
    coursesHandled: ["Salesforce Administrator", "Platform Developer I", "Lightning Web Components"],
    rating: 4.95,
    studentCount: 2400,
    linkedinUrl: "https://linkedin.com",
    bio: "Over 14+ years of industry experience leading enterprise CRM implementations across US & Indian multinational corporations. Passionate about mentoring students and transforming freshers into job-ready Salesforce developers.",
    avatarText: "SF"
  },
  {
    id: "trainer-pbi-lead",
    name: "Lead Data Analytics & Power BI Specialist",
    designation: "Microsoft Certified Power BI & Fabric Lead Trainer",
    experienceYears: 12,
    certifications: [
      "Microsoft Certified: Power BI Data Analyst Associate (PL-300)",
      "Microsoft Certified: Fabric Analytics Engineer Associate (DP-600)",
      "Microsoft Certified Trainer (MCT)"
    ],
    technologies: ["Power BI", "Power Query", "DAX", "Microsoft Fabric", "SQL", "Excel"],
    coursesHandled: ["Power BI Complete Masterclass", "Microsoft Fabric & Advanced DAX", "Business & Data Analytics"],
    rating: 4.92,
    studentCount: 1950,
    linkedinUrl: "https://linkedin.com",
    bio: "12+ years designing enterprise Business Intelligence solutions for Fortune 500 retail and financial clients. Has delivered over 80+ corporate training bootcamps for senior analytics teams.",
    avatarText: "BI"
  },
  {
    id: "trainer-tableau-lead",
    name: "Senior Visual Analytics Architect",
    designation: "Tableau Certified Data Analyst & Solution Architect",
    experienceYears: 10,
    certifications: [
      "Tableau Certified Data Analyst",
      "Tableau Desktop Specialist",
      "Alteryx Designer Core"
    ],
    technologies: ["Tableau Desktop", "Tableau Prep", "Tableau Server", "LOD Calculations", "SQL"],
    coursesHandled: ["Tableau Desktop & Server Master Class", "Business & Data Analytics"],
    rating: 4.88,
    studentCount: 1400,
    linkedinUrl: "https://linkedin.com",
    bio: "Specializes in executive dashboard design, visual data storytelling, and high-performance LOD calculations. Passionate about helping career switchers master visual analytics.",
    avatarText: "TB"
  },

];
