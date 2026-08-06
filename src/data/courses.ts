export interface CurriculumModule {
  title: string;
  durationHours: number;
  topics: string[];
}

export interface CourseFAQ {
  question: string;
  answer: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  categoryId: string; // 'salesforce' | 'power-bi' | 'tableau' | 'data-analytics' | 'ai-data-science' | 'cloud-devops' | 'agile-pm'
  academy: string;
  shortDescription: string;
  fullOverview: string;
  targetAudience: string[];
  learningObjectives: string[];
  prerequisites: string[];
  duration: string; // e.g., "8 Weeks (40 Hours)"
  trainingMode: "Online" | "Classroom" | "Hybrid" | "All Modes";
  batchOptions: "Weekday & Weekend Batches Available";
  level: "Beginner" | "Intermediate" | "Advanced" | "Beginner to Advanced" | "Intermediate to Advanced";
  rating: number;
  reviewCount: number;
  enrolledStudents: number;
  certificationTarget: string;
  badge?: string;
  isFeatured?: boolean;
  isPopular?: boolean;
  liveProjectsCount: number;
  curriculum: CurriculumModule[];
  tools: string[];
  capstoneProject: {
    title: string;
    description: string;
  };
  faqs: CourseFAQ[];
}

export const COURSES: Course[] = [
  // ===================== SALESFORCE ACADEMY =====================
  {
    id: "sf-admin",
    title: "Salesforce Administrator (ADM-201)",
    slug: "salesforce-administrator",
    categoryId: "salesforce",
    academy: "Salesforce Academy",
    shortDescription: "Master Salesforce org configuration, security models, custom objects, user management, reports, dashboards, and automated flows.",
    fullOverview: "The Salesforce Administrator course provides hands-on expertise required to manage, configure, and maintain enterprise Salesforce orgs. Learn how to configure security and access settings, build custom applications using Lightning App Builder, automate business processes using Salesforce Flows, and generate real-time analytics with custom reports and dashboards.",
    targetAudience: [
      "Freshers and graduates looking to launch a high-growth cloud career",
      "IT professionals transitioning into Salesforce administration",
      "Business analysts seeking deep Salesforce platform knowledge",
      "Sales & Ops managers wanting to customize their orgs"
    ],
    learningObjectives: [
      "Configure standard & custom objects, fields, picklists, and page layouts",
      "Implement robust security models using Profiles, Roles, Permission Sets, and OWD",
      "Automate complex business logic with Salesforce Screen & Record-Triggered Flows",
      "Create high-impact reports, dashboards, join reports, and analytical snapshots",
      "Prepare thoroughly for the official Salesforce Certified Administrator (ADM-201) exam"
    ],
    prerequisites: ["Basic computer skills", "No prior coding or technical background required"],
    duration: "6 Weeks (45 Hours)",
    trainingMode: "All Modes",
    batchOptions: "Weekday & Weekend Batches Available",
    level: "Beginner to Advanced",
    rating: 4.9,
    reviewCount: 384,
    enrolledStudents: 1420,
    certificationTarget: "Salesforce Certified Administrator (ADM-201)",
    badge: "Bestseller",
    isFeatured: true,
    isPopular: true,
    liveProjectsCount: 3,
    tools: ["Salesforce Lightning", "Setup & Admin Console", "Flow Builder", "Data Loader", "Workbench"],
    capstoneProject: {
      title: "End-to-End Enterprise CRM Implementation for Healthcare Client",
      description: "Build a complete Healthcare Lead-to-Case management portal with automated record assignment, SLA tracking, and C-Suite analytical dashboards."
    },
    curriculum: [
      {
        title: "Module 1: Salesforce Fundamentals & Data Architecture",
        durationHours: 8,
        topics: ["Cloud Computing Concepts", "Salesforce Architecture & Multi-tenancy", "Standard vs Custom Objects", "Field Types & Formula Fields", "Master-Detail vs Lookup Relationships"]
      },
      {
        title: "Module 2: Security, Access & Permissions Model",
        durationHours: 10,
        topics: ["Organization-Wide Defaults (OWD)", "Role Hierarchy & Criteria Sharing", "Profiles vs Permission Sets", "Field-Level Security (FLS)", "Login IP Ranges & Session Security"]
      },
      {
        title: "Module 3: Business Logic & Flow Automation",
        durationHours: 12,
        topics: ["Salesforce Flow Architecture", "Screen Flows & Interactive Forms", "Record-Triggered Flows & Fast Field Updates", "Schedule & Sub-Flows", "Validation Rules & Assignment Rules"]
      },
      {
        title: "Module 4: Analytics, Reports & Executive Dashboards",
        durationHours: 8,
        topics: ["Report Types & Custom Report Types", "Summary, Matrix & Joined Reports", "Dashboard Components & Filters", "Historical Trend Reporting", "Scheduled Report Subscriptions"]
      },
      {
        title: "Module 5: Data Management & ADM-201 Exam Bootcamp",
        durationHours: 7,
        topics: ["Data Import Wizard vs Data Loader", "Data Cleanliness & Duplicate Rules", "Mass Delete & Export", "ADM-201 Mock Exam Review & Scenario Practice"]
      }
    ],
    faqs: [
      {
        question: "Is coding required for Salesforce Administrator training?",
        answer: "No coding is required for Salesforce Admin. All configurations are done through Salesforce's declarative point-and-click Lightning UI."
      },
      {
        question: "Does BSquare assist with Salesforce certification voucher?",
        answer: "Yes, we provide official certification preparation material, mock exams, and guidance on registering for Salesforce certification exams."
      }
    ]
  },
  {
    id: "sf-app-builder",
    title: "Platform App Builder (CRT-801)",
    slug: "platform-app-builder",
    categoryId: "salesforce",
    academy: "Salesforce Academy",
    shortDescription: "Design, build, and deploy custom applications using declarative capabilities of the Salesforce Lightning Platform.",
    fullOverview: "Gain the skills to customize standard apps and create custom data models, UI components, business logic, and security rules without writing code.",
    targetAudience: ["Salesforce Admins looking to advance", "App Developers", "Solution Architects"],
    learningObjectives: ["Master data modeling and schema design", "Implement mobile app layouts", "Design custom Lightning App pages"],
    prerequisites: ["Salesforce Admin ADM-201 knowledge recommended"],
    duration: "5 Weeks (35 Hours)",
    trainingMode: "All Modes",
    batchOptions: "Weekday & Weekend Batches Available",
    level: "Intermediate",
    rating: 4.8,
    reviewCount: 215,
    enrolledStudents: 890,
    certificationTarget: "Salesforce Certified Platform App Builder",
    badge: "High Demand",
    isFeatured: true,
    isPopular: false,
    liveProjectsCount: 2,
    tools: ["Lightning App Builder", "Schema Builder", "Object Manager", "App Manager"],
    capstoneProject: {
      title: "Real Estate Property Management Custom App",
      description: "Build a property listing, inspection booking, and lead tracking app with customized Lightning pages and automated approvals."
    },
    curriculum: [
      { title: "Module 1: Advanced Data Modeling & Relationships", durationHours: 8, topics: ["Junction Objects", "Roll-up Summary Fields", "Schema Builder Navigation"] },
      { title: "Module 2: Customizing User Interfaces & Mobile", durationHours: 10, topics: ["Lightning Record Pages", "Dynamic Forms & Actions", "Salesforce Mobile App Layouts"] },
      { title: "Module 3: Advanced Business Process Automation", durationHours: 10, topics: ["Approval Processes", "Complex Flow Orchestration", "Custom Buttons & Actions"] },
      { title: "Module 4: App Deployment & Certification Practice", durationHours: 7, topics: ["Change Sets & Sandbox Management", "AppExchange Applications", "Mock Exam Drills"] }
    ],
    faqs: [
      { question: "What is the difference between Admin and App Builder?", answer: "App Builder focuses deeper on custom schema design, mobile UI layouts, and advanced app lifecycle deployment." }
    ]
  },
  {
    id: "sf-dev1",
    title: "Platform Developer I (Apex & Visualforce)",
    slug: "platform-developer-1",
    categoryId: "salesforce",
    academy: "Salesforce Academy",
    shortDescription: "Learn programmatic development on Salesforce using Apex programming, SOQL/SOSL queries, Apex Triggers, and unit testing.",
    fullOverview: "Transform into a certified Salesforce Developer. Master object-oriented Apex programming, governor limits management, trigger frameworks, asynchronous processing, and automated unit testing.",
    targetAudience: ["Java/C++/Python Developers switching to Salesforce", "Salesforce Admins stepping into coding", "Software Engineers"],
    learningObjectives: [
      "Write clean, scalable Apex code adhering to Governor Limits",
      "Develop Apex Triggers using standard handler design patterns",
      "Execute efficient SOQL & SOSL database queries",
      "Achieve 85%+ code coverage through robust Apex Unit Tests"
    ],
    prerequisites: ["Basic understanding of object-oriented programming concepts (OOPs)"],
    duration: "8 Weeks (60 Hours)",
    trainingMode: "All Modes",
    batchOptions: "Weekday & Weekend Batches Available",
    level: "Intermediate to Advanced",
    rating: 4.9,
    reviewCount: 412,
    enrolledStudents: 1650,
    certificationTarget: "Salesforce Certified Platform Developer I (PDI)",
    badge: "Highest Salary Career",
    isFeatured: true,
    isPopular: true,
    liveProjectsCount: 4,
    tools: ["VS Code", "Salesforce CLI (sf)", "Apex", "SOQL", "Developer Console"],
    capstoneProject: {
      title: "Automated Financial Claims Processing Engine",
      description: "Develop an Apex asynchronous batch engine to recalculate policy interest rates, run validation triggers, and post data back into core objects."
    },
    curriculum: [
      { title: "Module 1: Apex Fundamentals & OOP Concepts", durationHours: 12, topics: ["Variables, Data Types & Collections (Lists, Sets, Maps)", "Control Statements", "Classes & Interfaces"] },
      { title: "Module 2: SOQL, SOSL & DML Operations", durationHours: 12, topics: ["SOQL Queries & Relationship Queries", "SOSL Search", "DML Operations & Governor Limits Optimization"] },
      { title: "Module 3: Apex Triggers & Handler Architecture", durationHours: 15, topics: ["Trigger Context Variables", "Before vs After Triggers", "Trigger Handler Framework Pattern", "Preventing Recursion"] },
      { title: "Module 4: Asynchronous Apex & Testing", durationHours: 12, topics: ["@future Methods", "Batch Apex", "Queueable Apex", "Schedulable Apex", "Apex Test Classes & Assertions"] },
      { title: "Module 5: PDI Exam Blueprint & Mock Drills", durationHours: 9, topics: ["Visualforce Basics", "Deployment Tools", "PDI Scenario Mock Exams"] }
    ],
    faqs: [
      { question: "Is Java experience necessary for Apex?", answer: "No, but familiarity with any OOP language like Java, C#, or Python will help you pick up Apex rapidly." }
    ]
  },
  {
    id: "sf-lwc",
    title: "Lightning Web Components (LWC) & Modern JS",
    slug: "lightning-web-components",
    categoryId: "salesforce",
    academy: "Salesforce Academy",
    shortDescription: "Build modern, ultra-fast web components using ES6+ JavaScript, Shadow DOM, Wire Service, and Apex integration.",
    fullOverview: "LWC is the modern UI framework for Salesforce built on modern web standards. Learn Modern JS, LWC component architecture, reactivity, event handling, Wire Service, and Apex method calls.",
    targetAudience: ["Salesforce Developers", "Web Developers", "Frontend Engineers"],
    learningObjectives: ["Master LWC component lifecycle hooks", "Integrate Apex controllers via Wire Service & Imperative calls", "Handle parent-child event communication"],
    prerequisites: ["HTML, CSS, JavaScript basics & Platform Developer I Apex knowledge"],
    duration: "6 Weeks (40 Hours)",
    trainingMode: "All Modes",
    batchOptions: "Weekday & Weekend Batches Available",
    level: "Advanced",
    rating: 4.9,
    reviewCount: 298,
    enrolledStudents: 1120,
    certificationTarget: "Salesforce JavaScript Developer I & LWC Specialist Superbadge",
    badge: "Trending Tech",
    isFeatured: true,
    isPopular: true,
    liveProjectsCount: 3,
    tools: ["VS Code", "LWC Framework", "SLDS (Salesforce Lightning Design System)", "Jest Testing Framework"],
    capstoneProject: {
      title: "Interactive E-Commerce Product Catalog in Salesforce",
      description: "Build an interactive LWC shopping cart app with custom filtering, dynamic popups, wire adapter data binding, and checkout Apex triggers."
    },
    curriculum: [
      { title: "Module 1: Modern JavaScript (ES6+)", durationHours: 8, topics: ["Arrow Functions, Promises & Async/Await", "Destructuring, Modules & Array Methods", "DOM Manipulation"] },
      { title: "Module 2: LWC Architecture & Structure", durationHours: 10, topics: ["HTML, JS & XML Meta Configuration", "Decorators (@api, @track, @wire)", "Component Lifecycle Hooks"] },
      { title: "Module 3: Data Binding & Apex Integration", durationHours: 12, topics: ["Lightning Data Service (LDS)", "Wire Service with Schema References", "Imperative Apex Calls", "Handling Errors"] },
      { title: "Module 4: Event Communication & PubSub", durationHours: 10, topics: ["Custom Events & Event Bubbling", "Lightning Message Service (LMS)", "Jest Unit Testing for LWC"] }
    ],
    faqs: [
      { question: "Why switch from Aura to LWC?", answer: "LWC runs natively in modern browsers with significantly better performance and standard web component standards." }
    ]
  },

  // ===================== POWER BI ACADEMY =====================
  {
    id: "pbi-masterclass",
    title: "Power BI Complete Masterclass (PL-300)",
    slug: "power-bi-masterclass",
    categoryId: "power-bi",
    academy: "Power BI Academy",
    shortDescription: "Transform raw corporate data into stunning executive dashboards using Power Query ETL, Star Schema Data Modeling, and DAX calculations.",
    fullOverview: "Master Microsoft Power BI from scratch to advanced level. Learn data connection, transformation in Power Query, star schema data modeling, complex DAX measures, row-level security (RLS), and Power BI Service cloud publishing.",
    targetAudience: ["Data Analysts", "Business Analysts", "Excel users wanting to upgrade", "Reporting Engineers"],
    learningObjectives: [
      "Clean and reshape messy data using Power Query M language",
      "Design scalable Star Schema data models with proper relationships",
      "Write advanced DAX formulas (CALCULATE, SUMX, Time Intelligence)",
      "Build interactive mobile & desktop executive dashboards",
      "Pass the Microsoft Certified: Power BI Data Analyst Associate (PL-300) exam"
    ],
    prerequisites: ["Basic knowledge of MS Excel formulas"],
    duration: "6 Weeks (40 Hours)",
    trainingMode: "All Modes",
    batchOptions: "Weekday & Weekend Batches Available",
    level: "Beginner to Advanced",
    rating: 4.9,
    reviewCount: 450,
    enrolledStudents: 1890,
    certificationTarget: "Microsoft Certified: Power BI Data Analyst Associate (PL-300)",
    badge: "Bestseller",
    isFeatured: true,
    isPopular: true,
    liveProjectsCount: 4,
    tools: ["Power BI Desktop", "Power Query", "DAX Studio", "Power BI Service", "Tabular Editor"],
    capstoneProject: {
      title: "Global Supply Chain & Sales Analytics Executive Dashboard",
      description: "Connect 5 heterogenous data sources, model 12 tables in Star Schema, write 25 DAX measures, and publish a secure C-suite dashboard."
    },
    curriculum: [
      { title: "Module 1: Power BI Overview & Power Query ETL", durationHours: 8, topics: ["Connecting to SQL, Excel, Web & APIs", "Data Cleaning, Pivoting & Unpivoting", "M Language Basics & Custom Columns"] },
      { title: "Module 2: Data Modeling & Schema Design", durationHours: 10, topics: ["Star Schema vs Snowflake Schema", "Fact & Dimension Tables", "Active vs Inactive Relationships", "Cardinality & Cross Filtering"] },
      { title: "Module 3: DAX Calculations & Time Intelligence", durationHours: 12, topics: ["Calculated Columns vs Measures", "CALCULATE & Filter Context", "Time Intelligence (YTD, QTD, YoY)", "DAX Patterns & DAX Studio Optimization"] },
      { title: "Module 4: Visualization, Dashboards & RLS", durationHours: 6, topics: ["Bookmarks, Tooltips & Drill-through", "Row-Level Security (Static & Dynamic)", "Mobile Layout Optimization"] },
      { title: "Module 5: Power BI Service & PL-300 Exam Prep", durationHours: 4, topics: ["Workspaces, Apps & Gateway Refresh", "PL-300 Certification Practice Questions"] }
    ],
    faqs: [
      { question: "Does this course cover PL-300 exam prep?", answer: "Yes! Full syllabus maps directly to Microsoft PL-300 certification with practice mock tests included." }
    ]
  },
  {
    id: "fabric-dax",
    title: "Microsoft Fabric & Advanced DAX Engineering",
    slug: "microsoft-fabric-dax",
    categoryId: "power-bi",
    academy: "Power BI Academy",
    shortDescription: "Explore OneLake, Synapse Analytics, Data Factory, and advanced DAX measure optimization in Microsoft's unified Fabric ecosystem.",
    fullOverview: "Step into the future of enterprise data engineering with Microsoft Fabric. Learn OneLake, DirectLake mode, Synapse Data Warehousing, Data Factory pipelines, and Tabular Editor DAX tuning.",
    targetAudience: ["Senior Power BI Developers", "Data Engineers", "BI Architects"],
    learningObjectives: ["Build end-to-end analytics in Microsoft Fabric", "Optimize DAX using Tabular Editor & VertiPaq Analyzer", "Utilize DirectLake mode for zero-copy queries"],
    prerequisites: ["Power BI PL-300 or core DAX knowledge"],
    duration: "5 Weeks (35 Hours)",
    trainingMode: "All Modes",
    batchOptions: "Weekday & Weekend Batches Available",
    level: "Advanced",
    rating: 4.88,
    reviewCount: 195,
    enrolledStudents: 620,
    certificationTarget: "Microsoft Certified: Fabric Analytics Engineer Associate (DP-600)",
    badge: "Trending Tech",
    isFeatured: true,
    isPopular: false,
    liveProjectsCount: 2,
    tools: ["Microsoft Fabric", "OneLake", "Synapse Data Warehouse", "DirectLake", "Tabular Editor 3"],
    capstoneProject: {
      title: "Enterprise OneLake Unified Data Hub",
      description: "Build a Fabric lakehouse and warehouse with automated Data Factory pipelines and DirectLake Power BI semantic models."
    },
    curriculum: [
      { title: "Module 1: Microsoft Fabric Core Architecture", durationHours: 8, topics: ["OneLake Unified Storage", "Lakehouse vs Data Warehouse", "Fabric Workspaces & Capacities"] },
      { title: "Module 2: Data Factory Pipelines & Dataflows Gen2", durationHours: 9, topics: ["Pipeline Orchestration", "Dataflows Gen2 Data Transformation", "Connecting Cloud Sources"] },
      { title: "Module 3: DirectLake Semantic Models & Advanced DAX", durationHours: 10, topics: ["DirectLake Performance vs Import", "Complex DAX Calculation Groups", "Tabular Editor 3 Macros"] },
      { title: "Module 4: DP-600 Exam Preparation", durationHours: 8, topics: ["Governance & Security in Fabric", "DP-600 Certification Scenario Questions"] }
    ],
    faqs: [
      { question: "Is Microsoft Fabric replacing Power BI?", answer: "No, Fabric incorporates Power BI as its reporting layer while adding unified lakehouse storage and data engineering." }
    ]
  },

  // ===================== TABLEAU ACADEMY =====================
  {
    id: "tableau-mastery",
    title: "Tableau Desktop & Server Master Class",
    slug: "tableau-desktop-mastery",
    categoryId: "tableau",
    academy: "Tableau Academy",
    shortDescription: "Build interactive visual dashboards, master LOD expressions, parameters, spatial data, Tableau Prep, and cloud publishing.",
    fullOverview: "Master Tableau Desktop & Server for enterprise visual analytics. Learn connecting to data, visual best practices, table calculations, FIXED/INCLUDE/EXCLUDE Level of Detail (LOD) expressions, and publishing interactive workbooks.",
    targetAudience: ["Data Analysts", "BI Developers", "Data Visualizers", "Business Executives"],
    learningObjectives: [
      "Create 20+ chart types (Pareto, Waterfall, Gantt, Heat Maps, Maps)",
      "Master FIXED, INCLUDE & EXCLUDE Level of Detail (LOD) calculations",
      "Perform complex data wrangling in Tableau Prep Builder",
      "Publish, schedule, and secure workbooks on Tableau Server / Cloud",
      "Clear Tableau Certified Data Analyst exam"
    ],
    prerequisites: ["Basic data understanding, Excel skills beneficial"],
    duration: "6 Weeks (40 Hours)",
    trainingMode: "All Modes",
    batchOptions: "Weekday & Weekend Batches Available",
    level: "Beginner to Advanced",
    rating: 4.85,
    reviewCount: 310,
    enrolledStudents: 1250,
    certificationTarget: "Tableau Certified Data Analyst",
    badge: "Enterprise Standard",
    isFeatured: true,
    isPopular: true,
    liveProjectsCount: 3,
    tools: ["Tableau Desktop", "Tableau Prep Builder", "Tableau Server", "Tableau Cloud"],
    capstoneProject: {
      title: "Healthcare Patient Care & Resource Allocation Portal",
      description: "Design a multi-dashboard Tableau storybook analyzing hospital bed utilization, wait times, and emergency response performance."
    },
    curriculum: [
      { title: "Module 1: Tableau Fundamentals & Data Connections", durationHours: 8, topics: ["Joins, Unions, Data Blending & Relationships", "Dimensions vs Measures", "Discrete vs Continuous Fields"] },
      { title: "Module 2: Advanced Charting & Visual Storytelling", durationHours: 10, topics: ["Dual Axis Charts, Bullet Graphs, Heat Maps", "Parameters & Dynamic Sorting", "Sets, Groups & Hierarchies"] },
      { title: "Module 3: Table Calculations & LOD Expressions", durationHours: 12, topics: ["Quick Table Calculations", "FIXED LOD Expressions", "INCLUDE & EXCLUDE LODs", "Nested Calculations"] },
      { title: "Module 4: Tableau Prep & Cloud Governance", durationHours: 10, topics: ["Data Cleansing in Tableau Prep", "Publishing Workbooks to Tableau Cloud", "Row-Level Security in Tableau"] }
    ],
    faqs: [
      { question: "Is Tableau still relevant alongside Power BI?", answer: "Yes, Tableau remains the gold standard for executive visualization and custom visual analytics in Fortune 500 enterprises." }
    ]
  },

  // ===================== DATA ANALYTICS ACADEMY =====================
  {
    id: "data-analytics-bootcamp",
    title: "Business & Data Analytics Career Bootcamp",
    slug: "business-data-analytics",
    categoryId: "data-analytics",
    academy: "Analytics Academy",
    shortDescription: "Complete job-ready program covering SQL, Advanced Excel, Python basics, Power BI, Tableau, and real business case studies.",
    fullOverview: "Launch a rewarding career as a Data Analyst. This flagship bootcamp equips you with the complete modern data analytics stack: SQL database querying, Advanced Excel modeling, Python data analysis (Pandas/NumPy), and Power BI dashboard creation.",
    targetAudience: ["Career Switchers", "Fresh Graduates", "Business Consultants", "Excel Users"],
    learningObjectives: [
      "Write complex SQL queries using JOINS, Subqueries, CTEs, and Window Functions",
      "Perform exploratory data analysis (EDA) using Python Pandas & Matplotlib",
      "Build interactive executive dashboards in Power BI",
      "Solve real-world business problems through data-driven storytelling"
    ],
    prerequisites: ["No coding required to begin"],
    duration: "10 Weeks (75 Hours)",
    trainingMode: "All Modes",
    batchOptions: "Weekday & Weekend Batches Available",
    level: "Beginner to Advanced",
    rating: 4.92,
    reviewCount: 520,
    enrolledStudents: 2300,
    certificationTarget: "BSquare Certified Data Analytics Professional",
    badge: "Career Switch Favorite",
    isFeatured: true,
    isPopular: true,
    liveProjectsCount: 5,
    tools: ["SQL Server", "PostgreSQL", "Python", "Pandas", "Power BI", "Excel VBA"],
    capstoneProject: {
      title: "E-Commerce Customer Churn & Lifetime Value (CLV) Analytics",
      description: "Analyze 500,000 transaction records using SQL and Python, identify churn predictors, and present executive recommendations in Power BI."
    },
    curriculum: [
      { title: "Module 1: Advanced SQL for Data Analysis", durationHours: 18, topics: ["SELECT, WHERE, GROUP BY, HAVING", "INNER/LEFT/RIGHT JOINS", "Subqueries & CTEs (WITH Clause)", "Window Functions (ROW_NUMBER, RANK, DENSE_RANK, LEAD/LAG)"] },
      { title: "Module 2: Advanced Excel & Business Math", durationHours: 12, topics: ["INDEX-MATCH, XLOOKUP", "Pivot Tables & Slicers", "Financial Modeling & Sensitivity Analysis"] },
      { title: "Module 3: Python for Exploratory Data Analysis", durationHours: 20, topics: ["Jupyter Notebooks", "NumPy Arrays", "Pandas DataFrames & Data Cleansing", "Seaborn & Matplotlib Visualization"] },
      { title: "Module 4: Business Intelligence & Capstone Presentation", durationHours: 25, topics: ["Power BI Dashboard Development", "Data Storytelling & Mock Interview Preparation"] }
    ],
    faqs: [
      { question: "Is placement assistance provided for this course?", answer: "Yes! Includes mock interviews, resume preparation, LinkedIn optimization, and direct referrals to hiring partners." }
    ]
  },


  // ===================== AGILE & PMP =====================
  {
    id: "pmp-scrum",
    title: "PMP Certification & Professional Scrum Master (PSM I)",
    slug: "pmp-scrum-master",
    categoryId: "agile-pm",
    academy: "Project Management Academy",
    shortDescription: "Earn 35 PDUs for PMP exam eligibility and master Agile Scrum delivery, sprint planning, and project governance.",
    fullOverview: "Accelerate your career in tech leadership. Learn PMBOK 7th Edition guidelines, predictive & adaptive frameworks, Agile ceremonies, risk management, and pass PMP & PSM I exams.",
    targetAudience: ["Project Managers", "Scrum Masters", "Team Leads", "IT Directors"],
    learningObjectives: ["Fulfill 35 PDU requirement for PMP", "Master Scrum roles, artifacts & ceremonies", "Pass PMP & PSM I certifications"],
    prerequisites: ["Bachelor's degree and 3+ years project experience for PMP"],
    duration: "5 Weeks (35 Hours)",
    trainingMode: "All Modes",
    batchOptions: "Weekday & Weekend Batches Available",
    level: "Advanced",
    rating: 4.9,
    reviewCount: 210,
    enrolledStudents: 840,
    certificationTarget: "PMI Project Management Professional (PMP) & PSM I",
    badge: "Leadership Path",
    isFeatured: false,
    isPopular: false,
    liveProjectsCount: 2,
    tools: ["Jira Software", "Confluence", "MS Project", "Miro"],
    capstoneProject: {
      title: "Agile Transformation Charter for Software Product",
      description: "Draft an end-to-end Agile project charter, sprint backlog, release plan, and risk register for a global SaaS migration."
    },
    curriculum: [
      { title: "Module 1: Business Environment & People Management", durationHours: 8, topics: ["Conflict Resolution", "Servant Leadership", "Stakeholder Engagement"] },
      { title: "Module 2: Predictive Project Lifecycle (PMBOK 7)", durationHours: 10, topics: ["Scope, Schedule & Cost Baseline", "Earned Value Management (EVM)", "Risk & Quality Control"] },
      { title: "Module 3: Agile & Scrum Framework", durationHours: 10, topics: ["Scrum Values & Roles", "Sprint Planning, Daily Standups & Retrospectives", "Burndown Charts & Velocity"] },
      { title: "Module 4: Exam Strategy & Practice", durationHours: 7, topics: ["PMP 180-Question Mock Exam", "PSM I Preparation"] }
    ],
    faqs: [
      { question: "Do you provide 35 PDU certificate for PMI?", answer: "Yes, BSquare issues the mandatory 35 Contact Hours / PDUs certificate required to sit for the official PMP exam." }
    ]
  }
];
