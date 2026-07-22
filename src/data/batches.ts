export interface UpcomingBatch {
  id: string;
  courseId: string;
  courseName: string;
  startDate: string;
  dayType: "Weekday Batch (Mon-Thu)" | "Weekend Batch (Sat-Sun)" | "Fast-Track Batch";
  timing: string;
  mode: "Online Live" | "Classroom (Hybrid)" | "Online & Classroom";
  trainerName: string;
  availableSeats: number;
  totalSeats: number;
  status: "Filling Fast" | "Open for Enrollment" | "Almost Full" | "New Batch";
  courseSlug: string;
}

export const UPCOMING_BATCHES: UpcomingBatch[] = [
  {
    id: "batch-sf-adm-01",
    courseId: "sf-admin",
    courseName: "Salesforce Administrator (ADM-201)",
    startDate: "2026-08-03",
    dayType: "Weekday Batch (Mon-Thu)",
    timing: "07:30 AM - 09:00 AM IST",
    mode: "Online Live",
    trainerName: "Senior Salesforce Architect",
    availableSeats: 4,
    totalSeats: 15,
    status: "Filling Fast",
    courseSlug: "salesforce-administrator"
  },
  {
    id: "batch-sf-dev-02",
    courseId: "sf-dev1",
    courseName: "Platform Developer I (Apex & Visualforce)",
    startDate: "2026-08-08",
    dayType: "Weekend Batch (Sat-Sun)",
    timing: "10:00 AM - 01:00 PM IST",
    mode: "Online & Classroom",
    trainerName: "Senior Salesforce Architect",
    availableSeats: 6,
    totalSeats: 20,
    status: "Open for Enrollment",
    courseSlug: "platform-developer-1"
  },
  {
    id: "batch-pbi-01",
    courseId: "pbi-masterclass",
    courseName: "Power BI Complete Masterclass (PL-300)",
    startDate: "2026-08-04",
    dayType: "Weekday Batch (Mon-Thu)",
    timing: "08:00 PM - 09:30 PM IST",
    mode: "Online Live",
    trainerName: "Lead Data Analytics & Power BI Specialist",
    availableSeats: 3,
    totalSeats: 18,
    status: "Almost Full",
    courseSlug: "power-bi-masterclass"
  },
  {
    id: "batch-tableau-01",
    courseId: "tableau-mastery",
    courseName: "Tableau Desktop & Server Master Class",
    startDate: "2026-08-10",
    dayType: "Weekend Batch (Sat-Sun)",
    timing: "02:00 PM - 05:00 PM IST",
    mode: "Online Live",
    trainerName: "Senior Visual Analytics Architect",
    availableSeats: 8,
    totalSeats: 15,
    status: "New Batch",
    courseSlug: "tableau-desktop-mastery"
  },
  {
    id: "batch-sf-lwc-01",
    courseId: "sf-lwc",
    courseName: "Lightning Web Components (LWC) & Modern JS",
    startDate: "2026-08-11",
    dayType: "Weekday Batch (Mon-Thu)",
    timing: "07:00 AM - 08:30 AM IST",
    mode: "Online Live",
    trainerName: "Senior Salesforce Architect",
    availableSeats: 5,
    totalSeats: 15,
    status: "Filling Fast",
    courseSlug: "lightning-web-components"
  },
  {
    id: "batch-genai-01",
    courseId: "genai-engineering",
    courseName: "Generative AI & LLM Engineering Masterclass",
    startDate: "2026-08-15",
    dayType: "Weekend Batch (Sat-Sun)",
    timing: "10:00 AM - 01:00 PM IST",
    mode: "Online Live",
    trainerName: "Principal AI & Data Science Consultant",
    availableSeats: 7,
    totalSeats: 20,
    status: "New Batch",
    courseSlug: "generative-ai-engineering"
  },
  {
    id: "batch-data-analytics-01",
    courseId: "data-analytics-bootcamp",
    courseName: "Business & Data Analytics Career Bootcamp",
    startDate: "2026-08-05",
    dayType: "Weekday Batch (Mon-Thu)",
    timing: "06:30 PM - 08:00 PM IST",
    mode: "Classroom (Hybrid)",
    trainerName: "Lead Data Analytics & Power BI Specialist",
    availableSeats: 2,
    totalSeats: 15,
    status: "Almost Full",
    courseSlug: "business-data-analytics"
  }
];
