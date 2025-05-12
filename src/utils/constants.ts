import { RxDashboard } from "react-icons/rx";
import { Pharmacy } from "./types";
import { FiUser} from 'react-icons/fi';
import { IoSettingsOutline } from "react-icons/io5";
export const faqItems = [
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, magna nec fringilla accumsan, nulla erat pulvinar quam, id hendrerit felis. Maecenas ligula consectetur vitae, ut amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per incepto himenaeos. Praesent auctor purus turpis, eget egestas, ac scelerisque urna pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl.",
  },
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    question: "Vorem ipsum dolor sit amet, consectetur adipiscing elit.",
    answer: "Vorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    question: "Qorem ipsum dolor sit amet, consectetur adipiscing elit.",
    answer: "Qorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    question: "Korem ipsum dolor sit amet, consectetur adipiscing elit.",
    answer: "Korem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    question: "Qorem ipsum dolor sit amet, consectetur adipiscing elit.",
    answer: "Qorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

export const slidesData = [
  {
    heading: "Automate Specialty Medication Workflows.",
    image: "/images/Dashboard 2.png",
  },
  {
    heading: "Dashboard 2 Specialty Medication Workflows.",
    image: "/images/Dashboard 2.png",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Kristin Watson",
    designation: "Designation",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar.",
    image: "/images/testinomial.png",
    profileLink: "#",
    company: "TechCorp",
    companyLink: "https://www.google.com/",
  },
  {
    id: 2,
    name: "Jane Smith",
    designation: "Developer",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar.",
    image: "/images/testinomial.png",
    profileLink: "#",
    company: "DevStudio",
    companyLink: "https://www.google.com/",
  },
  {
    id: 3,
    name: "John Doe",
    designation: "Designer",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar.",
    image: "/images/testinomial.png",
    profileLink: "#",
    company: "CreativeHub",
    companyLink: "https://www.google.com/",
  },
];

export const services = [
  {
    id: 1,
    title: "PA Criteria",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. ",
    bgColor: "bg-[#DEF0FC]",
    imageUrl: "images/serviceslider1.png",
  },
  {
    id: 2,
    title: "CMM",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. ",
    bgColor: "bg-[#FFF9E0]",
    imageUrl: "images/serviceslider1.png",
  },
  {
    id: 3,
    title: "Analytics",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. ",
    bgColor: "bg-[#DEF0FC]",
    imageUrl: "images/serviceslider1.png",
  },
  {
    id: 4,
    title: "Consulting",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. ",
    bgColor: "bg-[#FFF9E0]",
    imageUrl: "images/serviceslider1.png",
  },
  {
    id: 2,
    title: "CMM",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. ",
    bgColor: "bg-[#FFF9E0]",
    imageUrl: "images/serviceslider1.png",
  },
  {
    id: 3,
    title: "Analytics",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. ",
    bgColor: "bg-[#DEF0FC]",
    imageUrl: "images/serviceslider1.png",
  },
  {
    id: 4,
    title: "Consulting",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. ",
    bgColor: "bg-[#FFF9E0]",
    imageUrl: "images/serviceslider1.png",
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
  { name: "Settings", icon: "/sidebar-Settings.svg", path: "/admin/settings" },
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
  {
    id: "7",
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
    id: "8",
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
    id: "9",
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
    id: "10",
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
    time:"18 min ago"
  },
  {
    icon: "/images/notify2.png",
    message: "Your ad Lorem Ipsum dolor has published to screens.",
    time:"18 min ago"
  },
  {
    icon: "/images/notify3.png",
    message: "Your ad Lorem Ipsum dolor has published to screens.",
    time:"18 min ago"
  },
  {
    icon: "/images/notify4.png",
    message: "Your ad Lorem Ipsum dolor has published to screens.",
    time:"18 min ago"
  },
  {
    icon: "/images/notify5.png",
    message: "Your ad Lorem Ipsum dolor has published to screens.",
    time:"18 min ago"
  },
  {
    icon: "/images/notify1.png",
    message: "Your ad Lorem Ipsum dolor has published to screens.",
    time:"18 min ago"
  },
  {
    icon: "/images/notify2.png",
    message: "Your ad Lorem Ipsum dolor has published to screens.",
    time:"18 min ago"
  },
  {
    icon: "/images/notify3.png",
    message: "Your ad Lorem Ipsum dolor has published to screens.",
    time:"18 min ago"
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
  {title: "About", path: "about"},
  {title: "Services", path: "services"},
  {title: "Contact", path: "contact"},
  {title: "FAQs", path: "faqs"}
]
