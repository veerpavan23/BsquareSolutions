export interface LearningStep {
  stepNumber: number;
  phaseTitle: string; // e.g., "Beginner - Core Fundamentals"
  skillToLearn: string;
  recommendedCourse: string;
  courseSlug: string;
  suggestedCertification: string;
  practicalProject: string;
  potentialJobRole: string;
}

export interface CareerPath {
  id: string;
  title: string;
  category: "salesforce" | "analytics" | "ai-data" | "tableau" | "power-bi";
  description: string;
  targetRole: string;
  steps: LearningStep[];
}

export const LEARNING_PATHS: CareerPath[] = [
  {
    id: "sf-admin-path",
    title: "Salesforce Administrator Path",
    category: "salesforce",
    description: "Master Salesforce platform configuration, data security, flows automation, and org governance.",
    targetRole: "Senior Salesforce Administrator / CRM Specialist",
    steps: [
      {
        stepNumber: 1,
        phaseTitle: "Step 1: Core Configuration & Security",
        skillToLearn: "Standard & Custom Objects, Profiles, Roles, OWD Security & Data Loader",
        recommendedCourse: "Salesforce Administrator (ADM-201)",
        courseSlug: "salesforce-administrator",
        suggestedCertification: "Salesforce Certified Administrator",
        practicalProject: "Build CRM Data Architecture & Security Matrix for Retail Enterprise",
        potentialJobRole: "Junior Salesforce Administrator"
      },
      {
        stepNumber: 2,
        phaseTitle: "Step 2: Business Logic & Automation",
        skillToLearn: "Screen Flows, Record-Triggered Flows, Validation & Approval Processes",
        recommendedCourse: "Salesforce Flow Automation Masterclass",
        courseSlug: "salesforce-administrator",
        suggestedCertification: "Salesforce Certified Platform App Builder",
        practicalProject: "Automate Lead Distribution & Case SLA Escalation Workflows",
        potentialJobRole: "Salesforce Administrator / Business Analyst"
      },
      {
        stepNumber: 3,
        phaseTitle: "Step 3: Executive Analytics & Org Management",
        skillToLearn: "Custom Report Types, Joined Reports, C-Suite Dashboards & Release Management",
        recommendedCourse: "Platform App Builder (CRT-801)",
        courseSlug: "platform-app-builder",
        suggestedCertification: "Salesforce Certified Advanced Administrator",
        practicalProject: "Develop C-Suite Executive Analytics & Sandbox Change Set Deployment",
        potentialJobRole: "Senior Salesforce Administrator"
      }
    ]
  },
  {
    id: "sf-dev-path",
    title: "Salesforce Developer Path",
    category: "salesforce",
    description: "Transition from declarative admin to programmatic Apex coding, LWC UI engineering, and API integrations.",
    targetRole: "Senior Salesforce Developer / Technical Lead",
    steps: [
      {
        stepNumber: 1,
        phaseTitle: "Step 1: Declarative App Building",
        skillToLearn: "Object Modeling, Security Rules & Lightning App Builder",
        recommendedCourse: "Platform App Builder (CRT-801)",
        courseSlug: "platform-app-builder",
        suggestedCertification: "Salesforce Certified Platform App Builder",
        practicalProject: "Custom Schema & Process Automation",
        potentialJobRole: "Associate Salesforce Developer"
      },
      {
        stepNumber: 2,
        phaseTitle: "Step 2: Core Apex Development",
        skillToLearn: "Apex OOPs, SOQL/SOSL Queries, Triggers Handler Framework & Unit Testing",
        recommendedCourse: "Platform Developer I (Apex & Visualforce)",
        courseSlug: "platform-developer-1",
        suggestedCertification: "Salesforce Certified Platform Developer I",
        practicalProject: "Async Claims Engine & Automated Apex Test Suite",
        potentialJobRole: "Salesforce Apex Developer"
      },
      {
        stepNumber: 3,
        phaseTitle: "Step 3: LWC & API Integrations",
        skillToLearn: "ES6+ Modern JS, Lightning Web Components, REST/SOAP APIs & Callouts",
        recommendedCourse: "Lightning Web Components (LWC) & Modern JS",
        courseSlug: "lightning-web-components",
        suggestedCertification: "Salesforce Certified Platform Developer II / JS Dev I",
        practicalProject: "Single Page LWC App with External Payment Gateway API",
        potentialJobRole: "Senior Salesforce Developer / Technical Lead"
      }
    ]
  },
  {
    id: "sf-consultant-path",
    title: "Salesforce Consultant Path",
    category: "salesforce",
    description: "Specialize in business domain transformation, Sales Cloud, Service Cloud, and business process re-engineering.",
    targetRole: "Salesforce Lead Functional Consultant",
    steps: [
      {
        stepNumber: 1,
        phaseTitle: "Step 1: Core Platform Admin",
        skillToLearn: "Salesforce Platform Config & User Management",
        recommendedCourse: "Salesforce Administrator (ADM-201)",
        courseSlug: "salesforce-administrator",
        suggestedCertification: "Salesforce Certified Administrator",
        practicalProject: "Standard Sales Pipeline Customization",
        potentialJobRole: "Salesforce Business Analyst"
      },
      {
        stepNumber: 2,
        phaseTitle: "Step 2: Sales & Service Cloud Domain Mastery",
        skillToLearn: "Lead to Opportunity, Opportunity Splits, Omni-Channel, Entitlements & SLAs",
        recommendedCourse: "Sales Cloud & Service Cloud Masterclass",
        courseSlug: "salesforce-administrator",
        suggestedCertification: "Salesforce Certified Sales Cloud Consultant",
        practicalProject: "Multi-Channel Omni-Service Desk Implementation",
        potentialJobRole: "Salesforce Functional Consultant"
      },
      {
        stepNumber: 3,
        phaseTitle: "Step 3: Industry Solutions & Data Cloud",
        skillToLearn: "Experience Cloud Portals, Data Cloud Ingestion & Solution Architecture",
        recommendedCourse: "Salesforce Data Cloud",
        courseSlug: "salesforce-data-cloud",
        suggestedCertification: "Salesforce Certified Service Cloud Consultant / Data Cloud Accredited",
        practicalProject: "Self-Service Customer Support Portal & Data Cloud Unified Profile",
        potentialJobRole: "Senior Salesforce Solution Consultant"
      }
    ]
  },
  {
    id: "sf-architect-path",
    title: "Salesforce Architect Path",
    category: "salesforce",
    description: "Master enterprise data architecture, identity governance, integration patterns, and system governance.",
    targetRole: "Salesforce Enterprise Application Architect",
    steps: [
      {
        stepNumber: 1,
        phaseTitle: "Step 1: Advanced Apex & LWC",
        skillToLearn: "Apex Design Patterns, Enterprise Frameworks & Component Architecture",
        recommendedCourse: "Lightning Web Components (LWC) & Modern JS",
        courseSlug: "lightning-web-components",
        suggestedCertification: "Salesforce Certified Platform Developer II",
        practicalProject: "Enterprise Framework with Domain & Selector Patterns",
        potentialJobRole: "Senior Developer / Technical Lead"
      },
      {
        stepNumber: 2,
        phaseTitle: "Step 2: Data Architecture & Management",
        skillToLearn: "Large Data Volumes (LDV), Indexing, PK Chunking, Data Governance & Backup",
        recommendedCourse: "Salesforce Integration Architecture",
        courseSlug: "salesforce-integration",
        suggestedCertification: "Salesforce Certified Data Architecture & Management Designer",
        practicalProject: "100 Million Record Data Migration & Indexing Strategy",
        potentialJobRole: "Salesforce Data Architect"
      },
      {
        stepNumber: 3,
        phaseTitle: "Step 3: Integration & System Architecture",
        skillToLearn: "Enterprise Integration Patterns, OAuth 2.0 Flows, Middleware & SSO",
        recommendedCourse: "Salesforce Integration Architecture",
        courseSlug: "salesforce-integration",
        suggestedCertification: "Salesforce Certified Application Architect",
        practicalProject: "Real-time Event-Driven Integration with SAP ERP via MuleSoft",
        potentialJobRole: "Salesforce Enterprise Architect"
      }
    ]
  },
  {
    id: "sf-ai-path",
    title: "Salesforce AI and Agentforce Path",
    category: "salesforce",
    description: "Pioneer autonomous AI agents, prompt engineering, and predictive CRM intelligence on Salesforce.",
    targetRole: "Salesforce AI / Agentforce Specialist Architect",
    steps: [
      {
        stepNumber: 1,
        phaseTitle: "Step 1: Salesforce Core & Flow Automation",
        skillToLearn: "Salesforce Admin, Data Model & Flow Orchestration",
        recommendedCourse: "Salesforce Administrator (ADM-201)",
        courseSlug: "salesforce-administrator",
        suggestedCertification: "Salesforce Certified Administrator",
        practicalProject: "Automated Record Trigger Workflows",
        potentialJobRole: "Salesforce Specialist"
      },
      {
        stepNumber: 2,
        phaseTitle: "Step 2: Data Cloud & Vector Grounding",
        skillToLearn: "Data Cloud Identity Resolution, Vector Indexing & Real-time Ingestion",
        recommendedCourse: "Salesforce Data Cloud",
        courseSlug: "salesforce-data-cloud",
        suggestedCertification: "Salesforce Certified Data Cloud Consultant",
        practicalProject: "Data Cloud Grounding Pipeline for Customer Insights",
        potentialJobRole: "Salesforce Data & AI Specialist"
      },
      {
        stepNumber: 3,
        phaseTitle: "Step 3: Agentforce & Prompt Engineering",
        skillToLearn: "Agentforce Topics/Actions, Prompt Builder, Einstein Trust Layer & Guardrails",
        recommendedCourse: "Agentforce & Salesforce Einstein AI",
        courseSlug: "agentforce-einstein-ai",
        suggestedCertification: "Salesforce Certified AI Specialist",
        practicalProject: "Autonomous Customer Support AI Agent with Action Flows",
        potentialJobRole: "Salesforce Agentforce AI Architect"
      }
    ]
  },
  {
    id: "pbi-dev-path",
    title: "Power BI Developer Path",
    category: "power-bi",
    description: "Transform raw organizational databases into high-impact DAX calculations, Star Schemas, and executive dashboards.",
    targetRole: "Lead Power BI Developer / BI Solutions Engineer",
    steps: [
      {
        stepNumber: 1,
        phaseTitle: "Step 1: Power Query ETL & Star Schema",
        skillToLearn: "Connecting Data, Data Cleansing in Power Query, Fact/Dim Tables & Modeling",
        recommendedCourse: "Power BI Complete Masterclass (PL-300)",
        courseSlug: "power-bi-masterclass",
        suggestedCertification: "Microsoft Certified: Power BI Data Analyst Associate (PL-300)",
        practicalProject: "Retail Sales Data Transformation & Star Schema",
        potentialJobRole: "Junior Power BI Developer"
      },
      {
        stepNumber: 2,
        phaseTitle: "Step 2: DAX Formulas & Time Intelligence",
        skillToLearn: "CALCULATE, Filter Context, Variables, YTD/YoY Time Intelligence & Visual Formatting",
        recommendedCourse: "Power BI Complete Masterclass (PL-300)",
        courseSlug: "power-bi-masterclass",
        suggestedCertification: "PL-300 Certification Achieved",
        practicalProject: "Executive Financial Reporting Suite with 30+ DAX Measures",
        potentialJobRole: "Power BI Developer"
      },
      {
        stepNumber: 3,
        phaseTitle: "Step 3: Microsoft Fabric & Performance Tuning",
        skillToLearn: "Microsoft Fabric OneLake, DirectLake Mode, Tabular Editor & Performance Analyzer",
        recommendedCourse: "Microsoft Fabric & Advanced DAX Engineering",
        courseSlug: "microsoft-fabric-dax",
        suggestedCertification: "Microsoft Certified: Fabric Analytics Engineer Associate (DP-600)",
        practicalProject: "Fabric OneLake Lakehouse with DirectLake Power BI Semantic Models",
        potentialJobRole: "Senior Power BI / Fabric Developer"
      }
    ]
  },
  {
    id: "bi-analyst-path",
    title: "Business Intelligence Analyst Path",
    category: "analytics",
    description: "Combine SQL querying, statistical data modeling, and reporting tools to drive business strategy.",
    targetRole: "Senior Business Intelligence Analyst",
    steps: [
      {
        stepNumber: 1,
        phaseTitle: "Step 1: SQL Database Querying",
        skillToLearn: "SQL Joins, Group By, Subqueries & Window Functions",
        recommendedCourse: "Business & Data Analytics Career Bootcamp",
        courseSlug: "business-data-analytics",
        suggestedCertification: "BSquare Certified SQL Specialist",
        practicalProject: "Database Extraction & Customer Segmentation Querying",
        potentialJobRole: "Data Reporting Analyst"
      },
      {
        stepNumber: 2,
        phaseTitle: "Step 2: BI Reporting & Dashboarding",
        skillToLearn: "Power BI / Tableau Visual Analytics, KPI Cards & Drill-Throughs",
        recommendedCourse: "Power BI Complete Masterclass (PL-300)",
        courseSlug: "power-bi-masterclass",
        suggestedCertification: "Microsoft Certified: PL-300 / Tableau Certified Data Analyst",
        practicalProject: "Automated Weekly Operations Dashboard",
        potentialJobRole: "BI Analyst"
      },
      {
        stepNumber: 3,
        phaseTitle: "Step 3: Business Strategy & Executive Storytelling",
        skillToLearn: "Data Storytelling, Stakeholder Communication, A/B Testing & KPI Definition",
        recommendedCourse: "Business & Data Analytics Career Bootcamp",
        courseSlug: "business-data-analytics",
        suggestedCertification: "BSquare Certified Senior BI Analyst",
        practicalProject: "Executive Business Growth Review & Strategic Recommendations",
        potentialJobRole: "Senior BI Analyst / Analytics Manager"
      }
    ]
  },
  {
    id: "tableau-dev-path",
    title: "Tableau Developer Path",
    category: "tableau",
    description: "Master visual design principles, LOD expressions, Tableau Prep data flows, and Tableau Cloud deployment.",
    targetRole: "Senior Tableau Developer / Data Visualizer",
    steps: [
      {
        stepNumber: 1,
        phaseTitle: "Step 1: Tableau Fundamentals & Data Preparation",
        skillToLearn: "Tableau Desktop UI, Dimensions vs Measures, Joins & Tableau Prep Cleansing",
        recommendedCourse: "Tableau Desktop & Server Master Class",
        courseSlug: "tableau-desktop-mastery",
        suggestedCertification: "Tableau Desktop Specialist",
        practicalProject: "Tableau Prep Cleansing Flow & Core Sales Workbook",
        potentialJobRole: "Junior Tableau Developer"
      },
      {
        stepNumber: 2,
        phaseTitle: "Step 2: Level of Detail (LOD) & Parameters",
        skillToLearn: "FIXED, INCLUDE & EXCLUDE LODs, Dynamic Parameters, Sets & Dual Axis Charts",
        recommendedCourse: "Tableau Desktop & Server Master Class",
        courseSlug: "tableau-desktop-mastery",
        suggestedCertification: "Tableau Certified Data Analyst",
        practicalProject: "Complex Healthcare Operations Dashboard with LOD Calculations",
        potentialJobRole: "Tableau Developer"
      },
      {
        stepNumber: 3,
        phaseTitle: "Step 3: Tableau Server Governance & Cloud",
        skillToLearn: "Tableau Server / Cloud Workspaces, Extract Refreshes, Row Level Security & Governance",
        recommendedCourse: "Tableau Desktop & Server Master Class",
        courseSlug: "tableau-desktop-mastery",
        suggestedCertification: "Tableau Certified Server Administrator",
        practicalProject: "Enterprise Tableau Cloud Portal with User Security Groups",
        potentialJobRole: "Senior Tableau Consultant"
      }
    ]
  },
  {
    id: "data-analyst-path",
    title: "Data Analyst Path",
    category: "analytics",
    description: "End-to-end data processing lifecycle from SQL extractions to Python analysis and interactive dashboards.",
    targetRole: "Lead Data Analyst",
    steps: [
      {
        stepNumber: 1,
        phaseTitle: "Step 1: SQL & Spreadsheet Mastery",
        skillToLearn: "SQL Complex Joins, Aggregations, Window Functions & Advanced Excel XLOOKUP/Pivots",
        recommendedCourse: "Business & Data Analytics Career Bootcamp",
        courseSlug: "business-data-analytics",
        suggestedCertification: "BSquare Certified Data Fundamentals",
        practicalProject: "Financial Statement & Database Audit",
        potentialJobRole: "Data Analyst"
      },
      {
        stepNumber: 2,
        phaseTitle: "Step 2: Python Data Cleansing & EDA",
        skillToLearn: "Python Pandas DataFrames, NumPy, Seaborn Visualization & Exploratory Analysis",
        recommendedCourse: "Python for Data Science & AI",
        courseSlug: "python-data-science",
        suggestedCertification: "Python Data Analysis Certificate",
        practicalProject: "E-Commerce Customer Behavior & Cohort Analysis",
        potentialJobRole: "Data Analyst / Analytics Consultant"
      },
      {
        stepNumber: 3,
        phaseTitle: "Step 3: BI Dashboarding & Machine Learning Intro",
        skillToLearn: "Power BI / Tableau Integration, Scikit-Learn Regression & Predictive Trends",
        recommendedCourse: "Business & Data Analytics Career Bootcamp",
        courseSlug: "business-data-analytics",
        suggestedCertification: "BSquare Certified Professional Data Analyst",
        practicalProject: "Predictive Sales Forecasting & Executive Dashboard",
        potentialJobRole: "Lead Data Analyst"
      }
    ]
  },
  {
    id: "data-scientist-path",
    title: "Data Scientist Path",
    category: "ai-data",
    description: "Master statistical modeling, supervised/unsupervised machine learning, deep learning, and Python AI frameworks.",
    targetRole: "Senior Data Scientist",
    steps: [
      {
        stepNumber: 1,
        phaseTitle: "Step 1: Python, Statistics & EDA",
        skillToLearn: "Python Data Science Stack (Pandas, NumPy, Scipy), Descriptive & Inferential Statistics",
        recommendedCourse: "Python for Data Science & AI",
        courseSlug: "python-data-science",
        suggestedCertification: "BSquare Applied Statistics Certificate",
        practicalProject: "Statistical Hypothesis Testing & EDA on Medical Datasets",
        potentialJobRole: "Junior Data Scientist"
      },
      {
        stepNumber: 2,
        phaseTitle: "Step 2: Machine Learning Algorithms",
        skillToLearn: "Scikit-Learn, Regression, Classification, Clustering, Random Forests & XGBoost",
        recommendedCourse: "Applied Machine Learning",
        courseSlug: "applied-machine-learning",
        suggestedCertification: "AWS Certified Data Analytics / ML Specialist",
        practicalProject: "Credit Card Fraud Detection Model with XGBoost",
        potentialJobRole: "Data Scientist"
      },
      {
        stepNumber: 3,
        phaseTitle: "Step 3: Deep Learning & Model Deployment",
        skillToLearn: "Neural Networks, PyTorch, Model Evaluation, Docker & ML API Deployment",
        recommendedCourse: "Applied Machine Learning",
        courseSlug: "applied-machine-learning",
        suggestedCertification: "TensorFlow Certified Developer",
        practicalProject: "Computer Vision Quality Inspection API with PyTorch & FastAPI",
        potentialJobRole: "Senior Data Scientist / AI Engineer"
      }
    ]
  },
  {
    id: "genai-prof-path",
    title: "Generative AI Professional Path",
    category: "ai-data",
    description: "Build cutting-edge RAG engines, custom AI agents, prompt templates, and LLM fine-tuning solutions.",
    targetRole: "Generative AI Architect / LLM Engineer",
    steps: [
      {
        stepNumber: 1,
        phaseTitle: "Step 1: Advanced Python & API Engineering",
        skillToLearn: "Python AsyncIO, FastAPI, Pydantic & OpenAI API Integration",
        recommendedCourse: "Python for Data Science & AI",
        courseSlug: "python-data-science",
        suggestedCertification: "BSquare Python API Engineer",
        practicalProject: "Async Web Scraping & Structured JSON LLM Extraction API",
        potentialJobRole: "AI Application Developer"
      },
      {
        stepNumber: 2,
        phaseTitle: "Step 2: RAG Systems & Vector Databases",
        skillToLearn: "Embeddings, Pinecone/Chroma, Semantic Search & Retrieval-Augmented Generation",
        recommendedCourse: "Generative AI & LLM Engineering Masterclass",
        courseSlug: "generative-ai-engineering",
        suggestedCertification: "BSquare Certified GenAI Developer",
        practicalProject: "Enterprise Multi-Document PDF RAG Chatbot",
        potentialJobRole: "Generative AI Engineer"
      },
      {
        stepNumber: 3,
        phaseTitle: "Step 3: Autonomous AI Agents & Fine-Tuning",
        skillToLearn: "LangChain, LangGraph State Machines, Tool Usage & QLoRA Model Fine-Tuning",
        recommendedCourse: "Generative AI & LLM Engineering Masterclass",
        courseSlug: "generative-ai-engineering",
        suggestedCertification: "BSquare Certified Generative AI Architect",
        practicalProject: "Autonomous Multi-Agent Task Orchestrator with Streamlit",
        potentialJobRole: "Senior Generative AI Architect"
      }
    ]
  }
];
