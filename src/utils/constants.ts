import { RxDashboard } from "react-icons/rx";
import { Pharmacy } from "./types";
import { FiUser } from 'react-icons/fi';
import { IoSettingsOutline } from "react-icons/io5";
export const faqItems = [
  {
    question: "What is PriorAuth?",
    answer:
      "PriorAuth is a cloud-based platform that combines the simplicity of spreadsheets with the functionality of databases. It enables users to organize data, collaborate in real-time, and build custom applications without extensive coding knowledge.",
  },
  {
    question: "How do I get started with PriorAuth?",
    answer:
      "To begin using PriorAuth, sign up for a free account on our website. You can then create a new 'base' (our term for a database) from scratch or use one of our pre-designed templates to suit your needs.",
  },
  {
    question: "What are 'bases' and 'tables' in PriorAuth?",
    answer:
      "A 'base' is a collection of related information, similar to a database. Within each base, you can have multiple 'tables,' which are akin to spreadsheets, where each table contains rows (records) and columns (fields) to store and organize data.",
  },
  {
    question: "Can I collaborate with others in PriorAuth?",
    answer:
      "Yes, PriorAuth supports real-time collaboration. You can invite team members to your bases, assign different permission levels, and work together simultaneously on the same data.",
  },
  {
    question: "Does PriorAuth integrate with other tools?",
    answer:
      "PriorAuth offers integrations with various third-party applications, including Slack, Google Workspace, and more. Additionally, you can use tools like Zapier or our own Automations to create custom workflows between PriorAuth and other services.",
  },
  {
    question: "What are PriorAuth Automations?",
    answer:
      "Automations in PriorAuth allow you to set up custom triggers and actions to streamline repetitive tasks. For example, you can configure an automation to send an email notification when a new record is added to a table.",
  },
  {
    question: "Is there a mobile app for PriorAuth?",
    answer:
      "Yes, PriorAuth offers mobile applications for both iOS and Android devices, enabling you to access and edit your bases on the go.",
  },
  {
    question: "What pricing plans does PriorAuth offer?",
    answer:
      "PriorAuth provides several pricing tiers, including a free plan with essential features, and paid plans (Plus, Pro, and Enterprise) that offer advanced functionalities, increased record limits, and additional collaboration tools.",
  },
  {
    question: "How secure is my data in PriorAuth?",
    answer:
      "PriorAuth implements robust security measures, including data encryption in transit and at rest, regular security audits, and compliance with industry standards to ensure your data is protected.",
  },
  {
    question: "Where can I find more help or support?",
    answer:
      "For additional assistance, you can visit the PriorAuth Help Center, which offers comprehensive guides and tutorials. You can also engage with the PriorAuth Community to ask questions and share insights with other users.",
  },
];

export const slidesData = [
  {
    heading: "Automate Specialty Medication Workflows",
    image: "/images/Dashboard 2.png",
  },
  {
    heading: "Specialty Medication Workflow Dashboard",
    image: "/images/Dashboard 2.png",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Stephanie Hartgrove",
    designation: "Global Vice President",
    content:
      "PriorAuth has transformed our communications strategy, enabling us to provide real-time data access that has strengthened our relationship with executive leadership.",
     image: "/images/portrait.avif",
    profileLink: "https://intail.ai/directory/p/stephanie-hartgrove/666e9c5fa2fd8022d6089e17",
    company: "Johnson & Johnson",
    companyLink: "https://www.jnj.com/",
  },
  {
    id: 2,
    name: "Reddit User",
    designation: "Startup Founder",
    content:
      "PriorAuth is incredibly user-friendly and has significantly improved my team's productivity and communication. Its versatility for startups is solid, offering customizable workflows that adapt as your business grows.",
     image: "/images/Kevin_Spacey,_May_2013.jpg",
    profileLink: "#",
    company: "Reddit Community",
    companyLink: "https://www.reddit.com/r/Airtable/comments/17lto9a/is_airtable_worth_it_any_alternatives/",
  },
  {
    id: 3,
    name: "Emanuel C.",
    designation: "Media Production Professional",
    content:
      "PriorAuth allows me to create beautiful dashboards for clients, quickly see my data, and collect information with ease, enhancing my workflow and client presentations.",
    image: "/images/gd_.jpg",
    profileLink: "#",
    company: "Capterra",
    companyLink: "https://www.capterra.com/p/146652/Airtable/reviews/",
  },
  {
    id: 5,
    name: "EXPERTE.com Review",
    designation: "Software Review Specialist",
    content:
      "Many users praise PriorAuth for its customizability. They find the tool suitable for diverse applications due to its ability to personalize fields, views, and templates.",
    image: "/images/testinomial.png",
    profileLink: "#",
    company: "EXPERTE.com",
    companyLink: "https://www.experte.com/project-management/airtable",
  },
];


