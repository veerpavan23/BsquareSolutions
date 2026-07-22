export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: "Salesforce" | "Power BI" | "Tableau" | "AI & Data Science" | "Career Advice";
  publishDate: string;
  readTime: string;
  author: string;
  authorRole: string;
  content: string; // Markdown / HTML formatted body
  tags: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-01",
    slug: "salesforce-adm-201-preparation-guide",
    title: "How to Clear Salesforce Certified Administrator (ADM-201) Exam on First Attempt",
    excerpt: "Comprehensive study plan, breakdown of high-weightage topics (Flows, Security, Data Management), and scenario exam strategies.",
    category: "Salesforce",
    publishDate: "July 15, 2026",
    readTime: "8 min read",
    author: "BSquare Salesforce Advisory Team",
    authorRole: "Lead Salesforce Instructors",
    tags: ["Salesforce", "ADM-201", "Certification", "Career Advice"],
    content: `
Passing the Salesforce ADM-201 certification exam is the first crucial milestone toward a rewarding cloud computing career. With Salesforce updating its exam objectives to focus heavily on **Record-Triggered Flows** and **Security Models**, proper preparation strategy is key.

### Key Weightage Breakdown
1. **Configuration and Setup (20%)**: Standard objects, custom objects, schema design, and Lightning App Builder.
2. **Object Manager and Data Model (15%)**: Master-Detail vs Lookup, Formula fields, Roll-up summaries.
3. **Sales and Marketing Applications (12%)**: Lead conversion, Sales processes, Opportunity stages.
4. **Service and Support Applications (11%)**: Case management, Assignment rules, Escalation rules.
5. **Productivity and Collaboration (7%)**: Chatter, Mobile App, Activity management.
6. **Data and Analytics Management (14%)**: Custom report types, Joined reports, Dashboard filters.
7. **Workflow/Process Automation (16%)**: Screen Flows, Record-Triggered Flows, Fast Field updates.

### Pro-Tips for Exam Day
- **Read scenario questions twice**: Identify the *declarative solution* preferred by Salesforce before selecting any code option.
- **Master Flow Builder**: Process Builder and Workflow Rules are retired in modern exams; all automation questions focus on Flows.
- **Take Mock Practice Exams**: Spend the last 5 days taking timed mock tests to build speed and accuracy.
    `
  },
  {
    id: "blog-02",
    slug: "power-bi-dax-calculate-demystified",
    title: "Mastering DAX CALCULATE & Filter Context in Power BI",
    excerpt: "Deep dive into how CALCULATE transforms row context into filter context, and how to write efficient DAX measures.",
    category: "Power BI",
    publishDate: "July 10, 2026",
    readTime: "10 min read",
    author: "Power BI Practice Lead",
    authorRole: "Microsoft Certified Trainer",
    tags: ["Power BI", "DAX", "Data Analytics", "PL-300"],
    content: `
In Data Analysis Expressions (DAX), **CALCULATE** is the single most powerful function. It is the only function in DAX that can modify, replace, or override the existing filter context of a visual.

### Syntax of CALCULATE
\`\`\`dax
CALCULATE( Expression, Filter1, Filter2, ... )
\`\`\`

### How CALCULATE Works Step-by-Step
1. **Evaluates filter parameters** in the outer filter context.
2. **Performs context transition**: Converts any active row contexts into equivalent filter contexts.
3. **Applies new filters**: Modifies or adds to the visual's filter context.
4. **Evaluates the expression** under the new combined filter context.

### Common Use Cases
- **Time Intelligence**: \`CALCULATE([Total Sales], SAMEPERIODLASTYEAR('Calendar'[Date]))\`
- **Ignoring Visual Slicers**: \`CALCULATE([Total Sales], ALL('Product'[Category]))\`
    `
  },
  {
    id: "blog-03",
    slug: "tableau-lod-fixed-include-exclude-explained",
    title: "Tableau Level of Detail (LOD) Expressions Explained with Examples",
    excerpt: "Understand when to use FIXED, INCLUDE, and EXCLUDE LOD expressions in enterprise Tableau workbook design.",
    category: "Tableau",
    publishDate: "June 28, 2026",
    readTime: "7 min read",
    author: "Senior Tableau Visual Architect",
    authorRole: "Tableau Certified Data Analyst",
    tags: ["Tableau", "Visual Analytics", "LOD", "Dashboard"],
    content: `
Level of Detail (LOD) expressions allow you to compute values at the data source level and the visualization level without having to bring dimensions directly into the viz grid.

### 1. FIXED LOD
Computes the expression using only the specified dimensions, ignoring dimensions present in the viz.
\`\`\`tableau
{ FIXED [Customer ID] : SUM([Sales]) }
\`\`\`

### 2. INCLUDE LOD
Computes the expression using the specified dimensions in addition to whatever dimensions are in the viz.
\`\`\`tableau
{ INCLUDE [State] : AVG([Sales]) }
\`\`\`

### 3. EXCLUDE LOD
Computes the expression subtracting the specified dimensions from the viz granularity.
\`\`\`tableau
{ EXCLUDE [Region] : SUM([Sales]) }
\`\`\`
    `
  },
  {
    id: "blog-04",
    slug: "generative-ai-agentforce-rag-career-guide",
    title: "The Rise of Agentic AI: How Agentforce and GenAI are Transforming Enterprise Careers",
    excerpt: "Explore the explosive demand for Agentic AI specialists, prompt engineers, and RAG developers in 2026 and beyond.",
    category: "AI & Data Science",
    publishDate: "June 18, 2026",
    readTime: "9 min read",
    author: "AI Research Lead",
    authorRole: "Principal AI Consultant",
    tags: ["Agentforce", "Generative AI", "LangChain", "Careers"],
    content: `
The tech landscape has shifted rapidly from simple chat assistants to **autonomous AI agents** that plan, reason, execute multi-step tool actions, and collaborate seamlessly with enterprise software systems.

### Why Agentic AI Matters
Unlike static LLM prompts, autonomous agents like **Salesforce Agentforce** utilize grounded CRM data, strict trust guardrails, and automated record flows to resolve customer queries end-to-end.

### Key Skills to Learn in 2026
1. **Retrieval-Augmented Generation (RAG)**: Vector databases (Pinecone, Chroma), semantic embeddings.
2. **Agentic Frameworks**: LangGraph, LlamaIndex, Salesforce Agentforce Topics/Actions.
3. **Data Grounding**: Connecting AI models directly to trusted enterprise schemas.
    `
  }
];
