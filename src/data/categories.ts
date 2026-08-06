export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  courseCount: number;
  highlightText: string;
  popularTopics: string[];
  gradient: string;
}

export const CATEGORIES: Category[] = [
  {
    id: "salesforce",
    name: "Salesforce Academy",
    slug: "salesforce-training",
    description: "Industry-leading Salesforce certification & hands-on development programs led by certified Salesforce MVPs.",
    iconName: "Cloud",
    courseCount: 16,
    highlightText: "Most Popular in India",
    popularTopics: ["Admin ADM-201", "Platform App Builder", "Platform Dev I & II", "LWC", "Data Cloud"],
    gradient: "from-blue-600 to-indigo-700",
  },
  {
    id: "power-bi",
    name: "Power BI Academy",
    slug: "power-bi-training",
    description: "Transform raw data into interactive executive dashboards with Power Query, DAX, and Microsoft Fabric integration.",
    iconName: "BarChart3",
    courseCount: 10,
    highlightText: "High Hiring Demand",
    popularTopics: ["Power Query", "Data Modelling", "DAX Formulas", "Power BI Service", "Microsoft Fabric"],
    gradient: "from-amber-500 to-yellow-600",
  },
  {
    id: "tableau",
    name: "Tableau Academy",
    slug: "tableau-training",
    description: "Master visual data storytelling, complex LOD expressions, Tableau Prep wrangling, and Tableau Cloud governance.",
    iconName: "PieChart",
    courseCount: 10,
    highlightText: "Enterprise Standard",
    popularTopics: ["Tableau Desktop", "Tableau Prep", "LOD Expressions", "Calculated Fields", "Tableau Server"],
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    id: "data-analytics",
    name: "Analytics Academy",
    slug: "data-analytics-training",
    description: "Comprehensive end-to-end data analytics bootcamps covering Advanced SQL, Python, Excel, and BI tools.",
    iconName: "LineChart",
    courseCount: 8,
    highlightText: "Career Switch Favorite",
    popularTopics: ["Advanced SQL", "Business Intelligence", "Dashboard Design", "Data Wrangling", "Stat Analysis"],
    gradient: "from-emerald-500 to-teal-700",
  },

  {
    id: "agile-pm",
    name: "Project Management & Agile",
    slug: "pmp-scrum-training",
    description: "Gain global recognition with PMP certification prep, Professional Scrum Master (PSM), and Agile delivery frameworks.",
    iconName: "Briefcase",
    courseCount: 4,
    highlightText: "Leadership Path",
    popularTopics: ["PMP Prep", "Scrum Master", "Agile Leadership", "Risk Management"],
    gradient: "from-orange-500 to-rose-600",
  },
];