export const services = [
  {
    id: 1,
    title: "PA Criteria",
    description:
      "Prior Authorization (PA) Criteria are guidelines established by health insurance providers to determine the medical necessity and appropriateness of certain healthcare services, procedures, or medications before they are provided to a patient. These criteria ensure that treatments align with accepted medical standards, are cost-effective, and are appropriate for the patient's condition. Healthcare providers must submit a PA request, including relevant clinical information, to obtain approval from the insurer. Failure to obtain prior authorization when required may result in the insurer denying coverage for the service or medication.",
    bgColor: "bg-[#DEF0FC]",
    imageUrl: "images/serviceslider1.png",
  },
  {
    id: 2,
    title: "CMM",
    description:
      "A Coordinate Measuring Machine (CMM) service encompasses a range of professional offerings designed to ensure the precision, reliability, and optimal performance of CMMs used in industrial and manufacturing settings. These services are essential for industries where dimensional accuracy is critical, such as aerospace, automotive, medical device manufacturing, and electronics. ",
    bgColor: "bg-[#FFF9E0]",
    imageUrl: "images/cmm_validation_service.jpg",
  },
  {
    id: 3,
    title: "Analytics",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. ",
    bgColor: "bg-[#DEF0FC]",
    imageUrl: "images/analytics.jpg",

  },
  {
    id: 4,
    title: "Consulting",
    description:
      "Consulting services involve providing expert advice and specialized knowledge to organizations or individuals to help them address specific challenges, improve performance, or achieve their objectives. These services are typically offered by professionals or firms with deep expertise in areas such as strategy, operations, technology, finance, marketing, human resources, and more",
    bgColor: "bg-[#FFF9E0]",
    imageUrl: "images/Business-Consulting-Services.png",
  },
  {
    id: 2,
    title: "CMM",
    description:
      "A Coordinate Measuring Machine (CMM) service encompasses a range of professional offerings designed to ensure the precision, reliability, and optimal performance of CMMs used in industrial and manufacturing settings. These services are essential for industries where dimensional accuracy is critical, such as aerospace, automotive, medical device manufacturing, and electronics. ",
    bgColor: "bg-[#FFF9E0]",
    imageUrl: "images/cmm_validation_service.jpg",
  },
  {
    id: 3,
    title: "Analytics",
    description:
      "Analytics services involve the systematic collection, processing, and interpretation of data to extract actionable insights that inform decision-making. These services help organizations understand patterns, predict trends, and optimize operations across various domains such as marketing, finance, and supply chain management.",
    bgColor: "bg-[#DEF0FC]",
    imageUrl: "images/analytics.jpg",
  },
  {
    id: 4,
    title: "Consulting",
    description:
      "Consulting services involve providing expert advice and specialized knowledge to organizations or individuals to help them address specific challenges, improve performance, or achieve their objectives. These services are typically offered by professionals or firms with deep expertise in areas such as strategy, operations, technology, finance, marketing, human resources, and more",
    bgColor: "bg-[#FFF9E0]",
    imageUrl: "images/Business-Consulting-Services.png",
  },
];

