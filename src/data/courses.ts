import { CourseLearningPoint } from "@/lib/types/course-learning-points";

export const courses = [
  {
    title: "Software Development",
    description:
      "Unlock your potential with comprehensive training in modern software development",
    image: "/placeholder.svg?height=200&width=400",
    alt: "Software Development",
    rating: 4,
    price: "$350",
  },
  {
    title: "Data Science Mastery",
    description:
      "Equip yourself with the skills to analyze, interpret, and leverage data.",
    image: "/placeholder.svg?height=200&width=400",
    alt: "Data Science Mastery",
    rating: 4,
    price: "$350",
  },
  {
    title: "Cloud Computing Expertise",
    description:
      "Gain hands-on experience in cloud preparing you to manage scalable.",
    image: "/placeholder.svg?height=200&width=400",
    alt: "Cloud Computing Expertise",
    rating: 4,
    price: "$350",
  },
];
const courseLearningPoints: Record<string, CourseLearningPoint[]> = {
  "Software Development": [
    {
      id: "sd1",
      text: "Build 16 web development projects for your portfolio, ready to apply for junior developer jobs.",
    },
    { id: "sd2", text: "After the course you will be able to build ANY website you want." },
    { id: "sd3", text: "Build fully-fledged websites and web apps for your startup or business." },
    { id: "sd4", text: "Master frontend development with React, NextJs, HTML, CSS, Vue and Angular." },
    { id: "sd5", text: "Master backend development with Node, PHP, Python etc." },
  ],
  "Data Science Mastery": [
    { id: "ds1", text: "Learn to analyze large datasets and extract meaningful insights using Python and R." },
    { id: "ds2", text: "Master statistical analysis, machine learning algorithms, and data visualization techniques." },
    { id: "ds3", text: "Build a portfolio of data science projects to showcase your skills to potential employers." },
    { id: "ds4", text: "Develop expertise in popular data science libraries like Pandas, NumPy, and Scikit-learn." },
    { id: "ds5", text: "Learn to communicate data findings effectively through reports and interactive dashboards." },
  ],
  "Cloud Computing Expertise": [
    {
      id: "cc1",
      text: "Deploy and manage applications across major cloud platforms including AWS, Azure, and Google Cloud.",
    },
    { id: "cc2", text: "Implement cloud security best practices to protect your infrastructure and data." },
    { id: "cc3", text: "Design scalable and resilient cloud architectures for various business needs." },
    { id: "cc4", text: "Master containerization with Docker and orchestration with Kubernetes." },
    { id: "cc5", text: "Implement Infrastructure as Code (IaC) using tools like Terraform and CloudFormation." },
  ],
  default: [
    { id: "def1", text: "Master all the core concepts and skills related to this subject area." },
    { id: "def2", text: "Build practical projects to apply your knowledge in real-world scenarios." },
    { id: "def3", text: "Develop problem-solving skills specific to this field." },
    { id: "def4", text: "Learn industry best practices and modern tools used by professionals." },
    { id: "def5", text: "Prepare for certification exams and career opportunities in this domain." },
  ],
}