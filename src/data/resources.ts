export interface InterviewQuestion {
  id: string;
  category: "salesforce" | "power-bi" | "tableau" | "python" | "sql";
  topic: string;
  question: string;
  answer: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  category: "salesforce-admin" | "power-bi-dax" | "tableau-lod" | "python-sql";
  questionText: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  type: "guide" | "cheatsheet" | "project-template" | "webinar" | "mock-exam";
  category: string;
  description: string;
  downloadUrl?: string;
  readTimeOrDuration: string;
  badge?: string;
}

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  {
    id: "iq-sf-01",
    category: "salesforce",
    topic: "Apex Triggers",
    question: "What is the difference between a Before Trigger and an After Trigger in Salesforce?",
    answer: "Before Triggers are used to update or validate record values BEFORE they are saved to the database. They do not require an explicit DML statement. After Triggers are used to access system-generated field values (such as Record ID, CreatedDate) and affect changes to OTHER related records.",
    difficulty: "Intermediate"
  },
  {
    id: "iq-sf-02",
    category: "salesforce",
    topic: "Security & Sharing",
    question: "What happens when OWD is set to Private for an Object?",
    answer: "When Organization-Wide Default (OWD) is set to Private, users can only view and edit records that they own, plus records shared with them via Role Hierarchy, Sharing Rules, Manual Sharing, or Apex Managed Sharing.",
    difficulty: "Beginner"
  },
  {
    id: "iq-pbi-01",
    category: "power-bi",
    topic: "DAX Evaluation Context",
    question: "Explain the difference between Filter Context and Row Context in DAX.",
    answer: "Row Context exists during the calculation of calculated columns or iterative functions (like SUMX), evaluating row-by-row. Filter Context is the set of filters applied by slicers, report filters, and visuals before a measure is calculated. CALCULATE transforms Row Context into Filter Context.",
    difficulty: "Advanced"
  },
  {
    id: "iq-tableau-01",
    category: "tableau",
    topic: "LOD Expressions",
    question: "How does FIXED LOD differ from INCLUDE and EXCLUDE LOD in Tableau?",
    answer: "FIXED computes aggregations using only the specified dimensions, ignoring dimensions present in the view. INCLUDE computes using the view dimensions plus additional specified dimensions. EXCLUDE computes using the view dimensions while subtracting the specified dimensions.",
    difficulty: "Advanced"
  },
  {
    id: "iq-sql-01",
    category: "sql",
    topic: "Window Functions",
    question: "What is the difference between RANK(), DENSE_RANK(), and ROW_NUMBER() in SQL?",
    answer: "ROW_NUMBER() assigns a unique sequential integer to each row. RANK() assigns the same rank to duplicate values but leaves gaps in the sequence. DENSE_RANK() assigns the same rank to duplicate values without leaving any gaps.",
    difficulty: "Intermediate"
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "quiz-sf-01",
    category: "salesforce-admin",
    questionText: "Which automation tool in Salesforce allows building interactive multi-step wizard screens for end users?",
    options: [
      { id: "a", text: "Workflow Rules" },
      { id: "b", text: "Record-Triggered Flow" },
      { id: "c", text: "Screen Flow" },
      { id: "d", text: "Process Builder" }
    ],
    correctOptionId: "c",
    explanation: "Screen Flows are the declarative tool in Salesforce designed specifically for creating interactive user screens, forms, and wizard steps."
  },
  {
    id: "quiz-sf-02",
    category: "salesforce-admin",
    questionText: "What is the maximum number of Master-Detail relationships allowed on a custom object in Salesforce?",
    options: [
      { id: "a", text: "1" },
      { id: "b", text: "2" },
      { id: "c", text: "5" },
      { id: "d", text: "Unlimited" }
    ],
    correctOptionId: "b",
    explanation: "Salesforce allows a maximum of 2 Master-Detail relationships per custom object."
  },
  {
    id: "quiz-pbi-01",
    category: "power-bi-dax",
    questionText: "Which DAX function overrides or alters the existing filter context of a calculation?",
    options: [
      { id: "a", text: "SUMX" },
      { id: "b", text: "CALCULATE" },
      { id: "c", text: "RELATED" },
      { id: "d", text: "EARLIER" }
    ],
    correctOptionId: "b",
    explanation: "CALCULATE is the single most important DAX function because it evaluates an expression in a modified filter context."
  },
  {
    id: "quiz-pbi-02",
    category: "power-bi-dax",
    questionText: "In Power Query, which language is used to transform data and write query M-code?",
    options: [
      { id: "a", text: "DAX" },
      { id: "b", text: "SQL" },
      { id: "c", text: "M Language" },
      { id: "d", text: "VBA" }
    ],
    correctOptionId: "c",
    explanation: "Power Query uses the functional 'M' language behind the scene to perform ETL data transformations."
  },
  {
    id: "quiz-tb-01",
    category: "tableau-lod",
    questionText: "Which LOD keyword evaluates the expression at the exact specified level of detail, regardless of fields in the visual?",
    options: [
      { id: "a", text: "INCLUDE" },
      { id: "b", text: "FIXED" },
      { id: "c", text: "EXCLUDE" },
      { id: "d", text: "SUM" }
    ],
    correctOptionId: "b",
    explanation: "FIXED computes values using only the specified dimensions in the formula, completely independent of view dimensions."
  }
];

export const FREE_RESOURCES: ResourceItem[] = [
  {
    id: "res-01",
    title: "Complete Salesforce ADM-201 Exam Revision Guide",
    type: "guide",
    category: "Salesforce",
    description: "Comprehensive 40-page preparation handbook with key concepts, security rules, and screen flow cheat sheet.",
    readTimeOrDuration: "40 Page PDF",
    badge: "Popular"
  },
  {
    id: "res-02",
    title: "DAX Quick Reference & Formula Cheat Sheet",
    type: "cheatsheet",
    category: "Power BI",
    description: "Instant reference for Time Intelligence functions, CALCULATE syntax, and SUMX iterator examples.",
    readTimeOrDuration: "Instant Download",
    badge: "Must Have"
  },
  {
    id: "res-03",
    title: "Tableau LOD Expressions Demystified",
    type: "guide",
    category: "Tableau",
    description: "Visual breakdown of FIXED, INCLUDE, and EXCLUDE with real retail analytics examples.",
    readTimeOrDuration: "15 Min Read"
  },
  {
    id: "res-04",
    title: "Top 100 SQL Interview Questions & Answers",
    type: "cheatsheet",
    category: "SQL",
    description: "Curated collection of frequently asked SQL interview questions covering CTEs, JOINS, and Window Functions.",
    readTimeOrDuration: "Complete Guide"
  },
  {
    id: "res-05",
    title: "Healthcare CRM Capstone Project Starter Kit",
    type: "project-template",
    category: "Salesforce",
    description: "Downloadable schema diagram, field requirements, and test data for practice.",
    readTimeOrDuration: "Zip Archive"
  },
  {
    id: "res-06",
    title: "Recorded Masterclass: Building AI Agents on Agentforce",
    type: "webinar",
    category: "Salesforce AI",
    description: "Watch our lead Salesforce architect build and deploy a live Agentforce autonomous bot in 60 minutes.",
    readTimeOrDuration: "60 Min Video"
  }
];