export const brands = [
  "/amara.svg",
  "/earth2.svg",
  "/hooks.svg",
  "/liva.svg",
  "/radiyal.svg",
  "/uilogos.svg",
];

export const adminSidebarItems = [
  { name: "Dashboard", icon: "/sidebar-dashboard.svg", path: "/admin/dashboard" },
  { name: "Pharmacies", icon: "/sidebar-pharmacy.svg", path: "/admin/pharmacies" },
  { name: "Prescribers", icon: "/sidebar-Prescribers.svg", path: "/admin/prescribers" },
  { name: "Requests", icon: "/sidebar-requets.svg", path: "/admin/requests" },
  { name: "Initiations", icon: "/sidebar-Initiations.svg", path: "/admin/initiations" },
  { name: "Send To Plan", icon: "/sidebar-sent-to-plan.svg", path: "/g" },
  { name: "Calls", icon: "/sidebar-calling.svg", path: "/h" },
  { name: "Staff", icon: "/sidebar-staff.svg", path: "/f" },
  { name: "Tasks", icon: "/sidebar-task-01.svg", path: "/d" },
  { name: "Permissions", icon: "/sidebar-role&permission.svg", path: "/admin/permissions" },
];

export const profileMenu = [
  { name: "Dashboard", icon: RxDashboard, path: "/admin/dashboard" },
  { name: "Profile", icon: FiUser, path: "/admin/profile" },
  { name: "Settings", icon: IoSettingsOutline, path: "/admin/settings" },
];
// pharmacy data
export const pharmacyData = [
  {
    id: 1,
    pharmacy: {
      type: "avatar",
      image: "/images/Abstergo Ltd..png",
      text: "Abstergo Ltd.",
    },
    phone: "(217) 555-0113",
  },
  {
    id: 2,
    pharmacy: {
      type: "avatar",
      image: "/images/Big Kahuna Ltd..png",
      text: "Big Kahuna Ltd.",
    },
    phone: "(629) 555-0129",
  },
  {
    id: 3,
    pharmacy: {
      type: "avatar",
      image: "/images/Acme Co..png",
      text: "Acme Co.",
    },
    phone: "(209) 555-0104",
  },
  {
    id: 4,
    pharmacy: {
      type: "avatar",
      image: "/images/Barone LLC..png",
      text: "Barone LLC.",
    },
    phone: "(302) 555-0107",
  },
];

// Requests data
export const requestsData = [
  {
    id: "1",
    medication: "Ibsrela 50 mg Tab.",
    patient: "Cody Fisher",
    prescriber: {
      type: "avatar",
      image: "/images/1ab944febc0bdbcbbda2698fb3496a68.png",
      text: "Wade Warren",
    },
    submittedOn: "01/02/2025",
    pharmacy: {
      type: "avatar",
      image: "/images/Abstergo Ltd..png",
      text: "Abstergo Ltd.",
    },
    status: {
      type: "badge",
      variant: "success",
      text: "Updated Progress Sent",
    },
  },
  {
    id: "2",
    medication: "Xifaxan 550 mg Tab.",
    patient: "Kristin Watson",
    prescriber: {
      type: "avatar",
      image: "/images/1ab944febc0bdbcbbda2698fb3496a68.png",
      text: "Brooklyn Simmons",
    },
    submittedOn: "31/03/2025",
    pharmacy: {
      type: "icon",
      icon: "B",
      color: "bg-pink-500",
      text: "Big Kahuna Ltd.",
    },
    status: { type: "badge", variant: "info", text: "Progress Notes Required" },
  },
  {
    id: "3",
    medication: "Vemildy 25 mg Tab.",
    patient: {
      type: "avatar",
      image: "/images/b4d87623d5204a1497c568683b4657f0.png",
      text: "Cameron Williamson",
    },
    prescriber: {
      type: "avatar",
      image: "/images/d339be91b10aa7a7aad2a051dc5790cf.png",
      text: "Theresa Webb",
    },
    submittedOn: "21/02/2025",
    pharmacy: {
      type: "avatar",
      image: "/images/Acme Co..png",
      text: "Acme Co.",
    },
    status: { type: "badge", variant: "gray", text: "Queued for Call" },
  },
  {
    id: "4",
    medication: "Mounjaro 2.5 mg Inj",
    patient: "Theresa Webb",
    prescriber: {
      type: "avatar",
      image: "/images/d339be91b10aa7a7aad2a051dc5790cf.png",
      text: "Esther Howard",
    },
    submittedOn: "01/01/2025",
    pharmacy: {
      type: "avatar",
      image: "/images/Barone LLC..png",
      text: "Barone LLC.",
    },
    status: {
      type: "badge",
      variant: "warning",
      text: "Not Enrolled in the Bill",
    },
  },
];

