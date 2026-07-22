export interface FAQItem {
  id: string;
  category: "general" | "salesforce" | "power-bi" | "tableau" | "corporate" | "placement";
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    id: "faq-01",
    category: "general",
    question: "What mode of training does BSquare Solutions & Services offer?",
    answer: "BSquare offers Live Online Interactive Classes, In-person Classroom Training (at our center), and Hybrid learning modes. All live sessions are recorded and made available on our LMS portal for lifetime review."
  },
  {
    id: "faq-02",
    category: "general",
    question: "Are there weekend and weekday batch options available?",
    answer: "Yes! We run regular Weekday batches (Monday through Thursday) as well as Weekend batches (Saturday and Sunday) to accommodate both full-time students and working professionals."
  },
  {
    id: "faq-03",
    category: "salesforce",
    question: "What Salesforce courses are available at BSquare?",
    answer: "We offer complete Salesforce tracks including Salesforce Administrator (ADM-201), Platform App Builder (CRT-801), Platform Developer I (PDI), Lightning Web Components (LWC), Flow Automation, Sales & Service Cloud, Salesforce Data Cloud, and the latest Agentforce & Einstein AI."
  },
  {
    id: "faq-04",
    category: "power-bi",
    question: "Does the Power BI course prepare me for official Microsoft PL-300 certification?",
    answer: "Yes, our Power BI Complete Masterclass curriculum is 100% aligned with the official Microsoft PL-300 exam syllabus. We provide practice tests, DAX cheat sheets, and exam voucher guidance."
  },
  {
    id: "faq-05",
    category: "tableau",
    question: "What topics are covered in the Tableau Academy?",
    answer: "Our Tableau Academy covers Tableau Desktop fundamentals, visual chart design, Tableau Prep Builder, Fixed/Include/Exclude LOD calculations, spatial data, and Tableau Cloud/Server deployment."
  },
  {
    id: "faq-06",
    category: "corporate",
    question: "Can BSquare customize technology training programs for corporate teams?",
    answer: "Absolutely. We specialize in tailored corporate upskilling bootcamps, employee skill gap assessments, private team cohorts, and technology adoption programs delivered online, onsite, or hybrid."
  },
  {
    id: "faq-07",
    category: "placement",
    question: "What career & placement support does BSquare provide?",
    answer: "We provide comprehensive career guidance including 1-on-1 resume building, LinkedIn profile optimization, technical mock interviews, certification exam prep, and referral assistance."
  },
  {
    id: "faq-08",
    category: "general",
    question: "Can I attend a free demo class before enrolling?",
    answer: "Yes! You can book a Free Demo Class for any course by submitting the demo request form or contacting our advisory team via WhatsApp or phone."
  }
];
