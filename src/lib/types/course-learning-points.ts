export interface CourseLearningPoint {
    id: string
    text: string
  }
  
  export interface CourseLearningPoints {
    [courseName: string]: CourseLearningPoint[]
  }
  
  // Define learning points for each course type
  export const courseLearningPoints: CourseLearningPoints = {
    "Software Development": [
      {
        id: "sd-1",
        text: "Build 16 web development projects for your portfolio, ready to apply for junior developer jobs.",
      },
      {
        id: "sd-2",
        text: "After the course you will be able to build ANY website you want.",
      },
      {
        id: "sd-3",
        text: "Build fully-fledged websites and web apps for your startup or business.",
      },
      {
        id: "sd-4",
        text: "Master frontend development with React, NextJs, HTML, CSS, Vue and Angular",
      },
      {
        id: "sd-5",
        text: "Master backend development with Node, PHP, Python etc.",
      },
    ],
    "Cloud Computing Expertise": [
      {
        id: "cc-1",
        text: "Learn how to set up and manage cloud infrastructure on AWS, Azure, and Google Cloud.",
      },
      {
        id: "cc-2",
        text: "Master cloud security best practices and implement robust security measures.",
      },
      {
        id: "cc-3",
        text: "Implement auto-scaling and load balancing for high-performance applications.",
      },
      {
        id: "cc-4",
        text: "Learn DevOps practices for continuous integration and continuous deployment.",
      },
      {
        id: "cc-5",
        text: "Configure and manage serverless architectures for cost-effective solutions.",
      },
    ],
    "Data Science Mastery": [
      {
        id: "ds-1",
        text: "Master data analysis techniques using Python, Pandas, and NumPy.",
      },
      {
        id: "ds-2",
        text: "Build predictive models using machine learning algorithms.",
      },
      {
        id: "ds-3",
        text: "Create compelling data visualizations with Matplotlib, Seaborn, and Tableau.",
      },
      {
        id: "ds-4",
        text: "Implement deep learning models using TensorFlow and PyTorch.",
      },
      {
        id: "ds-5",
        text: "Learn how to clean, preprocess, and transform raw data into valuable insights.",
      },
    ],
    // Default learning points for any other course
    default: [
      {
        id: "default-1",
        text: "Master the fundamental concepts and principles of this subject.",
      },
      {
        id: "default-2",
        text: "Complete hands-on projects to build your portfolio.",
      },
      {
        id: "default-3",
        text: "Learn industry-standard tools and technologies.",
      },
      {
        id: "default-4",
        text: "Develop problem-solving skills through practical exercises.",
      },
      {
        id: "default-5",
        text: "Prepare for professional certification in this field.",
      },
    ],
  }
  
  // Helper function to get learning points based on course name
  export function getLearningPoints(courseName: string): CourseLearningPoint[] {
    // Check if the course name exactly matches one of our predefined courses
    if (courseName in courseLearningPoints) {
      return courseLearningPoints[courseName]
    }
  
    // Check if the course name contains any of our predefined course names
    for (const key of Object.keys(courseLearningPoints)) {
      if (key !== "default" && courseName.includes(key)) {
        return courseLearningPoints[key]
      }
    }
  
    // Return default learning points if no match is found
    return courseLearningPoints.default
  }
  