// Prescribers data
export const prescribersData = [
  {
    id: "1",
    prescriber: {
      type: "avatar",
      image: "/images/1ab944febc0bdbcbbda2698fb3496a68.png",
      text: "Wade Warren",
    },
    email: "evans@me.com",
    phone: "(217) 555-0113",
    location: "New York",
  },
  {
    id: "2",
    prescriber: {
      type: "avatar",
      image: "/images/1ab944febc0bdbcbbda2698fb3496a68.png",
      text: "Brooklyn Simmons",
    },
    email: "wikinerd@verizon.net",
    phone: "(629) 555-0129",
    location: "New Jersey",
  },
  {
    id: "3",
    prescriber: {
      type: "avatar",
      image: "/images/b4d87623d5204a1497c568683b4657f0.png",
      text: "Theresa Webb",
    },
    email: "ianbuck@icloud.com",
    phone: "(209) 555-0104",
    location: "Pennsylvania",
  },
  {
    id: "4",
    prescriber: {
      type: "avatar",
      image: "/images/1ab944febc0bdbcbbda2698fb3496a68.png",
      text: "Esther Howard",
    },
    email: "blixem@aol.com",
    phone: "(302) 555-0107",
    location: "New York",
  },
];

// Staff data
export const staffData = [
  {
    id: "1",
    name: {
      type: "avatar",
      image: "/images/1ab944febc0bdbcbbda2698fb3496a68.png",
      text: "Cody Fisher",
    },
    email: "evans@me.com",
    phone: "(217) 555-0113",
    role: "Accounts",
  },
  {
    id: "2",
    name: {
      type: "avatar",
      image: "/images/1ab944febc0bdbcbbda2698fb3496a68.png",
      text: "Kristin Watson",
    },
    email: "wikinerd@verizon.net",
    phone: "(629) 555-0129",
    role: "Admin",
  },
  {
    id: "3",
    name: {
      type: "avatar",
      image: "/images/1ab944febc0bdbcbbda2698fb3496a68.png",
      text: "Cameron Williamson",
    },
    email: "ianbuck@icloud.com",
    phone: "(209) 555-0104",
    role: "Manager",
  },
  {
    id: "4",
    name: {
      type: "avatar",
      image: "/images/1ab944febc0bdbcbbda2698fb3496a68.png",
      text: "Theresa Webb",
    },
    email: "blixem@aol.com",
    phone: "(302) 555-0107",
    role: "Exchange",
  },
];

