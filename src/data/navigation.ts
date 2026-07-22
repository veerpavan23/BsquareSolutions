export interface NavItem {
  title: string;
  href: string;
  badge?: string;
  description?: string;
}

export interface NavCategory {
  title: string;
  items: NavItem[];
}

export const ACADEMIES_NAV: NavCategory[] = [
  {
    title: "Salesforce Academy",
    items: [
      { title: "Salesforce Administrator", href: "/courses/salesforce-administrator", description: "Admin ADM-201 certification preparation & hands-on org config" },
      { title: "Platform App Builder", href: "/courses/platform-app-builder", description: "Custom apps, data modeling & business logic" },
      { title: "Platform Developer I & II", href: "/courses/platform-developer-1", description: "Apex programming, triggers & unit testing" },
      { title: "Lightning Web Components (LWC)", href: "/courses/lightning-web-components", description: "Modern JavaScript UI framework for Salesforce" },
      { title: "Salesforce Flow Automation", href: "/courses/salesforce-flow", description: "Advanced declarative automation & orchestration" },
      { title: "Salesforce Integration Architecture", href: "/courses/salesforce-integration", description: "REST/SOAP APIs, OAuth & middleware" },
      { title: "Agentforce & Einstein AI", href: "/courses/agentforce-einstein-ai", badge: "HOT", description: "Autonomous AI agents & predictive analytics on Salesforce" },
      { title: "Salesforce Data Cloud", href: "/courses/salesforce-data-cloud", badge: "NEW", description: "Real-time customer data platform & unified profiles" },
    ],
  },
  {
    title: "Analytics Academy (Power BI & Tableau)",
    items: [
      { title: "Power BI Complete Masterclass", href: "/courses/power-bi-masterclass", description: "Power Query, DAX, Data Modelling & Dashboards" },
      { title: "Microsoft Fabric & Advanced DAX", href: "/courses/microsoft-fabric-dax", badge: "TRENDING", description: "Next-gen unified analytics platform & enterprise DAX" },
      { title: "Tableau Desktop & Server", href: "/courses/tableau-desktop-mastery", description: "Visual analytics, calculations, LOD & Tableau Server" },
      { title: "Tableau Prep & Data Visualization", href: "/courses/tableau-prep-visualization", description: "Data wrangling, cleaning & executive dashboard design" },
      { title: "Business & Data Analytics", href: "/courses/business-data-analytics", description: "SQL, Excel, Statistics & Business Intelligence" },
    ],
  },
  {
    title: "AI & Emerging Technologies",
    items: [
      { title: "Python for Data Science & AI", href: "/courses/python-data-science", description: "NumPy, Pandas, Matplotlib & Exploratory Analytics" },
      { title: "Applied Machine Learning", href: "/courses/applied-machine-learning", description: "Scikit-Learn, Predictive Models & Model Deployment" },
      { title: "Generative AI & LLM Engineering", href: "/courses/generative-ai-engineering", badge: "NEW", description: "LangChain, RAG, Prompt Engineering & Fine-tuning" },
      { title: "SQL & Enterprise Data Engineering", href: "/courses/sql-data-engineering", description: "PostgreSQL, Snowflake, Stored Procedures & ETL" },
    ],
  },
  {
    title: "Cloud & Agile Leadership",
    items: [
      { title: "AWS Solutions Architect", href: "/courses/aws-solutions-architect", description: "Cloud infrastructure, S3, EC2, Lambda & Security" },
      { title: "Microsoft Azure Administrator", href: "/courses/azure-administrator", description: "AZ-104 certification prep & cloud governance" },
      { title: "DevOps & CI/CD Pipelines", href: "/courses/devops-docker-kubernetes", description: "Git, GitHub, Docker, Kubernetes & Jenkins" },
      { title: "PMP & Agile Scrum Master", href: "/courses/pmp-scrum-master", description: "PMI PMP certification & Agile delivery leadership" },
    ],
  },
];

export const MAIN_NAV_LINKS = [
  { title: "Home", href: "/" },
  { title: "All Courses", href: "/courses" },
  { title: "Salesforce", href: "/salesforce-training" },
  { title: "Power BI", href: "/power-bi-training" },
  { title: "Tableau", href: "/tableau-training" },
  { title: "Analytics", href: "/data-analytics-training" },
  { title: "AI & Data Science", href: "/ai-data-science-training" },
  { title: "Learning Paths", href: "/learning-paths" },
  { title: "Corporate Training", href: "/corporate-training" },
  { title: "Trainers", href: "/trainers" },
  { title: "Success Stories", href: "/success-stories" },
  { title: "Resources", href: "/resources" },
  { title: "Blog", href: "/blog" },
  { title: "About Us", href: "/about" },
  { title: "Contact", href: "/contact" },
];
