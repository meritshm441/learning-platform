// data/ourSolutionData.ts
import { CCE, DSM, SD } from "@/lib/constants/images";
import { SolutionItem } from "@/lib/models/ourSolutionsItem";
import { FaUserGraduate } from "react-icons/fa6";

export const ourSolutionData: SolutionItem[] = [
  {
    id: "6829f1d317460c2f2264a148",
    icon: SD,
    title: "Software Development",
    description:
      "Unlock your potential with comprehensive training in modern software development",
    price: "$350",
  },
  {
    id: "6829efe117460c2f2264a134",
    icon: DSM,
    title: "Data Science Mystery",
    description:
      "Equip yourself with the skills to analyze, interpret, and leverage data, becoming an expert.",
    price: "$350",
  },
  {
    id: "67fd04e1db1ad84c0687b468",
    icon: CCE,
    title: "Cloud Computing Expertise",
    description:
      "Gain hands-on experience in cloud architecture, preparing you to manage scalable solutions.",
    price: "$350",
  },
];

export const technologies = [
  {
    name: 'ReactJs',
    border: '#E6E6E6',
    hoverBg: 'hover:bg-white',
    hoverText: 'hover:text-[#01589A]',
    href: 'https://reactjs.org'
  },
  {
    name: 'NextJs',
    border: '#28ACE2',
    hoverBg: 'hover:bg-blue-200',
    hoverText: 'hover:text-[#01589A]',
    href: 'https://nextjs.org'
  },
  {
    name: 'NodeJs',
    border: '#77C053',
    hoverBg: 'hover:bg-green-500',
    hoverText: 'hover:text-white',
    href: 'https://nodejs.org'
  },
  {
    name: 'Django',
    border: '#A61D24',
    hoverBg: 'hover:bg-red-500',
    hoverText: 'hover:text-white',
    href: 'https://www.djangoproject.com'
  },
  {
    name: 'MongoDB',
    border: '#D89614',
    hoverBg: 'hover:bg-yellow-500',
    hoverText: 'hover:text-[#01589A]',
    href: 'https://www.mongodb.com'
  },
  {
    name: 'VueJs',
    border: '#999999',
    hoverBg: 'hover:bg-white',
    hoverText: 'hover:text-[#01589A]',
    href: 'https://vuejs.org'
  },
  {
    name: 'AWS',
    border: '#D89614',
    hoverBg: 'hover:bg-yellow-500',
    hoverText: 'hover:text-[#01589A]',
    href: 'https://aws.amazon.com'
  },
  {
    name: 'Azure',
    border: '#999999',
    hoverBg: 'hover:bg-white',
    hoverText: 'hover:text-[#01589A]',
    href: 'https://azure.microsoft.com'
  },
  {
    name: 'PowerBI',
    border: '#E6E6E6',
    hoverBg: 'hover:bg-white',
    hoverText: 'hover:text-[#01589A]',
    href: 'https://powerbi.microsoft.com'
  },
  {
    name: 'Python',
    border: '#28ACE2',
    hoverBg: 'hover:bg-blue-200',
    hoverText: 'hover:text-[#01589A]',
    href: 'https://www.python.org'
  },
  {
    name: 'Excel',
    border: '#77C053',
    hoverBg: 'hover:bg-green-500',
    hoverText: 'hover:text-white',
    href: 'https://www.microsoft.com/en-us/microsoft-365/excel'
  },
  {
    name: 'Tableau',
    border: '#A61D24',
    hoverBg: 'hover:bg-red-500',
    hoverText: 'hover:text-white',
    href: 'https://www.tableau.com'
  }
];