// Tasks data
export const tasksData = [
  {
    id: "51655",
    medication: "Ibsrela 50 mg Tab.",
    assignedTo: {
      type: "avatar",
      image: "/images/1ab944febc0bdbcbbda2698fb3496a68.png",
      text: "Cody Fisher",
    },
    prescriber: {
      type: "avatar",
      image: "/images/1ab944febc0bdbcbbda2698fb3496a68.png",
      text: "Wade Warren",
    },
    assignedOn: "01/02/2025",
    status: {
      type: "badge",
      variant: "success",
      text: "Updated Progress Sent",
    },
    pharmacy: {
      type: "icon",
      icon: "A",
      color: "bg-cyan-500",
      text: "Abstergo Ltd.",
    },
  },
  {
    id: "51655",
    medication: "Xifaxan 550 mg Tab.",
    assignedTo: {
      type: "avatar",
      image: "/images/1ab944febc0bdbcbbda2698fb3496a68.png",
      text: "Kristin Watson",
    },
    prescriber: {
      type: "avatar",
      image: "/images/1ab944febc0bdbcbbda2698fb3496a68.png",
      text: "Brooklyn Simmons",
    },
    assignedOn: "31/03/2025",
    status: { type: "badge", variant: "info", text: "Progress Notes Required" },
    pharmacy: {
      type: "icon",
      icon: "B",
      color: "bg-pink-500",
      text: "Big Kahuna Ltd.",
    },
  },
  {
    id: "51655",
    medication: "Vemildy 25 mg Tab.",
    assignedTo: {
      type: "avatar",
      image: "/images/b4d87623d5204a1497c568683b4657f0.png",
      text: "Cameron Williamson",
    },
    prescriber: {
      type: "avatar",
      image: "/images/d339be91b10aa7a7aad2a051dc5790cf.png",
      text: "Theresa Webb",
    },
    assignedOn: "21/02/2025",
    status: { type: "badge", variant: "gray", text: "Queued for Call" },
    pharmacy: {
      type: "icon",
      icon: "A",
      color: "bg-blue-500",
      text: "Acme Co.",
    },
  },
  {
    id: "51655",
    medication: "Mounjaro 2.5 mg Inj",
    assignedTo: {
      type: "avatar",
      image: "/images/d339be91b10aa7a7aad2a051dc5790cf.png",
      text: "Theresa Webb",
    },
    prescriber: {
      type: "icon",
      icon: "M",
      color: "bg-red-500",
      text: "Esther Howard",
    },
    assignedOn: "01/01/2025",
    status: {
      type: "badge",
      variant: "warning",
      text: "Not Enrolled in the Bill",
    },
    pharmacy: {
      type: "icon",
      icon: "B",
      color: "bg-purple-500",
      text: "Barone LLC.",
    },
  },
];


export const pharmacies: Pharmacy[] = [
  {
    id: '1',
    name: 'Abstergo Ltd.',
    image: "/images/Abstergo Ltd..png",
    type: 'pharmacy',
    phone: '(217) 555-0113',
    lastRequests: {
      date: '10/03/2023',
      approved: 42,
      denied: 12
    },
  },
  {
    id: '2',
    name: 'Big Kahuna Ltd.',
    image: "/images/Big Kahuna Ltd..png",
    type: 'pharmacy',
    phone: '(217) 555-0113',
    lastRequests: {
      date: '10/03/2023',
      approved: 42,
      denied: 12
    },
  },
  {
    id: '3',
    name: 'Barone LLC.',
    image: "/images/Barone LLC..png",
    type: 'pharmacy',
    phone: '(217) 555-0113',
    lastRequests: {
      date: '10/03/2023',
      approved: 42,
      denied: 12
    },
  },
  {
    id: '4',
    name: 'Acme Co.',
    image: "/images/Acme Co..png",
    type: 'pharmacy',
    phone: '(217) 555-0113',
    lastRequests: {
      date: '10/03/2023',
      approved: 42,
      denied: 12
    },
  }
];

export const tabs = [
  { id: 'all', label: 'All Pharmacies', active: true },
  { id: 'ny', label: 'Pharmacies (New York)', active: false },
  { id: 'nj', label: 'Pharmacies (New Jersey)', active: false },
  { id: 'pa', label: 'Pharmacies (Pennsylvania)', active: false }
];

export const reqStatusOptions = [
  { label: 'Auto-initiation', value: 'auto-initiation' },
  { label: 'Auto-answering of clinical', value: 'auto-answering-of-clinical' },
  { label: 'Progress notes extraction from prescriber EMR', value: 'progress-notes-extraction-from-prescriber-emr' },
  { label: 'Chart notes analysis', value: 'chart-notes-analysis' }
];

