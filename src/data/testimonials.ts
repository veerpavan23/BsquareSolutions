export interface Testimonial {
  id: string;
  type: "written" | "video" | "certification" | "career-transition";
  studentName: string;
  role: string;
  previousRole?: string;
  courseTaken: string;
  rating: number;
  content: string;
  videoUrl?: string; // Mock video embed URL
  certificationAchieved?: string;
  batchYear: string;
  avatarText: string;
  projectShowcaseTitle?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-01",
    type: "career-transition",
    studentName: "Sample Student Profile A",
    role: "Salesforce Certified Administrator",
    previousRole: "Non-IT Customer Support Executive",
    courseTaken: "Salesforce Administrator (ADM-201)",
    rating: 5,
    content: "The structured hands-on project practice and step-by-step Flow automation modules helped me successfully clear my Salesforce ADM-201 exam on the first attempt.",
    certificationAchieved: "Salesforce Certified Administrator (ADM-201)",
    batchYear: "2025 Batch",
    avatarText: "SA",
    projectShowcaseTitle: "Healthcare Lead-to-Case CRM Implementation"
  },
  {
    id: "test-02",
    type: "certification",
    studentName: "Sample Student Profile B",
    role: "Power BI Data Analyst",
    previousRole: "Junior Excel Reporting Analyst",
    courseTaken: "Power BI Complete Masterclass",
    rating: 5,
    content: "Learning Star Schema modeling and DAX CALCULATE from an active industry practitioner made all the difference. The mock exams prepared me thoroughly for the Microsoft PL-300 exam.",
    certificationAchieved: "Microsoft Certified: Power BI Data Analyst Associate (PL-300)",
    batchYear: "2025 Batch",
    avatarText: "SB",
    projectShowcaseTitle: "Supply Chain & Retail Executive Dashboard"
  },
  {
    id: "test-03",
    type: "career-transition",
    studentName: "Sample Student Profile C",
    role: "Salesforce Developer",
    previousRole: "Fresher B.Tech Graduate",
    courseTaken: "Platform Developer I (Apex & LWC)",
    rating: 5,
    content: "The Apex trigger handler framework practice and LWC real-time projects gave me immense confidence during technical interviews. BSquare's mock interview feedback was spot on.",
    certificationAchieved: "Salesforce Certified Platform Developer I",
    batchYear: "2026 Batch",
    avatarText: "SC",
    projectShowcaseTitle: "Asynchronous Financial Claims Processing Engine"
  },
  {
    id: "test-04",
    type: "written",
    studentName: "Sample Student Profile D",
    role: "Tableau Data Visualizer",
    previousRole: "Business Operations Specialist",
    courseTaken: "Tableau Desktop Master Class",
    rating: 5,
    content: "Understanding Level of Detail (LOD) expressions and Tableau Prep data cleansing changed how I approach complex enterprise reporting.",
    certificationAchieved: "Tableau Certified Data Analyst",
    batchYear: "2025 Batch",
    avatarText: "SD"
  },
  {
    id: "test-05",
    type: "video",
    studentName: "Sample Student Profile E",
    role: "Generative AI Specialist",
    previousRole: "Software Developer",
    courseTaken: "Generative AI & LLM Engineering",
    rating: 5,
    content: "Building production RAG pipelines with LangChain and vector databases in class gave me the exact skills needed for modern AI projects.",
    videoUrl: "https://www.youtube.com/embed/sample",
    certificationAchieved: "BSquare Certified GenAI Architect",
    batchYear: "2026 Batch",
    avatarText: "SE"
  }
];

export const CAREER_STATS_DISCLAIMER = "Professionals trained by BSquare have pursued careers across leading global organizations.";