export const requestsDumyLargeData = [
  {
    id: "1",
    medication: "Ibsrela 50 mg Tab.",
    patient: "Cody Fisher",
    prescriber: "Wade Warren",
    submittedOn: "01/02/2025",
    pharmacy: {
      type: "avatar",
      image: "/images/Abstergo Ltd..png",
      text: "Abstergo Ltd.",
    },
    request_status: reqStatusOptions[0].value,
    // request_status: {
    //   type: "badge",
    //   variant: "success",
    //   text: "Updated Progress Sent",
    // },
  },
  {
    id: "2",
    medication: "Xifaxan 550 mg Tab.",
    patient: "Kristin Watson",
    prescriber: {
      type: "avatar",
      image: "/images/1ab944febc0bdbcbbda2698fb3496a68.png",
      text: "Brooklyn Simmons",
    },
    submittedOn: "31/03/2025",
    pharmacy: {
      type: "icon",
      icon: "B",
      color: "bg-pink-500",
      text: "Big Kahuna Ltd.",
    },
    request_status: reqStatusOptions[1].value,
    // request_status: { type: "badge", variant: "info", text: "Progress Notes Required" },
  },
  {
    id: "3",
    medication: "Vemildy 25 mg Tab.",
    patient: {
      type: "avatar",
      image: "/images/b4d87623d5204a1497c568683b4657f0.png",
      text: "Cameron Williamson",
    },
    prescriber: {
      type: "avatar",
      image: "/images/d339be91b10aa7a7aad2a051dc5790cf.png",
      text: "Theresa Webb",
    },
    submittedOn: "21/02/2025",
    pharmacy: {
      type: "avatar",
      image: "/images/Acme Co..png",
      text: "Acme Co.",
    },
    request_status: reqStatusOptions[2].value,
    // request_status: { type: "badge", variant: "gray", text: "Queued for Call" },
  },
  {
    id: "4",
    medication: "Mounjaro 2.5 mg Inj",
    patient: "Theresa Webb",
    prescriber: "Esther Howard",
    submittedOn: "01/01/2025",
    pharmacy: {
      type: "avatar",
      image: "/images/Barone LLC..png",
      text: "Barone LLC.",
    },
    request_status: reqStatusOptions[3].value,
    // request_status: {
    //   type: "badge",
    //   variant: "warning",
    //   text: "Not Enrolled in the Bill",
    // },
  },
  // {
  //   id: "5",
  //   medication: "Ibsrela 50 mg Tab.",
  //   patient: "Cody Fisher",
  //   prescriber: "Wade Warren",
  //   submittedOn: "01/02/2025",
  //   pharmacy: {
  //     type: "avatar",
  //     image: "/images/Abstergo Ltd..png",
  //     text: "Abstergo Ltd.",
  //   },
  //   request_status: "pending",
  //   // request_status: {
  //   //   type: "badge",
  //   //   variant: "success",
  //   //   text: "Updated Progress Sent",
  //   // },
  // },
  // {
  //   id: "6",
  //   medication: "Xifaxan 550 mg Tab.",
  //   patient: "Kristin Watson",
  //   prescriber: {
  //     type: "avatar",
  //     image: "/images/1ab944febc0bdbcbbda2698fb3496a68.png",
  //     text: "Brooklyn Simmons",
  //   },
  //   submittedOn: "31/03/2025",
  //   pharmacy: {
  //     type: "icon",
  //     icon: "B",
  //     color: "bg-pink-500",
  //     text: "Big Kahuna Ltd.",
  //   },
  //   request_status: "cancelled",
  //   // request_status: { type: "badge", variant: "info", text: "Progress Notes Required" },
  // },
  // {
  //   id: "7",
  //   medication: "Vemildy 25 mg Tab.",
  //   patient: {
  //     type: "avatar",
  //     image: "/images/b4d87623d5204a1497c568683b4657f0.png",
  //     text: "Cameron Williamson",
  //   },
  //   prescriber: {
  //     type: "avatar",
  //     image: "/images/d339be91b10aa7a7aad2a051dc5790cf.png",
  //     text: "Theresa Webb",
  //   },
  //   submittedOn: "21/02/2025",
  //   pharmacy: {
  //     type: "avatar",
  //     image: "/images/Acme Co..png",
  //     text: "Acme Co.",
  //   },
  //   request_status: "completed",
  //   // request_status: { type: "badge", variant: "gray", text: "Queued for Call" },
  // },
  // {
  //   id: "8",
  //   medication: "Mounjaro 2.5 mg Inj",
  //   patient: "Theresa Webb",
  //   prescriber: "Esther Howard",
  //   submittedOn: "01/01/2025",
  //   pharmacy: {
  //     type: "avatar",
  //     image: "/images/Barone LLC..png",
  //     text: "Barone LLC.",
  //   },
  //   request_status: "rejected",
  //   // request_status: {
  //   //   type: "badge",
  //   //   variant: "warning",
  //   //   text: "Not Enrolled in the Bill",
  //   // },
  // },
  // {
  //   id: "9",
  //   medication: "Ibsrela 50 mg Tab.",
  //   patient: "Cody Fisher",
  //   prescriber: "Wade Warren",
  //   submittedOn: "01/02/2025",
  //   pharmacy: {
  //     type: "avatar",
  //     image: "/images/Abstergo Ltd..png",
  //     text: "Abstergo Ltd.",
  //   },
  //   request_status: "approved",
  //   // request_status: {
  //   //   type: "badge",
  //   //   variant: "success",
  //   //   text: "Updated Progress Sent",
  //   // },
  // },
  // {
  //   id: "10",
  //   medication: "Xifaxan 550 mg Tab.",
  //   patient: "Kristin Watson",
  //   prescriber: {
  //     type: "avatar",
  //     image: "/images/1ab944febc0bdbcbbda2698fb3496a68.png",
  //     text: "Brooklyn Simmons",
  //   },
  //   submittedOn: "31/03/2025",
  //   pharmacy: {
  //     type: "icon",
  //     icon: "B",
  //     color: "bg-pink-500",
  //     text: "Big Kahuna Ltd.",
  //   },
  //   request_status: "pending",
  //   // request_status: { type: "badge", variant: "info", text: "Progress Notes Required" },
  // },
]

export const rquestDetailpageData = [
  {
    id: "1",
    medication: "Ibsrela 50 mg Tab.",
    patient: "Cody Fisher",
    prescriber: "Wade Warren",
    submittedOn: "01/02/2025",
    pharmacy: {
      type: "avatar",
      image: "/images/Abstergo Ltd..png",
      text: "Abstergo Ltd.",
    },
    status: {
      type: "badge",
      variant: "success",
      text: "Updated Progress Sent",
    },
  },
  {
    id: "2",
    medication: "Xifaxan 550 mg Tab.",
    patient: "Kristin Watson",
    prescriber: {
      type: "avatar",
      image: "/images/1ab944febc0bdbcbbda2698fb3496a68.png",
      text: "Brooklyn Simmons",
    },
    submittedOn: "31/03/2025",
    pharmacy: {
      type: "icon",
      icon: "B",
      color: "bg-pink-500",
      text: "Big Kahuna Ltd.",
    },
    status: { type: "badge", variant: "info", text: "Progress Notes Required" },
  },
  {
    id: "3",
    medication: "Vemildy 25 mg Tab.",
    patient: {
      type: "avatar",
      image: "/images/b4d87623d5204a1497c568683b4657f0.png",
      text: "Cameron Williamson",
    },
    prescriber: {
      type: "avatar",
      image: "/images/d339be91b10aa7a7aad2a051dc5790cf.png",
      text: "Theresa Webb",
    },
    submittedOn: "21/02/2025",
    pharmacy: {
      type: "avatar",
      image: "/images/Acme Co..png",
      text: "Acme Co.",
    },
    status: { type: "badge", variant: "gray", text: "Queued for Call" },
  },
  {
    id: "4",
    medication: "Mounjaro 2.5 mg Inj",
    patient: "Theresa Webb",
    prescriber: "Esther Howard",
    submittedOn: "01/01/2025",
    pharmacy: {
      type: "avatar",
      image: "/images/Barone LLC..png",
      text: "Barone LLC.",
    },
    status: {
      type: "badge",
      variant: "warning",
      text: "Not Enrolled in the Bill",
    },
  },
  {
    id: "5",
    medication: "Ibsrela 50 mg Tab.",
    patient: "Cody Fisher",
    prescriber: "Wade Warren",
    submittedOn: "01/02/2025",
    pharmacy: {
      type: "avatar",
      image: "/images/Abstergo Ltd..png",
      text: "Abstergo Ltd.",
    },
    status: {
      type: "badge",
      variant: "success",
      text: "Updated Progress Sent",
    },
  },
  {
    id: "6",
    medication: "Xifaxan 550 mg Tab.",
    patient: "Kristin Watson",
    prescriber: {
      type: "avatar",
      image: "/images/1ab944febc0bdbcbbda2698fb3496a68.png",
      text: "Brooklyn Simmons",
    },
    submittedOn: "31/03/2025",
    pharmacy: {
      type: "icon",
      icon: "B",
      color: "bg-pink-500",
      text: "Big Kahuna Ltd.",
    },
    status: { type: "badge", variant: "info", text: "Progress Notes Required" },
  },
]

export const notification = [
  {
    icon: "/images/notify1.png",
    message: "Your ad Lorem Ipsum dolor has published to screens.",
    time: "18 min ago"
  },
  {
    icon: "/images/notify2.png",
    message: "Your ad Lorem Ipsum dolor has published to screens.",
    time: "18 min ago"
  },
  {
    icon: "/images/notify3.png",
    message: "Your ad Lorem Ipsum dolor has published to screens.",
    time: "18 min ago"
  },
  {
    icon: "/images/notify4.png",
    message: "Your ad Lorem Ipsum dolor has published to screens.",
    time: "18 min ago"
  },
  {
    icon: "/images/notify5.png",
    message: "Your ad Lorem Ipsum dolor has published to screens.",
    time: "18 min ago"
  },
  {
    icon: "/images/notify1.png",
    message: "Your ad Lorem Ipsum dolor has published to screens.",
    time: "18 min ago"
  },
  {
    icon: "/images/notify2.png",
    message: "Your ad Lorem Ipsum dolor has published to screens.",
    time: "18 min ago"
  },
  {
    icon: "/images/notify3.png",
    message: "Your ad Lorem Ipsum dolor has published to screens.",
    time: "18 min ago"
  },
];

export const pharmacyDetail: any = [
  {
    icon: "/created.svg",
    label: "Created On",
    value: "31/03/2025",
    bg: "bg-quaternary-sky-blue",
  },
  {
    icon: "/Call.svg",
    label: "Phone Number",
    value: "(217) 555-0113",
    bg: "bg-quaternary-sky-blue",
  },
  {
    icon: "/Mail.svg",
    label: "Email",
    value: "abstergo@icloud.com",
    bg: "bg-quaternary-sky-blue",
  },
  {
    icon: "/location.svg",
    label: "Location",
    value: "New York",
    bg: "bg-quaternary-sky-blue",
  },
  {
    icon: "/calendar.svg",
    label: "Last Requests",
    value: "31/03/2025",
    bg: "bg-quaternary-sky-blue",
  },
  {
    icon: "/check.svg",
    label: "Approve Requests",
    value: 42,
    bg: "bg-[#E3F6DF]",
  },
  {
    icon: "/cancel.svg",
    label: "Denied Requests",
    value: 42,
    bg: "bg-[#FFE4E4]",
  },
];

export const homeSections = [
  { title: "About", path: "about" },
  { title: "Services", path: "services" },
  { title: "FAQs", path: "faqs" },
  { title: "Contact", path: "contact" }
];
