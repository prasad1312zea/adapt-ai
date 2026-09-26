// src/data/curriculum.js

// =========================================================
// QUESTION UTILITIES
// =========================================================

function shuffleQuestionOptions(question) {
  const options = question.options.map((text, index) => ({
    text,
    isCorrect: index === question.answer,
  }));

  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }

  return {
    ...question,
    options: options.map((option) => option.text),
    answer: options.findIndex(
      (option) => option.isCorrect
    ),
  };
}

function makeQuestions(
  concept,
  subjectName,
  examples = []
) {
  const defaultQuestions = [
    {
      id: `${subjectName}-${concept}-1`,
      concept,
      difficulty: "easy",
      question: `Which statement best describes ${concept}?`,
      options: [
        `${concept} is a fundamental concept used in ${subjectName}.`,
        `${concept} is unrelated to ${subjectName}.`,
        `${concept} is only used outside engineering.`,
        `${concept} has no practical applications.`,
      ],
      answer: 0,
    },

    {
      id: `${subjectName}-${concept}-2`,
      concept,
      difficulty: "medium",
      question: `Which of the following is most closely related to ${concept}?`,
      options: [
        `${concept} and its core principles`,
        "An unrelated hardware component",
        "A completely different engineering discipline",
        "A non-technical communication method",
      ],
      answer: 0,
    },

    {
      id: `${subjectName}-${concept}-3`,
      concept,
      difficulty: "hard",
      question: `Why is understanding ${concept} important in ${subjectName}?`,
      options: [
        `It helps solve problems and build a strong foundation in ${subjectName}.`,
        "It eliminates the need to learn any other concepts.",
        "It is only useful for memorizing definitions.",
        "It has no connection to practical applications.",
      ],
      answer: 0,
    },
  ];

  const questionList =
    examples.length > 0
      ? examples.map((question, index) => ({
          ...question,
          id:
            question.id ||
            `${subjectName}-${concept}-${index + 1}`,
          concept:
            question.concept || concept,
        }))
      : defaultQuestions;

  return questionList.map((question) =>
    shuffleQuestionOptions(question)
  );
}


// =========================================================
// SUBJECT BUILDER
// =========================================================

function createSubject({
  code,
  name,
  category,
  concepts,
  prerequisites = {},
}) {
  const questions = {};

  concepts.forEach((concept) => {
    questions[concept] = makeQuestions(
      concept,
      name
    );
  });

  return {
    code,
    name,
    category,
    concepts,
    prerequisites,
    questions,
  };
}


// =========================================================
// COMPUTER ENGINEERING
// =========================================================

const COMPUTER_ENGINEERING = {

  "First Year": {

    "Semester 1": [

      createSubject({
        code: "EM-I",
        name: "Engineering Mathematics I",
        category: "Mathematics",
        concepts: [
          "Limits",
          "Differentiation",
          "Integration",
          "Differential Equations",
          "Complex Numbers",
        ],
        prerequisites: {
          Differentiation: ["Limits"],
          Integration: ["Differentiation"],
          "Differential Equations": [
            "Differentiation",
          ],
        },
      }),

      createSubject({
        code: "EP",
        name: "Engineering Physics",
        category: "Science",
        concepts: [
          "Wave Optics",
          "Quantum Physics",
          "Lasers",
          "Fiber Optics",
          "Semiconductors",
        ],
      }),

      createSubject({
        code: "EC",
        name: "Engineering Chemistry",
        category: "Science",
        concepts: [
          "Water Technology",
          "Corrosion",
          "Polymers",
          "Nanomaterials",
          "Green Chemistry",
        ],
      }),

      createSubject({
        code: "BEE",
        name: "Basic Electrical Engineering",
        category: "Electrical",
        concepts: [
          "DC Circuits",
          "AC Circuits",
          "Network Theorems",
          "Transformers",
          "Electrical Machines",
        ],
      }),

      createSubject({
        code: "EM",
        name: "Engineering Mechanics",
        category: "Engineering",
        concepts: [
          "Force Systems",
          "Equilibrium",
          "Friction",
          "Centroid",
          "Moment of Inertia",
        ],
      }),

      createSubject({
        code: "PF",
        name: "Programming Fundamentals",
        category: "Programming",
        concepts: [
          "Variables and Data Types",
          "Operators",
          "Conditional Statements",
          "Loops",
          "Functions",
        ],
      }),
    ],

    "Semester 2": [

      createSubject({
        code: "EM-II",
        name: "Engineering Mathematics II",
        category: "Mathematics",
        concepts: [
          "Partial Differentiation",
          "Multiple Integrals",
          "Fourier Series",
          "Laplace Transform",
          "Probability",
        ],
      }),

      createSubject({
        code: "EG",
        name: "Engineering Graphics",
        category: "Engineering",
        concepts: [
          "Orthographic Projection",
          "Isometric Projection",
          "Sections",
          "Development of Surfaces",
          "Computer Aided Drawing",
        ],
      }),

      createSubject({
        code: "DS",
        name: "Data Structures",
        category: "Computer Science",
        concepts: [
          "Arrays",
          "Linked Lists",
          "Stacks",
          "Queues",
          "Trees",
          "BST",
          "Graphs",
          "Algorithms",
        ],
        prerequisites: {
          "Linked Lists": ["Arrays"],
          Stacks: ["Linked Lists"],
          Queues: ["Linked Lists"],
          Trees: ["Stacks", "Queues"],
          BST: ["Trees"],
          Graphs: ["Trees", "BST"],
          Algorithms: [
            "Arrays",
            "Linked Lists",
            "Stacks",
            "Queues",
          ],
        },
      }),

      createSubject({
        code: "OOP",
        name: "Object Oriented Programming",
        category: "Programming",
        concepts: [
          "Classes and Objects",
          "Encapsulation",
          "Inheritance",
          "Polymorphism",
          "Abstraction",
        ],
      }),

      createSubject({
        code: "DLD",
        name: "Digital Logic Design",
        category: "Electronics",
        concepts: [
          "Number Systems",
          "Boolean Algebra",
          "Logic Gates",
          "Combinational Circuits",
          "Sequential Circuits",
        ],
      }),

      createSubject({
        code: "DM",
        name: "Discrete Mathematics",
        category: "Mathematics",
        concepts: [
          "Set Theory",
          "Relations",
          "Functions",
          "Graph Theory",
          "Combinatorics",
        ],
      }),
    ],
  },


  "Second Year": {

    "Semester 1": [

      createSubject({
        code: "ADSA",
        name: "Advanced Data Structures and Algorithms",
        category: "Computer Science",
        concepts: [
          "Advanced Trees",
          "Heaps",
          "Hashing",
          "Graph Algorithms",
          "Dynamic Programming",
        ],
      }),

      createSubject({
        code: "DBMS",
        name: "Database Management Systems",
        category: "Computer Science",
        concepts: [
          "Database Fundamentals",
          "ER Model",
          "SQL",
          "Normalization",
          "Transactions",
        ],
      }),

      createSubject({
        code: "COA",
        name: "Computer Organization and Architecture",
        category: "Computer Science",
        concepts: [
          "CPU Architecture",
          "Memory Organization",
          "Instruction Set",
          "Pipelining",
          "I/O Organization",
        ],
      }),

      createSubject({
        code: "OS",
        name: "Operating Systems",
        category: "Computer Science",
        concepts: [
          "Processes",
          "Threads",
          "CPU Scheduling",
          "Memory Management",
          "File Systems",
        ],
      }),

      createSubject({
        code: "DM",
        name: "Discrete Mathematics",
        category: "Mathematics",
        concepts: [
          "Logic",
          "Relations",
          "Functions",
          "Graphs",
          "Combinatorics",
        ],
      }),

      createSubject({
        code: "AOOP",
        name: "Advanced Object Oriented Programming",
        category: "Programming",
        concepts: [
          "Advanced Classes",
          "Interfaces",
          "Exception Handling",
          "Collections",
          "Generics",
        ],
      }),
    ],

    "Semester 2": [

      createSubject({
        code: "CN",
        name: "Computer Networks",
        category: "Networking",
        concepts: [
          "Network Models",
          "Data Link Layer",
          "Network Layer",
          "Transport Layer",
          "Application Layer",
        ],
      }),

      createSubject({
        code: "OS",
        name: "Operating Systems",
        category: "Computer Science",
        concepts: [
          "Process Synchronization",
          "Deadlocks",
          "Memory Management",
          "Virtual Memory",
          "File Systems",
        ],
      }),

      createSubject({
        code: "DBMS",
        name: "Database Management Systems",
        category: "Computer Science",
        concepts: [
          "SQL",
          "Normalization",
          "Transactions",
          "Indexing",
          "Database Security",
        ],
      }),

      createSubject({
        code: "DAA",
        name: "Design and Analysis of Algorithms",
        category: "Algorithms",
        concepts: [
          "Algorithm Complexity",
          "Divide and Conquer",
          "Greedy Algorithms",
          "Dynamic Programming",
          "Backtracking",
        ],
      }),

      createSubject({
        code: "SE",
        name: "Software Engineering",
        category: "Software",
        concepts: [
          "Software Processes",
          "Requirements Engineering",
          "Design",
          "Testing",
          "Maintenance",
        ],
      }),

      createSubject({
        code: "MP",
        name: "Microprocessors",
        category: "Hardware",
        concepts: [
          "Microprocessor Architecture",
          "Instruction Set",
          "Assembly Language",
          "Interfacing",
          "Interrupts",
        ],
      }),
    ],
  },


  "Third Year": {

    "Semester 1": [

      createSubject({
        code: "ML",
        name: "Machine Learning",
        category: "Artificial Intelligence",
        concepts: [
          "Machine Learning Fundamentals",
          "Regression",
          "Classification",
          "Clustering",
          "Model Evaluation",
        ],
      }),

      createSubject({
        code: "CC",
        name: "Cloud Computing",
        category: "Cloud",
        concepts: [
          "Cloud Fundamentals",
          "Virtualization",
          "Cloud Services",
          "Cloud Security",
          "Cloud Architecture",
        ],
      }),

      createSubject({
        code: "CS",
        name: "Cyber Security",
        category: "Security",
        concepts: [
          "Security Fundamentals",
          "Cryptography",
          "Network Security",
          "Web Security",
          "Ethical Hacking",
        ],
      }),

      createSubject({
        code: "AI",
        name: "Artificial Intelligence",
        category: "Artificial Intelligence",
        concepts: [
          "AI Fundamentals",
          "Search Algorithms",
          "Knowledge Representation",
          "Expert Systems",
          "Intelligent Agents",
        ],
      }),

      createSubject({
        code: "DSYS",
        name: "Distributed Systems",
        category: "Systems",
        concepts: [
          "Distributed System Fundamentals",
          "Communication",
          "Synchronization",
          "Distributed Algorithms",
          "Fault Tolerance",
        ],
      }),

      createSubject({
        code: "BDA",
        name: "Big Data Analytics",
        category: "Data Science",
        concepts: [
          "Big Data Fundamentals",
          "Hadoop",
          "MapReduce",
          "Spark",
          "Data Analytics",
        ],
      }),
    ],

    "Semester 2": [

      createSubject({
        code: "ML",
        name: "Machine Learning",
        category: "Artificial Intelligence",
        concepts: [
          "Feature Engineering",
          "Decision Trees",
          "Ensemble Methods",
          "Neural Networks",
          "Model Optimization",
        ],
      }),

      createSubject({
        code: "CC",
        name: "Cloud Computing",
        category: "Cloud",
        concepts: [
          "Cloud Deployment",
          "Containers",
          "Serverless Computing",
          "Cloud Storage",
          "Cloud Monitoring",
        ],
      }),

      createSubject({
        code: "CS",
        name: "Cyber Security",
        category: "Security",
        concepts: [
          "Digital Forensics",
          "Malware Analysis",
          "Authentication",
          "Secure Coding",
          "Security Auditing",
        ],
      }),

      createSubject({
        code: "AI",
        name: "Artificial Intelligence",
        category: "Artificial Intelligence",
        concepts: [
          "Machine Learning",
          "Natural Language Processing",
          "Computer Vision",
          "Planning",
          "Reinforcement Learning",
        ],
      }),

      createSubject({
        code: "BDA",
        name: "Big Data Analytics",
        category: "Data Science",
        concepts: [
          "Data Mining",
          "Data Visualization",
          "Predictive Analytics",
          "Stream Processing",
          "Data Pipelines",
        ],
      }),

      createSubject({
        code: "PROJECT",
        name: "Engineering Project",
        category: "Project",
        concepts: [
          "Problem Definition",
          "Research",
          "System Design",
          "Implementation",
          "Testing",
        ],
      }),
    ],
  },


  "Final Year": {

    "Semester 1": [

      createSubject({
        code: "AAI",
        name: "Advanced Artificial Intelligence",
        category: "Artificial Intelligence",
        concepts: [
          "Deep Learning",
          "Natural Language Processing",
          "Computer Vision",
          "Reinforcement Learning",
          "Generative AI",
        ],
      }),

      createSubject({
        code: "CD",
        name: "Compiler Design",
        category: "Computer Science",
        concepts: [
          "Lexical Analysis",
          "Syntax Analysis",
          "Semantic Analysis",
          "Intermediate Code",
          "Code Optimization",
        ],
      }),

      createSubject({
        code: "PROJECT",
        name: "Major Project",
        category: "Project",
        concepts: [
          "Problem Analysis",
          "System Architecture",
          "Implementation",
          "Testing",
          "Deployment",
        ],
      }),

      createSubject({
        code: "CAP",
        name: "Computer Applications",
        category: "Computer Science",
        concepts: [
          "Application Architecture",
          "APIs",
          "Databases",
          "Security",
          "Deployment",
        ],
      }),

      createSubject({
        code: "PE",
        name: "Professional Elective",
        category: "Elective",
        concepts: [
          "Core Concepts",
          "Applications",
          "Advanced Concepts",
          "Case Studies",
          "Industry Applications",
        ],
      }),
    ],

    "Semester 2": [

      createSubject({
        code: "AAI",
        name: "Advanced Artificial Intelligence",
        category: "Artificial Intelligence",
        concepts: [
          "Generative AI",
          "Large Language Models",
          "AI Agents",
          "AI Ethics",
          "AI Applications",
        ],
      }),

      createSubject({
        code: "CD",
        name: "Compiler Design",
        category: "Computer Science",
        concepts: [
          "Compiler Architecture",
          "Parsing",
          "Semantic Analysis",
          "Code Generation",
          "Optimization",
        ],
      }),

      createSubject({
        code: "PROJECT",
        name: "Major Project",
        category: "Project",
        concepts: [
          "Research",
          "Development",
          "Integration",
          "Testing",
          "Final Deployment",
        ],
      }),

      createSubject({
        code: "CAP",
        name: "Computer Applications",
        category: "Computer Science",
        concepts: [
          "Full Stack Development",
          "API Integration",
          "Database Management",
          "Authentication",
          "Cloud Deployment",
        ],
      }),

      createSubject({
        code: "PE",
        name: "Professional Elective",
        category: "Elective",
        concepts: [
          "Advanced Theory",
          "Applications",
          "Industry Tools",
          "Case Studies",
          "Emerging Technologies",
        ],
      }),
    ],
  },
};


// =========================================================
// GENERIC BRANCH DATA
// =========================================================
// Used for branches other than Computer Engineering.
// Every branch gets subjects for every year and semester.
// This keeps the platform fully navigable while still
// allowing the diagnostic engine to work on concepts.

function createBranchCurriculum(subjectsByYear) {
  return {
    "First Year": {
      "Semester 1": subjectsByYear.first1,
      "Semester 2": subjectsByYear.first2,
    },

    "Second Year": {
      "Semester 1": subjectsByYear.second1,
      "Semester 2": subjectsByYear.second2,
    },

    "Third Year": {
      "Semester 1": subjectsByYear.third1,
      "Semester 2": subjectsByYear.third2,
    },

    "Final Year": {
      "Semester 1": subjectsByYear.final1,
      "Semester 2": subjectsByYear.final2,
    },
  };
}


// =========================================================
// AI & MACHINE LEARNING
// =========================================================

const AI_ML = createBranchCurriculum({

  first1: [
    createSubject({
      code: "MATH1",
      name: "Engineering Mathematics I",
      category: "Mathematics",
      concepts: [
        "Limits",
        "Differentiation",
        "Integration",
        "Matrices",
        "Complex Numbers",
      ],
    }),
    createSubject({
      code: "PFC",
      name: "Programming Fundamentals",
      category: "Programming",
      concepts: [
        "Variables",
        "Data Types",
        "Conditions",
        "Loops",
        "Functions",
      ],
    }),
    createSubject({
      code: "PDS",
      name: "Problem Solving and Data Structures",
      category: "Computer Science",
      concepts: [
        "Arrays",
        "Linked Lists",
        "Stacks",
        "Queues",
        "Searching",
      ],
    }),
    createSubject({
      code: "PHY",
      name: "Engineering Physics",
      category: "Science",
      concepts: [
        "Wave Optics",
        "Quantum Physics",
        "Lasers",
        "Semiconductors",
        "Fiber Optics",
      ],
    }),
    createSubject({
      code: "CHEM",
      name: "Engineering Chemistry",
      category: "Science",
      concepts: [
        "Water Technology",
        "Corrosion",
        "Polymers",
        "Nanomaterials",
        "Green Chemistry",
      ],
    }),
  ],

  first2: [
    createSubject({
      code: "MATH2",
      name: "Engineering Mathematics II",
      category: "Mathematics",
      concepts: [
        "Partial Differentiation",
        "Multiple Integrals",
        "Fourier Series",
        "Laplace Transform",
        "Probability",
      ],
    }),
    createSubject({
      code: "OOP",
      name: "Object Oriented Programming",
      category: "Programming",
      concepts: [
        "Classes",
        "Objects",
        "Inheritance",
        "Polymorphism",
        "Abstraction",
      ],
    }),
    createSubject({
      code: "DM",
      name: "Discrete Mathematics",
      category: "Mathematics",
      concepts: [
        "Sets",
        "Relations",
        "Functions",
        "Graphs",
        "Combinatorics",
      ],
    }),
    createSubject({
      code: "DLD",
      name: "Digital Logic Design",
      category: "Electronics",
      concepts: [
        "Number Systems",
        "Boolean Algebra",
        "Logic Gates",
        "Combinational Circuits",
        "Sequential Circuits",
      ],
    }),
    createSubject({
      code: "STAT",
      name: "Statistics for AI",
      category: "Data Science",
      concepts: [
        "Descriptive Statistics",
        "Probability",
        "Distributions",
        "Correlation",
        "Regression Basics",
      ],
    }),
  ],

  second1: [
    createSubject({
      code: "DS",
      name: "Data Structures",
      category: "Computer Science",
      concepts: [
        "Arrays",
        "Linked Lists",
        "Stacks",
        "Trees",
        "Graphs",
      ],
    }),
    createSubject({
      code: "DBMS",
      name: "Database Management Systems",
      category: "Computer Science",
      concepts: [
        "Database Fundamentals",
        "ER Model",
        "SQL",
        "Normalization",
        "Transactions",
      ],
    }),
    createSubject({
      code: "ML1",
      name: "Machine Learning I",
      category: "Artificial Intelligence",
      concepts: [
        "ML Fundamentals",
        "Regression",
        "Classification",
        "Training",
        "Model Evaluation",
      ],
    }),
    createSubject({
      code: "PROB",
      name: "Probability and Statistics",
      category: "Mathematics",
      concepts: [
        "Probability",
        "Random Variables",
        "Distributions",
        "Expectation",
        "Hypothesis Testing",
      ],
    }),
    createSubject({
      code: "COA",
      name: "Computer Organization",
      category: "Computer Science",
      concepts: [
        "CPU",
        "Memory",
        "Instruction Set",
        "Pipelining",
        "I/O",
      ],
    }),
  ],

  second2: [
    createSubject({
      code: "ML2",
      name: "Machine Learning II",
      category: "Artificial Intelligence",
      concepts: [
        "Decision Trees",
        "Ensemble Learning",
        "Clustering",
        "Dimensionality Reduction",
        "Model Optimization",
      ],
    }),
    createSubject({
      code: "DL",
      name: "Deep Learning",
      category: "Artificial Intelligence",
      concepts: [
        "Neural Networks",
        "Backpropagation",
        "CNN",
        "RNN",
        "Optimization",
      ],
    }),
    createSubject({
      code: "OS",
      name: "Operating Systems",
      category: "Systems",
      concepts: [
        "Processes",
        "Threads",
        "Scheduling",
        "Memory Management",
        "File Systems",
      ],
    }),
    createSubject({
      code: "CN",
      name: "Computer Networks",
      category: "Networking",
      concepts: [
        "Network Models",
        "Data Link Layer",
        "Network Layer",
        "Transport Layer",
        "Application Layer",
      ],
    }),
    createSubject({
      code: "NLP",
      name: "Natural Language Processing",
      category: "AI",
      concepts: [
        "Text Processing",
        "Tokenization",
        "Embeddings",
        "Language Models",
        "Text Classification",
      ],
    }),
  ],

  third1: [
    createSubject({
      code: "CV",
      name: "Computer Vision",
      category: "Artificial Intelligence",
      concepts: [
        "Image Processing",
        "Feature Detection",
        "Object Detection",
        "Image Classification",
        "Segmentation",
      ],
    }),
    createSubject({
      code: "RL",
      name: "Reinforcement Learning",
      category: "Artificial Intelligence",
      concepts: [
        "Agents",
        "States",
        "Actions",
        "Rewards",
        "Q Learning",
      ],
    }),
    createSubject({
      code: "BIGDATA",
      name: "Big Data Analytics",
      category: "Data Science",
      concepts: [
        "Big Data",
        "Hadoop",
        "MapReduce",
        "Spark",
        "Data Pipelines",
      ],
    }),
    createSubject({
      code: "CLOUD",
      name: "Cloud Computing",
      category: "Cloud",
      concepts: [
        "Cloud Fundamentals",
        "Virtualization",
        "Cloud Services",
        "Containers",
        "Cloud Security",
      ],
    }),
    createSubject({
      code: "AI",
      name: "Artificial Intelligence",
      category: "AI",
      concepts: [
        "Search",
        "Knowledge Representation",
        "Planning",
        "Expert Systems",
        "Intelligent Agents",
      ],
    }),
  ],

  third2: [
    createSubject({
      code: "GENAI",
      name: "Generative AI",
      category: "Artificial Intelligence",
      concepts: [
        "Generative Models",
        "Transformers",
        "LLMs",
        "Prompt Engineering",
        "AI Applications",
      ],
    }),
    createSubject({
      code: "MLOPS",
      name: "MLOps",
      category: "AI Engineering",
      concepts: [
        "Model Deployment",
        "Pipelines",
        "Monitoring",
        "Versioning",
        "Model Serving",
      ],
    }),
    createSubject({
      code: "ETHICS",
      name: "AI Ethics",
      category: "AI",
      concepts: [
        "Bias",
        "Fairness",
        "Privacy",
        "Explainability",
        "Responsible AI",
      ],
    }),
    createSubject({
      code: "PROJECT",
      name: "AI Project",
      category: "Project",
      concepts: [
        "Problem Definition",
        "Data Collection",
        "Model Design",
        "Implementation",
        "Evaluation",
      ],
    }),
  ],

  final1: [
    createSubject({
      code: "ADVAI",
      name: "Advanced AI",
      category: "Artificial Intelligence",
      concepts: [
        "Advanced Deep Learning",
        "Generative AI",
        "AI Agents",
        "Multimodal AI",
        "AI Systems",
      ],
    }),
    createSubject({
      code: "LLM",
      name: "Large Language Models",
      category: "AI",
      concepts: [
        "Transformers",
        "Attention",
        "Fine Tuning",
        "RAG",
        "LLM Evaluation",
      ],
    }),
    createSubject({
      code: "RESEARCH",
      name: "AI Research",
      category: "Research",
      concepts: [
        "Research Methods",
        "Experiment Design",
        "Evaluation",
        "Analysis",
        "Publication",
      ],
    }),
  ],

  final2: [
    createSubject({
      code: "CAPSTONE",
      name: "AI Capstone Project",
      category: "Project",
      concepts: [
        "Problem Analysis",
        "System Design",
        "AI Architecture",
        "Implementation",
        "Deployment",
      ],
    }),
    createSubject({
      code: "AIPROD",
      name: "AI Product Engineering",
      category: "AI Engineering",
      concepts: [
        "AI Product Design",
        "APIs",
        "Model Integration",
        "Scaling",
        "Monitoring",
      ],
    }),
  ],
});


// =========================================================
// AI & DATA SCIENCE
// =========================================================

const AI_DATA_SCIENCE = createBranchCurriculum({

  first1: [
    createSubject({
      code: "MATH1",
      name: "Engineering Mathematics I",
      category: "Mathematics",
      concepts: [
        "Limits",
        "Differentiation",
        "Integration",
        "Matrices",
        "Complex Numbers",
      ],
    }),
    createSubject({
      code: "PY",
      name: "Python Programming",
      category: "Programming",
      concepts: [
        "Variables",
        "Data Types",
        "Conditions",
        "Loops",
        "Functions",
      ],
    }),
    createSubject({
      code: "STAT1",
      name: "Statistics I",
      category: "Data Science",
      concepts: [
        "Data Types",
        "Mean",
        "Median",
        "Variance",
        "Probability",
      ],
    }),
    createSubject({
      code: "PHY",
      name: "Engineering Physics",
      category: "Science",
      concepts: [
        "Optics",
        "Quantum Physics",
        "Lasers",
        "Semiconductors",
        "Fiber Optics",
      ],
    }),
    createSubject({
      code: "CHEM",
      name: "Engineering Chemistry",
      category: "Science",
      concepts: [
        "Water",
        "Corrosion",
        "Polymers",
        "Nanomaterials",
        "Green Chemistry",
      ],
    }),
  ],

  first2: [
    createSubject({
      code: "MATH2",
      name: "Engineering Mathematics II",
      category: "Mathematics",
      concepts: [
        "Partial Differentiation",
        "Multiple Integrals",
        "Fourier Series",
        "Laplace Transform",
        "Probability",
      ],
    }),
    createSubject({
      code: "DS",
      name: "Data Structures",
      category: "Computer Science",
      concepts: [
        "Arrays",
        "Linked Lists",
        "Stacks",
        "Queues",
        "Trees",
      ],
    }),
    createSubject({
      code: "DB",
      name: "Database Fundamentals",
      category: "Data Science",
      concepts: [
        "Database Concepts",
        "ER Model",
        "SQL",
        "Keys",
        "Normalization",
      ],
    }),
    createSubject({
      code: "STAT2",
      name: "Statistics II",
      category: "Data Science",
      concepts: [
        "Distributions",
        "Correlation",
        "Regression",
        "Sampling",
        "Hypothesis Testing",
      ],
    }),
  ],

  second1: [
    createSubject({
      code: "DSA",
      name: "Data Structures and Algorithms",
      category: "Computer Science",
      concepts: [
        "Trees",
        "Graphs",
        "Sorting",
        "Searching",
        "Complexity",
      ],
    }),
    createSubject({
      code: "DBMS",
      name: "Database Management Systems",
      category: "Data Science",
      concepts: [
        "SQL",
        "Normalization",
        "Transactions",
        "Indexing",
        "Security",
      ],
    }),
    createSubject({
      code: "ML",
      name: "Machine Learning",
      category: "AI",
      concepts: [
        "Regression",
        "Classification",
        "Training",
        "Testing",
        "Evaluation",
      ],
    }),
    createSubject({
      code: "DATA",
      name: "Data Analytics",
      category: "Data Science",
      concepts: [
        "Data Cleaning",
        "EDA",
        "Visualization",
        "Feature Engineering",
        "Insights",
      ],
    }),
  ],

  second2: [
    createSubject({
      code: "ML2",
      name: "Advanced Machine Learning",
      category: "AI",
      concepts: [
        "Decision Trees",
        "Random Forest",
        "SVM",
        "Clustering",
        "Dimensionality Reduction",
      ],
    }),
    createSubject({
      code: "BIG",
      name: "Big Data",
      category: "Data Science",
      concepts: [
        "Hadoop",
        "MapReduce",
        "Spark",
        "Distributed Storage",
        "Data Processing",
      ],
    }),
    createSubject({
      code: "VIS",
      name: "Data Visualization",
      category: "Data Science",
      concepts: [
        "Charts",
        "Dashboards",
        "Visual Encoding",
        "Interactive Visualization",
        "Storytelling",
      ],
    }),
    createSubject({
      code: "NLP",
      name: "Natural Language Processing",
      category: "AI",
      concepts: [
        "Text Processing",
        "Tokenization",
        "Embeddings",
        "Classification",
        "Language Models",
      ],
    }),
  ],

  third1: [
    createSubject({
      code: "DL",
      name: "Deep Learning",
      category: "AI",
      concepts: [
        "Neural Networks",
        "Backpropagation",
        "CNN",
        "RNN",
        "Optimization",
      ],
    }),
    createSubject({
      code: "CLOUD",
      name: "Cloud Data Engineering",
      category: "Cloud",
      concepts: [
        "Cloud Storage",
        "Cloud Databases",
        "Data Lakes",
        "Pipelines",
        "Security",
      ],
    }),
    createSubject({
      code: "DSYS",
      name: "Distributed Data Systems",
      category: "Systems",
      concepts: [
        "Distributed Systems",
        "Consistency",
        "Replication",
        "Partitioning",
        "Fault Tolerance",
      ],
    }),
  ],

  third2: [
    createSubject({
      code: "GENAI",
      name: "Generative AI",
      category: "AI",
      concepts: [
        "Generative Models",
        "Transformers",
        "LLMs",
        "Prompt Engineering",
        "RAG",
      ],
    }),
    createSubject({
      code: "MLOPS",
      name: "MLOps",
      category: "AI Engineering",
      concepts: [
        "Deployment",
        "Pipelines",
        "Monitoring",
        "Versioning",
        "Model Serving",
      ],
    }),
    createSubject({
      code: "PROJECT",
      name: "Data Science Project",
      category: "Project",
      concepts: [
        "Problem Definition",
        "Data Collection",
        "Analysis",
        "Model Building",
        "Evaluation",
      ],
    }),
  ],

  final1: [
    createSubject({
      code: "ADVDS",
      name: "Advanced Data Science",
      category: "Data Science",
      concepts: [
        "Advanced Analytics",
        "Causal Inference",
        "Time Series",
        "Recommendation Systems",
        "Optimization",
      ],
    }),
    createSubject({
      code: "AI",
      name: "Applied Artificial Intelligence",
      category: "AI",
      concepts: [
        "AI Systems",
        "Intelligent Agents",
        "Computer Vision",
        "NLP",
        "Decision Systems",
      ],
    }),
  ],

  final2: [
    createSubject({
      code: "CAPSTONE",
      name: "Data Science Capstone",
      category: "Project",
      concepts: [
        "Problem Analysis",
        "Data Engineering",
        "Modeling",
        "Evaluation",
        "Deployment",
      ],
    }),
  ],
});


// =========================================================
// INFORMATION TECHNOLOGY
// =========================================================

const INFORMATION_TECHNOLOGY = createBranchCurriculum({

  first1: [
    createSubject({
      code: "MATH1",
      name: "Engineering Mathematics I",
      category: "Mathematics",
      concepts: [
        "Limits",
        "Differentiation",
        "Integration",
        "Matrices",
        "Complex Numbers",
      ],
    }),
    createSubject({
      code: "PROG",
      name: "Programming Fundamentals",
      category: "Programming",
      concepts: [
        "Variables",
        "Operators",
        "Conditions",
        "Loops",
        "Functions",
      ],
    }),
    createSubject({
      code: "PHY",
      name: "Engineering Physics",
      category: "Science",
      concepts: [
        "Optics",
        "Quantum Physics",
        "Lasers",
        "Semiconductors",
        "Fiber Optics",
      ],
    }),
    createSubject({
      code: "CHEM",
      name: "Engineering Chemistry",
      category: "Science",
      concepts: [
        "Water Technology",
        "Corrosion",
        "Polymers",
        "Nanomaterials",
        "Green Chemistry",
      ],
    }),
  ],

  first2: [
    createSubject({
      code: "MATH2",
      name: "Engineering Mathematics II",
      category: "Mathematics",
      concepts: [
        "Partial Differentiation",
        "Multiple Integrals",
        "Fourier Series",
        "Laplace Transform",
        "Probability",
      ],
    }),
    createSubject({
      code: "DS",
      name: "Data Structures",
      category: "Programming",
      concepts: [
        "Arrays",
        "Linked Lists",
        "Stacks",
        "Queues",
        "Trees",
      ],
    }),
    createSubject({
      code: "OOP",
      name: "Object Oriented Programming",
      category: "Programming",
      concepts: [
        "Classes",
        "Objects",
        "Inheritance",
        "Polymorphism",
        "Abstraction",
      ],
    }),
    createSubject({
      code: "WEB",
      name: "Web Technologies",
      category: "IT",
      concepts: [
        "HTML",
        "CSS",
        "JavaScript",
        "DOM",
        "Web APIs",
      ],
    }),
  ],

  second1: [
    createSubject({
      code: "DBMS",
      name: "Database Management Systems",
      category: "IT",
      concepts: [
        "ER Model",
        "SQL",
        "Normalization",
        "Transactions",
        "Indexing",
      ],
    }),
    createSubject({
      code: "OS",
      name: "Operating Systems",
      category: "Systems",
      concepts: [
        "Processes",
        "Threads",
        "Scheduling",
        "Memory",
        "File Systems",
      ],
    }),
    createSubject({
      code: "CN",
      name: "Computer Networks",
      category: "Networking",
      concepts: [
        "Network Models",
        "Data Link",
        "Network Layer",
        "Transport Layer",
        "Application Layer",
      ],
    }),
    createSubject({
      code: "SE",
      name: "Software Engineering",
      category: "Software",
      concepts: [
        "Processes",
        "Requirements",
        "Design",
        "Testing",
        "Maintenance",
      ],
    }),
  ],

  second2: [
    createSubject({
      code: "JAVA",
      name: "Java Full Stack Development",
      category: "Programming",
      concepts: [
        "Java",
        "Spring",
        "REST APIs",
        "Frontend",
        "Database Integration",
      ],
    }),
    createSubject({
      code: "CLOUD",
      name: "Cloud Computing",
      category: "Cloud",
      concepts: [
        "Cloud Fundamentals",
        "Virtualization",
        "Services",
        "Containers",
        "Security",
      ],
    }),
    createSubject({
      code: "CYBER",
      name: "Cyber Security",
      category: "Security",
      concepts: [
        "Security Fundamentals",
        "Cryptography",
        "Network Security",
        "Web Security",
        "Ethical Hacking",
      ],
    }),
  ],

  third1: [
    createSubject({
      code: "AI",
      name: "Artificial Intelligence",
      category: "AI",
      concepts: [
        "Search",
        "Knowledge Representation",
        "Planning",
        "Expert Systems",
        "Agents",
      ],
    }),
    createSubject({
      code: "ML",
      name: "Machine Learning",
      category: "AI",
      concepts: [
        "Regression",
        "Classification",
        "Clustering",
        "Training",
        "Evaluation",
      ],
    }),
    createSubject({
      code: "DEVOPS",
      name: "DevOps",
      category: "Software",
      concepts: [
        "CI/CD",
        "Git",
        "Containers",
        "Deployment",
        "Monitoring",
      ],
    }),
  ],

  third2: [
    createSubject({
      code: "DISTRIBUTED",
      name: "Distributed Systems",
      category: "Systems",
      concepts: [
        "Communication",
        "Synchronization",
        "Replication",
        "Consistency",
        "Fault Tolerance",
      ],
    }),
    createSubject({
      code: "BIGDATA",
      name: "Big Data Analytics",
      category: "Data",
      concepts: [
        "Hadoop",
        "MapReduce",
        "Spark",
        "Data Processing",
        "Visualization",
      ],
    }),
    createSubject({
      code: "PROJECT",
      name: "IT Project",
      category: "Project",
      concepts: [
        "Problem Definition",
        "Requirements",
        "Architecture",
        "Implementation",
        "Testing",
      ],
    }),
  ],

  final1: [
    createSubject({
      code: "ADVIT",
      name: "Advanced Information Technology",
      category: "IT",
      concepts: [
        "Enterprise Systems",
        "Cloud Architecture",
        "Distributed Applications",
        "Security",
        "Scalability",
      ],
    }),
    createSubject({
      code: "AIAPP",
      name: "Applied AI",
      category: "AI",
      concepts: [
        "AI APIs",
        "ML Integration",
        "LLMs",
        "AI Agents",
        "Evaluation",
      ],
    }),
  ],

  final2: [
    createSubject({
      code: "CAPSTONE",
      name: "IT Capstone Project",
      category: "Project",
      concepts: [
        "Problem Analysis",
        "System Design",
        "Implementation",
        "Testing",
        "Deployment",
      ],
    }),
  ],
});


// =========================================================
// ELECTRICAL ENGINEERING
// =========================================================

const ELECTRICAL_ENGINEERING = createBranchCurriculum({

  first1: [
    createSubject({
      code: "MATH1",
      name: "Engineering Mathematics I",
      category: "Mathematics",
      concepts: [
        "Limits",
        "Differentiation",
        "Integration",
        "Matrices",
        "Complex Numbers",
      ],
    }),
    createSubject({
      code: "BEE",
      name: "Basic Electrical Engineering",
      category: "Electrical",
      concepts: [
        "DC Circuits",
        "AC Circuits",
        "Network Theorems",
        "Magnetic Circuits",
        "Power",
      ],
    }),
    createSubject({
      code: "PHY",
      name: "Engineering Physics",
      category: "Science",
      concepts: [
        "Optics",
        "Quantum Physics",
        "Lasers",
        "Semiconductors",
        "Fiber Optics",
      ],
    }),
    createSubject({
      code: "MECH",
      name: "Engineering Mechanics",
      category: "Engineering",
      concepts: [
        "Force Systems",
        "Equilibrium",
        "Friction",
        "Centroid",
        "Moment of Inertia",
      ],
    }),
  ],

  first2: [
    createSubject({
      code: "MATH2",
      name: "Engineering Mathematics II",
      category: "Mathematics",
      concepts: [
        "Partial Differentiation",
        "Multiple Integrals",
        "Fourier Series",
        "Laplace Transform",
        "Probability",
      ],
    }),
    createSubject({
      code: "EM",
      name: "Electrical Machines",
      category: "Electrical",
      concepts: [
        "Transformers",
        "DC Machines",
        "Induction Motors",
        "Synchronous Machines",
        "Applications",
      ],
    }),
    createSubject({
      code: "CIRCUITS",
      name: "Electrical Circuits",
      category: "Electrical",
      concepts: [
        "Circuit Laws",
        "AC Analysis",
        "Resonance",
        "Network Theorems",
        "Transient Analysis",
      ],
    }),
    createSubject({
      code: "DIGITAL",
      name: "Digital Electronics",
      category: "Electronics",
      concepts: [
        "Number Systems",
        "Boolean Algebra",
        "Logic Gates",
        "Combinational Circuits",
        "Sequential Circuits",
      ],
    }),
  ],

  second1: [
    createSubject({
      code: "POWER",
      name: "Power Systems",
      category: "Electrical",
      concepts: [
        "Generation",
        "Transmission",
        "Distribution",
        "Fault Analysis",
        "Protection",
      ],
    }),
    createSubject({
      code: "CONTROL",
      name: "Control Systems",
      category: "Control",
      concepts: [
        "Transfer Functions",
        "Block Diagrams",
        "Time Response",
        "Stability",
        "Controllers",
      ],
    }),
    createSubject({
      code: "MEASURE",
      name: "Electrical Measurements",
      category: "Electrical",
      concepts: [
        "Measurement Systems",
        "Instruments",
        "Errors",
        "Bridges",
        "Transducers",
      ],
    }),
    createSubject({
      code: "SIGNALS",
      name: "Signals and Systems",
      category: "Electrical",
      concepts: [
        "Signals",
        "Systems",
        "Convolution",
        "Fourier Transform",
        "Laplace Transform",
      ],
    }),
  ],

  second2: [
    createSubject({
      code: "POWER2",
      name: "Advanced Power Systems",
      category: "Electrical",
      concepts: [
        "Load Flow",
        "Fault Analysis",
        "Stability",
        "Protection",
        "Smart Grids",
      ],
    }),
    createSubject({
      code: "PE",
      name: "Power Electronics",
      category: "Electronics",
      concepts: [
        "Diodes",
        "Thyristors",
        "Rectifiers",
        "Inverters",
        "Converters",
      ],
    }),
    createSubject({
      code: "MICRO",
      name: "Microcontrollers",
      category: "Embedded",
      concepts: [
        "Architecture",
        "Instruction Set",
        "Timers",
        "Interrupts",
        "Interfacing",
      ],
    }),
  ],

  third1: [
    createSubject({
      code: "RENEW",
      name: "Renewable Energy",
      category: "Energy",
      concepts: [
        "Solar Energy",
        "Wind Energy",
        "Hydro Energy",
        "Biomass",
        "Energy Storage",
      ],
    }),
    createSubject({
      code: "EV",
      name: "Electric Vehicles",
      category: "Electrical",
      concepts: [
        "EV Architecture",
        "Motors",
        "Batteries",
        "Charging",
        "Control",
      ],
    }),
    createSubject({
      code: "SMART",
      name: "Smart Grid",
      category: "Power",
      concepts: [
        "Smart Grid",
        "Automation",
        "Communication",
        "Demand Response",
        "Energy Management",
      ],
    }),
  ],

  third2: [
    createSubject({
      code: "DRIVES",
      name: "Electrical Drives",
      category: "Electrical",
      concepts: [
        "Drive Systems",
        "Motor Control",
        "Speed Control",
        "Braking",
        "Applications",
      ],
    }),
    createSubject({
      code: "AUTOMATION",
      name: "Industrial Automation",
      category: "Automation",
      concepts: [
        "PLC",
        "Sensors",
        "Actuators",
        "SCADA",
        "Industrial Networks",
      ],
    }),
    createSubject({
      code: "PROJECT",
      name: "Electrical Engineering Project",
      category: "Project",
      concepts: [
        "Problem Definition",
        "Design",
        "Simulation",
        "Implementation",
        "Testing",
      ],
    }),
  ],

  final1: [
    createSubject({
      code: "ADVPOWER",
      name: "Advanced Power Systems",
      category: "Electrical",
      concepts: [
        "Power Quality",
        "Grid Stability",
        "Protection",
        "Smart Grids",
        "Energy Management",
      ],
    }),
    createSubject({
      code: "ADVCTRL",
      name: "Advanced Control Systems",
      category: "Control",
      concepts: [
        "State Space",
        "Digital Control",
        "Optimal Control",
        "Robust Control",
        "Applications",
      ],
    }),
  ],

  final2: [
    createSubject({
      code: "CAPSTONE",
      name: "Electrical Capstone Project",
      category: "Project",
      concepts: [
        "Problem Analysis",
        "System Design",
        "Implementation",
        "Testing",
        "Deployment",
      ],
    }),
  ],
});


// =========================================================
// E&TC ENGINEERING
// =========================================================

const ENTC_ENGINEERING = createBranchCurriculum({

  first1: [
    createSubject({
      code: "MATH1",
      name: "Engineering Mathematics I",
      category: "Mathematics",
      concepts: [
        "Limits",
        "Differentiation",
        "Integration",
        "Matrices",
        "Complex Numbers",
      ],
    }),
    createSubject({
      code: "BEE",
      name: "Basic Electrical Engineering",
      category: "Electrical",
      concepts: [
        "DC Circuits",
        "AC Circuits",
        "Network Theorems",
        "Transformers",
        "Power",
      ],
    }),
    createSubject({
      code: "PHY",
      name: "Engineering Physics",
      category: "Science",
      concepts: [
        "Optics",
        "Quantum Physics",
        "Lasers",
        "Semiconductors",
        "Fiber Optics",
      ],
    }),
    createSubject({
      code: "PROGRAM",
      name: "Programming Fundamentals",
      category: "Programming",
      concepts: [
        "Variables",
        "Operators",
        "Conditions",
        "Loops",
        "Functions",
      ],
    }),
  ],

  first2: [
    createSubject({
      code: "MATH2",
      name: "Engineering Mathematics II",
      category: "Mathematics",
      concepts: [
        "Partial Differentiation",
        "Multiple Integrals",
        "Fourier Series",
        "Laplace Transform",
        "Probability",
      ],
    }),
    createSubject({
      code: "DE",
      name: "Digital Electronics",
      category: "Electronics",
      concepts: [
        "Number Systems",
        "Boolean Algebra",
        "Logic Gates",
        "Combinational Circuits",
        "Sequential Circuits",
      ],
    }),
    createSubject({
      code: "NETWORK",
      name: "Network Theory",
      category: "Electronics",
      concepts: [
        "Circuit Laws",
        "Network Theorems",
        "Transient Analysis",
        "AC Analysis",
        "Resonance",
      ],
    }),
    createSubject({
      code: "SIGNALS",
      name: "Signals and Systems",
      category: "Electronics",
      concepts: [
        "Signals",
        "Systems",
        "Convolution",
        "Fourier Transform",
        "Laplace Transform",
      ],
    }),
  ],

  second1: [
    createSubject({
      code: "DS",
      name: "Data Structures",
      category: "Programming",
      concepts: [
        "Arrays",
        "Linked Lists",
        "Stacks",
        "Trees",
        "Graphs",
      ],
    }),
    createSubject({
      code: "ADC",
      name: "Analog Electronics",
      category: "Electronics",
      concepts: [
        "Diodes",
        "Transistors",
        "Amplifiers",
        "Feedback",
        "Oscillators",
      ],
    }),
    createSubject({
      code: "MC",
      name: "Microcontrollers",
      category: "Embedded",
      concepts: [
        "Architecture",
        "Instruction Set",
        "Timers",
        "Interrupts",
        "Interfacing",
      ],
    }),
    createSubject({
      code: "EMF",
      name: "Electromagnetic Fields",
      category: "Electronics",
      concepts: [
        "Electric Fields",
        "Magnetic Fields",
        "Maxwell Equations",
        "Wave Propagation",
        "Applications",
      ],
    }),
  ],

  second2: [
    createSubject({
      code: "COMM",
      name: "Communication Systems",
      category: "Communication",
      concepts: [
        "Analog Communication",
        "Digital Communication",
        "Modulation",
        "Noise",
        "Receivers",
      ],
    }),
    createSubject({
      code: "DSP",
      name: "Digital Signal Processing",
      category: "Signal Processing",
      concepts: [
        "Sampling",
        "Discrete Signals",
        "DFT",
        "FFT",
        "Digital Filters",
      ],
    }),
    createSubject({
      code: "CN",
      name: "Computer Networks",
      category: "Networking",
      concepts: [
        "Network Models",
        "Routing",
        "Transport",
        "Protocols",
        "Security",
      ],
    }),
  ],

  third1: [
    createSubject({
      code: "VLSI",
      name: "VLSI Design",
      category: "Electronics",
      concepts: [
        "CMOS",
        "Digital Design",
        "Layout",
        "ASIC",
        "FPGA",
      ],
    }),
    createSubject({
      code: "IOT",
      name: "Internet of Things",
      category: "Embedded",
      concepts: [
        "IoT Architecture",
        "Sensors",
        "Connectivity",
        "Cloud",
        "IoT Security",
      ],
    }),
    createSubject({
      code: "WIRELESS",
      name: "Wireless Communication",
      category: "Communication",
      concepts: [
        "Wireless Channels",
        "Cellular Systems",
        "Antennas",
        "Modulation",
        "5G",
      ],
    }),
  ],

  third2: [
    createSubject({
      code: "EMBEDDED",
      name: "Embedded Systems",
      category: "Embedded",
      concepts: [
        "Embedded Architecture",
        "Real Time Systems",
        "Microcontrollers",
        "RTOS",
        "Interfacing",
      ],
    }),
    createSubject({
      code: "RF",
      name: "RF Engineering",
      category: "Communication",
      concepts: [
        "RF Circuits",
        "Antennas",
        "Propagation",
        "Microwave",
        "RF Systems",
      ],
    }),
    createSubject({
      code: "PROJECT",
      name: "E&TC Project",
      category: "Project",
      concepts: [
        "Problem Definition",
        "System Design",
        "Hardware",
        "Software",
        "Testing",
      ],
    }),
  ],

  final1: [
    createSubject({
      code: "ADVCOMM",
      name: "Advanced Communication Systems",
      category: "Communication",
      concepts: [
        "5G",
        "6G Concepts",
        "Massive MIMO",
        "Network Optimization",
        "Future Networks",
      ],
    }),
    createSubject({
      code: "ADVEMB",
      name: "Advanced Embedded Systems",
      category: "Embedded",
      concepts: [
        "RTOS",
        "Embedded AI",
        "Edge Computing",
        "IoT",
        "Embedded Security",
      ],
    }),
  ],

  final2: [
    createSubject({
      code: "CAPSTONE",
      name: "E&TC Capstone Project",
      category: "Project",
      concepts: [
        "Problem Analysis",
        "Architecture",
        "Implementation",
        "Testing",
        "Deployment",
      ],
    }),
  ],
});


// =========================================================
// MECHANICAL ENGINEERING
// =========================================================

const MECHANICAL_ENGINEERING = createBranchCurriculum({

  first1: [
    createSubject({
      code: "MATH1",
      name: "Engineering Mathematics I",
      category: "Mathematics",
      concepts: [
        "Limits",
        "Differentiation",
        "Integration",
        "Matrices",
        "Complex Numbers",
      ],
    }),
    createSubject({
      code: "MECH",
      name: "Engineering Mechanics",
      category: "Mechanical",
      concepts: [
        "Force Systems",
        "Equilibrium",
        "Friction",
        "Centroid",
        "Moment of Inertia",
      ],
    }),
    createSubject({
      code: "PHY",
      name: "Engineering Physics",
      category: "Science",
      concepts: [
        "Optics",
        "Quantum Physics",
        "Lasers",
        "Semiconductors",
        "Fiber Optics",
      ],
    }),
    createSubject({
      code: "GRAPHICS",
      name: "Engineering Graphics",
      category: "Design",
      concepts: [
        "Orthographic Projection",
        "Isometric Projection",
        "Sections",
        "Development",
        "CAD",
      ],
    }),
  ],

  first2: [
    createSubject({
      code: "MATH2",
      name: "Engineering Mathematics II",
      category: "Mathematics",
      concepts: [
        "Partial Differentiation",
        "Multiple Integrals",
        "Fourier Series",
        "Laplace Transform",
        "Probability",
      ],
    }),
    createSubject({
      code: "THERMO",
      name: "Thermodynamics",
      category: "Mechanical",
      concepts: [
        "Properties",
        "First Law",
        "Second Law",
        "Entropy",
        "Cycles",
      ],
    }),
    createSubject({
      code: "MATERIAL",
      name: "Engineering Materials",
      category: "Materials",
      concepts: [
        "Metals",
        "Polymers",
        "Ceramics",
        "Composites",
        "Material Testing",
      ],
    }),
    createSubject({
      code: "MANUF",
      name: "Manufacturing Processes",
      category: "Manufacturing",
      concepts: [
        "Casting",
        "Forming",
        "Machining",
        "Welding",
        "Additive Manufacturing",
      ],
    }),
  ],

  second1: [
    createSubject({
      code: "SOM",
      name: "Strength of Materials",
      category: "Mechanical",
      concepts: [
        "Stress",
        "Strain",
        "Bending",
        "Torsion",
        "Columns",
      ],
    }),
    createSubject({
      code: "FLUID",
      name: "Fluid Mechanics",
      category: "Mechanical",
      concepts: [
        "Fluid Properties",
        "Pressure",
        "Flow",
        "Bernoulli Equation",
        "Pumps",
      ],
    }),
    createSubject({
      code: "CAD",
      name: "Computer Aided Design",
      category: "Design",
      concepts: [
        "CAD Fundamentals",
        "3D Modeling",
        "Assemblies",
        "Drafting",
        "Design Analysis",
      ],
    }),
    createSubject({
      code: "METROLOGY",
      name: "Metrology",
      category: "Manufacturing",
      concepts: [
        "Measurement",
        "Errors",
        "Instruments",
        "Limits",
        "Quality Control",
      ],
    }),
  ],

  second2: [
    createSubject({
      code: "DYNAMICS",
      name: "Dynamics of Machines",
      category: "Mechanical",
      concepts: [
        "Kinematics",
        "Dynamics",
        "Balancing",
        "Vibrations",
        "Flywheels",
      ],
    }),
    createSubject({
      code: "HEAT",
      name: "Heat Transfer",
      category: "Thermal",
      concepts: [
        "Conduction",
        "Convection",
        "Radiation",
        "Heat Exchangers",
        "Thermal Systems",
      ],
    }),
    createSubject({
      code: "CNC",
      name: "CNC and Automation",
      category: "Manufacturing",
      concepts: [
        "CNC",
        "Programming",
        "Robotics",
        "Automation",
        "Flexible Manufacturing",
      ],
    }),
  ],

  third1: [
    createSubject({
      code: "AUTOMOBILE",
      name: "Automobile Engineering",
      category: "Automotive",
      concepts: [
        "Engine",
        "Transmission",
        "Braking",
        "Suspension",
        "Vehicle Dynamics",
      ],
    }),
    createSubject({
      code: "ROBOTICS",
      name: "Robotics",
      category: "Automation",
      concepts: [
        "Robot Architecture",
        "Kinematics",
        "Dynamics",
        "Sensors",
        "Control",
      ],
    }),
    createSubject({
      code: "CADCAM",
      name: "CAD/CAM",
      category: "Design",
      concepts: [
        "CAD",
        "CAM",
        "CNC",
        "Tool Paths",
        "Digital Manufacturing",
      ],
    }),
  ],

  third2: [
    createSubject({
      code: "EV",
      name: "Electric Vehicles",
      category: "Automotive",
      concepts: [
        "EV Architecture",
        "Motors",
        "Batteries",
        "Charging",
        "Control",
      ],
    }),
    createSubject({
      code: "INDUSTRY",
      name: "Industrial Engineering",
      category: "Manufacturing",
      concepts: [
        "Production Planning",
        "Inventory",
        "Quality",
        "Operations Research",
        "Optimization",
      ],
    }),
    createSubject({
      code: "PROJECT",
      name: "Mechanical Engineering Project",
      category: "Project",
      concepts: [
        "Problem Definition",
        "Design",
        "Analysis",
        "Prototype",
        "Testing",
      ],
    }),
  ],

  final1: [
    createSubject({
      code: "ADVMECH",
      name: "Advanced Mechanical Design",
      category: "Design",
      concepts: [
        "Machine Design",
        "FEA",
        "Optimization",
        "Simulation",
        "Product Development",
      ],
    }),
    createSubject({
      code: "SMARTMAN",
      name: "Smart Manufacturing",
      category: "Manufacturing",
      concepts: [
        "Industry 4.0",
        "IoT",
        "Digital Twins",
        "Automation",
        "Analytics",
      ],
    }),
  ],

  final2: [
    createSubject({
      code: "CAPSTONE",
      name: "Mechanical Capstone Project",
      category: "Project",
      concepts: [
        "Problem Analysis",
        "Design",
        "Simulation",
        "Implementation",
        "Testing",
      ],
    }),
  ],
});


// =========================================================
// CIVIL ENGINEERING
// =========================================================

const CIVIL_ENGINEERING = createBranchCurriculum({

  first1: [
    createSubject({
      code: "MATH1",
      name: "Engineering Mathematics I",
      category: "Mathematics",
      concepts: [
        "Limits",
        "Differentiation",
        "Integration",
        "Matrices",
        "Complex Numbers",
      ],
    }),
    createSubject({
      code: "MECH",
      name: "Engineering Mechanics",
      category: "Civil",
      concepts: [
        "Force Systems",
        "Equilibrium",
        "Friction",
        "Centroid",
        "Moment of Inertia",
      ],
    }),
    createSubject({
      code: "PHY",
      name: "Engineering Physics",
      category: "Science",
      concepts: [
        "Optics",
        "Quantum Physics",
        "Lasers",
        "Semiconductors",
        "Fiber Optics",
      ],
    }),
    createSubject({
      code: "GRAPHICS",
      name: "Engineering Graphics",
      category: "Design",
      concepts: [
        "Orthographic Projection",
        "Isometric Projection",
        "Sections",
        "Development",
        "CAD",
      ],
    }),
  ],

  first2: [
    createSubject({
      code: "MATH2",
      name: "Engineering Mathematics II",
      category: "Mathematics",
      concepts: [
        "Partial Differentiation",
        "Multiple Integrals",
        "Fourier Series",
        "Laplace Transform",
        "Probability",
      ],
    }),
    createSubject({
      code: "SURVEY",
      name: "Surveying",
      category: "Civil",
      concepts: [
        "Chain Surveying",
        "Compass Surveying",
        "Leveling",
        "Theodolite",
        "Total Station",
      ],
    }),
    createSubject({
      code: "MATERIAL",
      name: "Building Materials",
      category: "Civil",
      concepts: [
        "Cement",
        "Concrete",
        "Steel",
        "Bricks",
        "Timber",
      ],
    }),
    createSubject({
      code: "GEO",
      name: "Engineering Geology",
      category: "Civil",
      concepts: [
        "Minerals",
        "Rocks",
        "Geological Structures",
        "Groundwater",
        "Engineering Applications",
      ],
    }),
  ],

  second1: [
    createSubject({
      code: "STRUCT",
      name: "Structural Analysis",
      category: "Structures",
      concepts: [
        "Beams",
        "Trusses",
        "Frames",
        "Deflection",
        "Indeterminate Structures",
      ],
    }),
    createSubject({
      code: "SOIL",
      name: "Soil Mechanics",
      category: "Geotechnical",
      concepts: [
        "Soil Properties",
        "Compaction",
        "Permeability",
        "Shear Strength",
        "Consolidation",
      ],
    }),
    createSubject({
      code: "FLUID",
      name: "Fluid Mechanics",
      category: "Civil",
      concepts: [
        "Fluid Properties",
        "Pressure",
        "Flow",
        "Bernoulli Equation",
        "Pipe Flow",
      ],
    }),
    createSubject({
      code: "CONCRETE",
      name: "Concrete Technology",
      category: "Materials",
      concepts: [
        "Concrete Ingredients",
        "Mix Design",
        "Workability",
        "Strength",
        "Durability",
      ],
    }),
  ],

  second2: [
    createSubject({
      code: "RCC",
      name: "Reinforced Cement Concrete",
      category: "Structures",
      concepts: [
        "RCC Fundamentals",
        "Beams",
        "Slabs",
        "Columns",
        "Foundations",
      ],
    }),
    createSubject({
      code: "HYDRO",
      name: "Hydraulics",
      category: "Civil",
      concepts: [
        "Open Channel Flow",
        "Pumps",
        "Turbines",
        "Hydraulic Machines",
        "Flow Measurement",
      ],
    }),
    createSubject({
      code: "TRANSPORT",
      name: "Transportation Engineering",
      category: "Infrastructure",
      concepts: [
        "Highways",
        "Traffic Engineering",
        "Pavements",
        "Railways",
        "Airports",
      ],
    }),
  ],

  third1: [
    createSubject({
      code: "ENV",
      name: "Environmental Engineering",
      category: "Environment",
      concepts: [
        "Water Treatment",
        "Wastewater",
        "Air Pollution",
        "Solid Waste",
        "Environmental Management",
      ],
    }),
    createSubject({
      code: "URBAN",
      name: "Urban Planning",
      category: "Planning",
      concepts: [
        "Land Use",
        "Transportation Planning",
        "Urban Growth",
        "Infrastructure",
        "Smart Cities",
      ],
    }),
    createSubject({
      code: "GIS",
      name: "GIS and Remote Sensing",
      category: "Technology",
      concepts: [
        "GIS Fundamentals",
        "Spatial Data",
        "Remote Sensing",
        "Mapping",
        "Analysis",
      ],
    }),
  ],

  third2: [
    createSubject({
      code: "ADVSTRUCT",
      name: "Advanced Structural Engineering",
      category: "Structures",
      concepts: [
        "Advanced Analysis",
        "Earthquake Engineering",
        "Steel Structures",
        "Prestressed Concrete",
        "Structural Design",
      ],
    }),
    createSubject({
      code: "WATER",
      name: "Water Resources Engineering",
      category: "Water",
      concepts: [
        "Hydrology",
        "Irrigation",
        "Dams",
        "Flood Management",
        "Water Resources",
      ],
    }),
    createSubject({
      code: "PROJECT",
      name: "Civil Engineering Project",
      category: "Project",
      concepts: [
        "Problem Definition",
        "Survey",
        "Design",
        "Execution",
        "Testing",
      ],
    }),
  ],

  final1: [
    createSubject({
      code: "ADVCON",
      name: "Advanced Construction Technology",
      category: "Construction",
      concepts: [
        "Modern Construction",
        "Prefabrication",
        "Automation",
        "Project Management",
        "Quality Control",
      ],
    }),
    createSubject({
      code: "SMARTCITY",
      name: "Smart Infrastructure",
      category: "Infrastructure",
      concepts: [
        "Smart Cities",
        "IoT",
        "Digital Twins",
        "Infrastructure Analytics",
        "Sustainability",
      ],
    }),
  ],

  final2: [
    createSubject({
      code: "CAPSTONE",
      name: "Civil Engineering Capstone",
      category: "Project",
      concepts: [
        "Problem Analysis",
        "Design",
        "Planning",
        "Implementation",
        "Evaluation",
      ],
    }),
  ],
});


// =========================================================
// CHEMICAL ENGINEERING
// =========================================================

const CHEMICAL_ENGINEERING = createBranchCurriculum({

  first1: [
    createSubject({
      code: "MATH1",
      name: "Engineering Mathematics I",
      category: "Mathematics",
      concepts: [
        "Limits",
        "Differentiation",
        "Integration",
        "Matrices",
        "Complex Numbers",
      ],
    }),
    createSubject({
      code: "CHEM",
      name: "Engineering Chemistry",
      category: "Chemistry",
      concepts: [
        "Water Technology",
        "Corrosion",
        "Polymers",
        "Nanomaterials",
        "Green Chemistry",
      ],
    }),
    createSubject({
      code: "PHY",
      name: "Engineering Physics",
      category: "Science",
      concepts: [
        "Optics",
        "Quantum Physics",
        "Lasers",
        "Semiconductors",
        "Fiber Optics",
      ],
    }),
    createSubject({
      code: "MECH",
      name: "Engineering Mechanics",
      category: "Engineering",
      concepts: [
        "Force Systems",
        "Equilibrium",
        "Friction",
        "Centroid",
        "Moment of Inertia",
      ],
    }),
  ],

  first2: [
    createSubject({
      code: "MATH2",
      name: "Engineering Mathematics II",
      category: "Mathematics",
      concepts: [
        "Partial Differentiation",
        "Multiple Integrals",
        "Fourier Series",
        "Laplace Transform",
        "Probability",
      ],
    }),
    createSubject({
      code: "THERMO",
      name: "Chemical Engineering Thermodynamics",
      category: "Chemical",
      concepts: [
        "Properties",
        "First Law",
        "Second Law",
        "Entropy",
        "Phase Equilibrium",
      ],
    }),
    createSubject({
      code: "MATERIAL",
      name: "Material Science",
      category: "Materials",
      concepts: [
        "Metals",
        "Polymers",
        "Ceramics",
        "Composites",
        "Corrosion",
      ],
    }),
  ],

  second1: [
    createSubject({
      code: "FLUID",
      name: "Fluid Mechanics",
      category: "Chemical",
      concepts: [
        "Fluid Properties",
        "Fluid Statics",
        "Flow",
        "Bernoulli Equation",
        "Pipe Flow",
      ],
    }),
    createSubject({
      code: "HEAT",
      name: "Heat Transfer",
      category: "Chemical",
      concepts: [
        "Conduction",
        "Convection",
        "Radiation",
        "Heat Exchangers",
        "Thermal Systems",
      ],
    }),
    createSubject({
      code: "MASS",
      name: "Mass Transfer",
      category: "Chemical",
      concepts: [
        "Diffusion",
        "Absorption",
        "Distillation",
        "Extraction",
        "Drying",
      ],
    }),
  ],

  second2: [
    createSubject({
      code: "REACTION",
      name: "Chemical Reaction Engineering",
      category: "Chemical",
      concepts: [
        "Reaction Kinetics",
        "Reactors",
        "Conversion",
        "Selectivity",
        "Reactor Design",
      ],
    }),
    createSubject({
      code: "PROCESS",
      name: "Process Control",
      category: "Control",
      concepts: [
        "Process Dynamics",
        "Feedback",
        "Controllers",
        "Stability",
        "Instrumentation",
      ],
    }),
    createSubject({
      code: "SAFETY",
      name: "Process Safety",
      category: "Safety",
      concepts: [
        "Hazard Identification",
        "Risk Assessment",
        "Fire Safety",
        "Process Safety",
        "Emergency Management",
      ],
    }),
  ],

  third1: [
    createSubject({
      code: "BIO",
      name: "Biochemical Engineering",
      category: "Biotechnology",
      concepts: [
        "Bioreactors",
        "Enzymes",
        "Fermentation",
        "Bioprocessing",
        "Downstream Processing",
      ],
    }),
    createSubject({
      code: "PETRO",
      name: "Petroleum Engineering",
      category: "Energy",
      concepts: [
        "Crude Oil",
        "Refining",
        "Distillation",
        "Cracking",
        "Fuel Processing",
      ],
    }),
    createSubject({
      code: "ENV",
      name: "Environmental Engineering",
      category: "Environment",
      concepts: [
        "Wastewater",
        "Air Pollution",
        "Solid Waste",
        "Treatment",
        "Sustainability",
      ],
    }),
  ],

  third2: [
    createSubject({
      code: "PROCESS2",
      name: "Advanced Process Engineering",
      category: "Chemical",
      concepts: [
        "Process Design",
        "Optimization",
        "Simulation",
        "Scale Up",
        "Process Integration",
      ],
    }),
    createSubject({
      code: "NANO",
      name: "Nanotechnology",
      category: "Materials",
      concepts: [
        "Nanomaterials",
        "Nanostructures",
        "Synthesis",
        "Characterization",
        "Applications",
      ],
    }),
    createSubject({
      code: "PROJECT",
      name: "Chemical Engineering Project",
      category: "Project",
      concepts: [
        "Problem Definition",
        "Process Design",
        "Simulation",
        "Implementation",
        "Testing",
      ],
    }),
  ],

  final1: [
    createSubject({
      code: "ADVPROC",
      name: "Advanced Process Design",
      category: "Chemical",
      concepts: [
        "Process Simulation",
        "Optimization",
        "Process Integration",
        "Energy Efficiency",
        "Scale Up",
      ],
    }),
    createSubject({
      code: "SUSTAIN",
      name: "Sustainable Chemical Engineering",
      category: "Sustainability",
      concepts: [
        "Green Processes",
        "Waste Reduction",
        "Energy Efficiency",
        "Circular Economy",
        "Clean Technology",
      ],
    }),
  ],

  final2: [
    createSubject({
      code: "CAPSTONE",
      name: "Chemical Engineering Capstone",
      category: "Project",
      concepts: [
        "Problem Analysis",
        "Process Design",
        "Simulation",
        "Optimization",
        "Evaluation",
      ],
    }),
  ],
});


// =========================================================
// BIOMEDICAL ENGINEERING
// =========================================================

const BIOMEDICAL_ENGINEERING = createBranchCurriculum({

  first1: [
    createSubject({
      code: "MATH1",
      name: "Engineering Mathematics I",
      category: "Mathematics",
      concepts: [
        "Limits",
        "Differentiation",
        "Integration",
        "Matrices",
        "Complex Numbers",
      ],
    }),
    createSubject({
      code: "BIO",
      name: "Biology for Engineers",
      category: "Biomedical",
      concepts: [
        "Cell Biology",
        "Human Anatomy",
        "Physiology",
        "Genetics",
        "Biomolecules",
      ],
    }),
    createSubject({
      code: "PHY",
      name: "Engineering Physics",
      category: "Science",
      concepts: [
        "Optics",
        "Quantum Physics",
        "Lasers",
        "Semiconductors",
        "Radiation",
      ],
    }),
    createSubject({
      code: "PROGRAM",
      name: "Programming Fundamentals",
      category: "Programming",
      concepts: [
        "Variables",
        "Conditions",
        "Loops",
        "Functions",
        "Arrays",
      ],
    }),
  ],

  first2: [
    createSubject({
      code: "MATH2",
      name: "Engineering Mathematics II",
      category: "Mathematics",
      concepts: [
        "Partial Differentiation",
        "Multiple Integrals",
        "Fourier Series",
        "Laplace Transform",
        "Probability",
      ],
    }),
    createSubject({
      code: "BIOMECH",
      name: "Biomechanics",
      category: "Biomedical",
      concepts: [
        "Forces",
        "Motion",
        "Joints",
        "Tissues",
        "Biomechanical Analysis",
      ],
    }),
    createSubject({
      code: "ELECT",
      name: "Biomedical Electronics",
      category: "Electronics",
      concepts: [
        "Circuits",
        "Sensors",
        "Amplifiers",
        "Signal Conditioning",
        "Instrumentation",
      ],
    }),
  ],

  second1: [
    createSubject({
      code: "BMEASURE",
      name: "Biomedical Measurements",
      category: "Biomedical",
      concepts: [
        "Sensors",
        "Transducers",
        "Measurement",
        "Errors",
        "Data Acquisition",
      ],
    }),
    createSubject({
      code: "SIGNAL",
      name: "Biomedical Signal Processing",
      category: "Signal Processing",
      concepts: [
        "ECG",
        "EEG",
        "Filtering",
        "Sampling",
        "Feature Extraction",
      ],
    }),
    createSubject({
      code: "MATERIAL",
      name: "Biomaterials",
      category: "Biomedical",
      concepts: [
        "Metals",
        "Polymers",
        "Ceramics",
        "Composites",
        "Biocompatibility",
      ],
    }),
  ],

  second2: [
    createSubject({
      code: "IMAGING",
      name: "Medical Imaging",
      category: "Biomedical",
      concepts: [
        "X Ray",
        "CT",
        "MRI",
        "Ultrasound",
        "Image Processing",
      ],
    }),
    createSubject({
      code: "INSTR",
      name: "Biomedical Instrumentation",
      category: "Biomedical",
      concepts: [
        "Patient Monitoring",
        "Sensors",
        "Amplifiers",
        "Safety",
        "Instrumentation",
      ],
    }),
    createSubject({
      code: "PROSTH",
      name: "Prosthetics and Orthotics",
      category: "Biomedical",
      concepts: [
        "Prosthetics",
        "Orthotics",
        "Design",
        "Materials",
        "Biomechanics",
      ],
    }),
  ],

  third1: [
    createSubject({
      code: "AIHEALTH",
      name: "AI in Healthcare",
      category: "AI",
      concepts: [
        "Medical AI",
        "Diagnosis",
        "Medical Imaging",
        "Prediction",
        "Clinical Decision Support",
      ],
    }),
    createSubject({
      code: "REHAB",
      name: "Rehabilitation Engineering",
      category: "Biomedical",
      concepts: [
        "Assistive Devices",
        "Rehabilitation",
        "Human Motion",
        "Sensors",
        "Control",
      ],
    }),
  ],

  third2: [
    createSubject({
      code: "TISSUE",
      name: "Tissue Engineering",
      category: "Biomedical",
      concepts: [
        "Scaffolds",
        "Cells",
        "Biomaterials",
        "Regeneration",
        "Bioreactors",
      ],
    }),
    createSubject({
      code: "BIOINFO",
      name: "Bioinformatics",
      category: "Biomedical",
      concepts: [
        "DNA",
        "Sequences",
        "Genomics",
        "Proteomics",
        "Biological Databases",
      ],
    }),
    createSubject({
      code: "PROJECT",
      name: "Biomedical Engineering Project",
      category: "Project",
      concepts: [
        "Problem Definition",
        "Research",
        "Design",
        "Prototype",
        "Testing",
      ],
    }),
  ],

  final1: [
    createSubject({
      code: "ADVBIOMED",
      name: "Advanced Biomedical Engineering",
      category: "Biomedical",
      concepts: [
        "Medical Devices",
        "AI Healthcare",
        "Wearables",
        "Implants",
        "Clinical Engineering",
      ],
    }),
  ],

  final2: [
    createSubject({
      code: "CAPSTONE",
      name: "Biomedical Capstone",
      category: "Project",
      concepts: [
        "Problem Analysis",
        "Medical Design",
        "Prototype",
        "Validation",
        "Deployment",
      ],
    }),
  ],
});


// =========================================================
// ROBOTICS & AUTOMATION
// =========================================================

const ROBOTICS_AUTOMATION = createBranchCurriculum({

  first1: [
    createSubject({
      code: "MATH1",
      name: "Engineering Mathematics I",
      category: "Mathematics",
      concepts: [
        "Limits",
        "Differentiation",
        "Integration",
        "Matrices",
        "Complex Numbers",
      ],
    }),
    createSubject({
      code: "PROGRAM",
      name: "Programming Fundamentals",
      category: "Programming",
      concepts: [
        "Variables",
        "Conditions",
        "Loops",
        "Functions",
        "Arrays",
      ],
    }),
    createSubject({
      code: "MECH",
      name: "Engineering Mechanics",
      category: "Engineering",
      concepts: [
        "Forces",
        "Equilibrium",
        "Friction",
        "Centroid",
        "Motion",
      ],
    }),
    createSubject({
      code: "ELECT",
      name: "Basic Electronics",
      category: "Electronics",
      concepts: [
        "Circuits",
        "Diodes",
        "Transistors",
        "Logic Gates",
        "Sensors",
      ],
    }),
  ],

  first2: [
    createSubject({
      code: "MATH2",
      name: "Engineering Mathematics II",
      category: "Mathematics",
      concepts: [
        "Partial Differentiation",
        "Multiple Integrals",
        "Fourier Series",
        "Laplace Transform",
        "Probability",
      ],
    }),
    createSubject({
      code: "DS",
      name: "Data Structures",
      category: "Programming",
      concepts: [
        "Arrays",
        "Linked Lists",
        "Stacks",
        "Queues",
        "Trees",
      ],
    }),
    createSubject({
      code: "DIGITAL",
      name: "Digital Systems",
      category: "Electronics",
      concepts: [
        "Number Systems",
        "Boolean Algebra",
        "Logic Gates",
        "Combinational Logic",
        "Sequential Logic",
      ],
    }),
  ],

  second1: [
    createSubject({
      code: "ROBOT",
      name: "Robotics Fundamentals",
      category: "Robotics",
      concepts: [
        "Robot Types",
        "Kinematics",
        "Dynamics",
        "Actuators",
        "Sensors",
      ],
    }),
    createSubject({
      code: "CONTROL",
      name: "Control Systems",
      category: "Control",
      concepts: [
        "Transfer Functions",
        "Block Diagrams",
        "Stability",
        "Controllers",
        "Feedback",
      ],
    }),
    createSubject({
      code: "MC",
      name: "Microcontrollers",
      category: "Embedded",
      concepts: [
        "Architecture",
        "Programming",
        "Timers",
        "Interrupts",
        "Interfacing",
      ],
    }),
  ],

  second2: [
    createSubject({
      code: "AUTOMATION",
      name: "Industrial Automation",
      category: "Automation",
      concepts: [
        "PLC",
        "SCADA",
        "Sensors",
        "Actuators",
        "Industrial Networks",
      ],
    }),
    createSubject({
      code: "VISION",
      name: "Robot Vision",
      category: "AI",
      concepts: [
        "Image Processing",
        "Feature Detection",
        "Object Detection",
        "Tracking",
        "Recognition",
      ],
    }),
    createSubject({
      code: "MECHDES",
      name: "Mechanical Design for Robots",
      category: "Mechanical",
      concepts: [
        "Mechanisms",
        "CAD",
        "Actuators",
        "Joints",
        "Robot Structures",
      ],
    }),
  ],

  third1: [
    createSubject({
      code: "AIROBOT",
      name: "AI for Robotics",
      category: "AI",
      concepts: [
        "Robot Perception",
        "Planning",
        "Learning",
        "Decision Making",
        "Navigation",
      ],
    }),
    createSubject({
      code: "IOT",
      name: "Industrial IoT",
      category: "IoT",
      concepts: [
        "IoT Architecture",
        "Sensors",
        "Connectivity",
        "Cloud",
        "Security",
      ],
    }),
  ],

  third2: [
    createSubject({
      code: "AUTONOMOUS",
      name: "Autonomous Systems",
      category: "Robotics",
      concepts: [
        "Localization",
        "Mapping",
        "Path Planning",
        "Navigation",
        "Control",
      ],
    }),
    createSubject({
      code: "PROJECT",
      name: "Robotics Project",
      category: "Project",
      concepts: [
        "Problem Definition",
        "System Design",
        "Hardware",
        "Software",
        "Testing",
      ],
    }),
  ],

  final1: [
    createSubject({
      code: "ADVROBOT",
      name: "Advanced Robotics",
      category: "Robotics",
      concepts: [
        "Humanoid Robots",
        "Multi Robot Systems",
        "Robot Learning",
        "Manipulation",
        "Autonomous Navigation",
      ],
    }),
  ],

  final2: [
    createSubject({
      code: "CAPSTONE",
      name: "Robotics Capstone",
      category: "Project",
      concepts: [
        "Problem Analysis",
        "Robot Design",
        "Implementation",
        "Testing",
        "Deployment",
      ],
    }),
  ],
});


// =========================================================
// AUTOMOBILE ENGINEERING
// =========================================================

const AUTOMOBILE_ENGINEERING = createBranchCurriculum({

  first1: [
    createSubject({
      code: "MATH1",
      name: "Engineering Mathematics I",
      category: "Mathematics",
      concepts: [
        "Limits",
        "Differentiation",
        "Integration",
        "Matrices",
        "Complex Numbers",
      ],
    }),
    createSubject({
      code: "MECH",
      name: "Engineering Mechanics",
      category: "Mechanical",
      concepts: [
        "Force Systems",
        "Equilibrium",
        "Friction",
        "Centroid",
        "Motion",
      ],
    }),
    createSubject({
      code: "PHY",
      name: "Engineering Physics",
      category: "Science",
      concepts: [
        "Optics",
        "Quantum Physics",
        "Lasers",
        "Semiconductors",
        "Fiber Optics",
      ],
    }),
    createSubject({
      code: "GRAPHICS",
      name: "Engineering Graphics",
      category: "Design",
      concepts: [
        "Orthographic Projection",
        "Isometric Projection",
        "Sections",
        "Development",
        "CAD",
      ],
    }),
  ],

  first2: [
    createSubject({
      code: "MATH2",
      name: "Engineering Mathematics II",
      category: "Mathematics",
      concepts: [
        "Partial Differentiation",
        "Multiple Integrals",
        "Fourier Series",
        "Laplace Transform",
        "Probability",
      ],
    }),
    createSubject({
      code: "AUTO1",
      name: "Automobile Fundamentals",
      category: "Automotive",
      concepts: [
        "Vehicle Systems",
        "Engine",
        "Transmission",
        "Braking",
        "Steering",
      ],
    }),
    createSubject({
      code: "MATERIAL",
      name: "Automotive Materials",
      category: "Materials",
      concepts: [
        "Metals",
        "Polymers",
        "Composites",
        "Heat Treatment",
        "Material Testing",
      ],
    }),
  ],

  second1: [
    createSubject({
      code: "IC",
      name: "Internal Combustion Engines",
      category: "Automotive",
      concepts: [
        "Engine Cycles",
        "Combustion",
        "Fuel Systems",
        "Cooling",
        "Lubrication",
      ],
    }),
    createSubject({
      code: "THERMO",
      name: "Thermodynamics",
      category: "Thermal",
      concepts: [
        "Properties",
        "First Law",
        "Second Law",
        "Entropy",
        "Cycles",
      ],
    }),
    createSubject({
      code: "VEHICLE",
      name: "Vehicle Dynamics",
      category: "Automotive",
      concepts: [
        "Forces",
        "Handling",
        "Ride",
        "Stability",
        "Braking",
      ],
    }),
  ],

  second2: [
    createSubject({
      code: "AUTOELEC",
      name: "Automotive Electronics",
      category: "Electronics",
      concepts: [
        "ECU",
        "Sensors",
        "Actuators",
        "CAN Bus",
        "Diagnostics",
      ],
    }),
    createSubject({
      code: "MANUF",
      name: "Automotive Manufacturing",
      category: "Manufacturing",
      concepts: [
        "Casting",
        "Machining",
        "Welding",
        "Assembly",
        "Quality",
      ],
    }),
    createSubject({
      code: "EV",
      name: "Electric Vehicle Fundamentals",
      category: "EV",
      concepts: [
        "EV Architecture",
        "Motors",
        "Batteries",
        "Charging",
        "Control",
      ],
    }),
  ],

  third1: [
    createSubject({
      code: "EV2",
      name: "Advanced Electric Vehicles",
      category: "EV",
      concepts: [
        "Battery Systems",
        "Motor Drives",
        "Charging",
        "Thermal Management",
        "Energy Management",
      ],
    }),
    createSubject({
      code: "AUTONOMOUS",
      name: "Autonomous Vehicles",
      category: "AI",
      concepts: [
        "Sensors",
        "Perception",
        "Localization",
        "Planning",
        "Control",
      ],
    }),
  ],

  third2: [
    createSubject({
      code: "CONNECTED",
      name: "Connected Vehicles",
      category: "Automotive",
      concepts: [
        "Vehicle Connectivity",
        "V2V",
        "V2I",
        "Telematics",
        "Cyber Security",
      ],
    }),
    createSubject({
      code: "PROJECT",
      name: "Automobile Engineering Project",
      category: "Project",
      concepts: [
        "Problem Definition",
        "Design",
        "Prototype",
        "Testing",
        "Validation",
      ],
    }),
  ],

  final1: [
    createSubject({
      code: "ADV_AUTO",
      name: "Advanced Automotive Systems",
      category: "Automotive",
      concepts: [
        "ADAS",
        "Autonomous Driving",
        "EV Systems",
        "Connected Vehicles",
        "Vehicle AI",
      ],
    }),
  ],

  final2: [
    createSubject({
      code: "CAPSTONE",
      name: "Automobile Capstone",
      category: "Project",
      concepts: [
        "Problem Analysis",
        "Vehicle Design",
        "Prototype",
        "Testing",
        "Deployment",
      ],
    }),
  ],
});


// =========================================================
// PRODUCTION ENGINEERING
// =========================================================

const PRODUCTION_ENGINEERING = createBranchCurriculum({

  first1: [
    createSubject({
      code: "MATH1",
      name: "Engineering Mathematics I",
      category: "Mathematics",
      concepts: [
        "Limits",
        "Differentiation",
        "Integration",
        "Matrices",
        "Complex Numbers",
      ],
    }),
    createSubject({
      code: "MECH",
      name: "Engineering Mechanics",
      category: "Engineering",
      concepts: [
        "Force Systems",
        "Equilibrium",
        "Friction",
        "Centroid",
        "Moment of Inertia",
      ],
    }),
    createSubject({
      code: "GRAPHICS",
      name: "Engineering Graphics",
      category: "Design",
      concepts: [
        "Orthographic Projection",
        "Isometric Projection",
        "Sections",
        "Development",
        "CAD",
      ],
    }),
  ],

  first2: [
    createSubject({
      code: "MATH2",
      name: "Engineering Mathematics II",
      category: "Mathematics",
      concepts: [
        "Partial Differentiation",
        "Multiple Integrals",
        "Fourier Series",
        "Laplace Transform",
        "Probability",
      ],
    }),
    createSubject({
      code: "MANUF",
      name: "Manufacturing Processes",
      category: "Manufacturing",
      concepts: [
        "Casting",
        "Forming",
        "Machining",
        "Welding",
        "Additive Manufacturing",
      ],
    }),
    createSubject({
      code: "MATERIAL",
      name: "Engineering Materials",
      category: "Materials",
      concepts: [
        "Metals",
        "Polymers",
        "Ceramics",
        "Composites",
        "Material Testing",
      ],
    }),
  ],

  second1: [
    createSubject({
      code: "CAD",
      name: "Computer Aided Design",
      category: "Design",
      concepts: [
        "CAD Fundamentals",
        "3D Modeling",
        "Assemblies",
        "Drafting",
        "Design Analysis",
      ],
    }),
    createSubject({
      code: "METROLOGY",
      name: "Metrology",
      category: "Manufacturing",
      concepts: [
        "Measurement",
        "Errors",
        "Instruments",
        "Limits",
        "Quality",
      ],
    }),
    createSubject({
      code: "PROD",
      name: "Production Technology",
      category: "Production",
      concepts: [
        "Production Systems",
        "Process Planning",
        "Scheduling",
        "Quality",
        "Productivity",
      ],
    }),
  ],

  second2: [
    createSubject({
      code: "CNC",
      name: "CNC and Automation",
      category: "Manufacturing",
      concepts: [
        "CNC",
        "Programming",
        "Tool Paths",
        "Robotics",
        "Automation",
      ],
    }),
    createSubject({
      code: "OR",
      name: "Operations Research",
      category: "Optimization",
      concepts: [
        "Linear Programming",
        "Transportation",
        "Assignment",
        "Queuing",
        "Optimization",
      ],
    }),
    createSubject({
      code: "QUALITY",
      name: "Quality Engineering",
      category: "Quality",
      concepts: [
        "Quality Control",
        "SPC",
        "Six Sigma",
        "Reliability",
        "Quality Management",
      ],
    }),
  ],

  third1: [
    createSubject({
      code: "IND4",
      name: "Industry 4.0",
      category: "Manufacturing",
      concepts: [
        "IoT",
        "Automation",
        "Digital Twins",
        "Analytics",
        "Smart Manufacturing",
      ],
    }),
    createSubject({
      code: "SUPPLY",
      name: "Supply Chain Management",
      category: "Management",
      concepts: [
        "Supply Chains",
        "Inventory",
        "Logistics",
        "Forecasting",
        "Optimization",
      ],
    }),
  ],

  third2: [
    createSubject({
      code: "LEAN",
      name: "Lean Manufacturing",
      category: "Production",
      concepts: [
        "Lean Principles",
        "Waste Reduction",
        "Kaizen",
        "Value Stream Mapping",
        "Continuous Improvement",
      ],
    }),
    createSubject({
      code: "PROJECT",
      name: "Production Engineering Project",
      category: "Project",
      concepts: [
        "Problem Definition",
        "Process Design",
        "Implementation",
        "Quality",
        "Evaluation",
      ],
    }),
  ],

  final1: [
    createSubject({
      code: "SMARTMAN",
      name: "Smart Manufacturing",
      category: "Manufacturing",
      concepts: [
        "Digital Manufacturing",
        "AI",
        "IoT",
        "Digital Twins",
        "Automation",
      ],
    }),
  ],

  final2: [
    createSubject({
      code: "CAPSTONE",
      name: "Production Capstone",
      category: "Project",
      concepts: [
        "Problem Analysis",
        "Process Design",
        "Optimization",
        "Implementation",
        "Evaluation",
      ],
    }),
  ],
});


// =========================================================
// ENVIRONMENTAL ENGINEERING
// =========================================================

const ENVIRONMENTAL_ENGINEERING = createBranchCurriculum({

  first1: [
    createSubject({
      code: "MATH1",
      name: "Engineering Mathematics I",
      category: "Mathematics",
      concepts: [
        "Limits",
        "Differentiation",
        "Integration",
        "Matrices",
        "Complex Numbers",
      ],
    }),
    createSubject({
      code: "ENVSCI",
      name: "Environmental Science",
      category: "Environment",
      concepts: [
        "Ecosystems",
        "Natural Resources",
        "Pollution",
        "Climate Change",
        "Sustainability",
      ],
    }),
    createSubject({
      code: "CHEM",
      name: "Environmental Chemistry",
      category: "Chemistry",
      concepts: [
        "Water Chemistry",
        "Air Chemistry",
        "Soil Chemistry",
        "Pollutants",
        "Green Chemistry",
      ],
    }),
    createSubject({
      code: "PHY",
      name: "Engineering Physics",
      category: "Science",
      concepts: [
        "Optics",
        "Quantum Physics",
        "Lasers",
        "Semiconductors",
        "Radiation",
      ],
    }),
  ],

  first2: [
    createSubject({
      code: "MATH2",
      name: "Engineering Mathematics II",
      category: "Mathematics",
      concepts: [
        "Partial Differentiation",
        "Multiple Integrals",
        "Fourier Series",
        "Laplace Transform",
        "Probability",
      ],
    }),
    createSubject({
      code: "ECOLOGY",
      name: "Ecology and Biodiversity",
      category: "Environment",
      concepts: [
        "Ecosystems",
        "Biodiversity",
        "Food Chains",
        "Conservation",
        "Ecological Balance",
      ],
    }),
    createSubject({
      code: "GEO",
      name: "Environmental Geology",
      category: "Environment",
      concepts: [
        "Rocks",
        "Soil",
        "Groundwater",
        "Geological Hazards",
        "Resources",
      ],
    }),
  ],

  second1: [
    createSubject({
      code: "WATER",
      name: "Water and Wastewater Engineering",
      category: "Environment",
      concepts: [
        "Water Quality",
        "Water Treatment",
        "Wastewater",
        "Biological Treatment",
        "Sludge",
      ],
    }),
    createSubject({
      code: "AIR",
      name: "Air Pollution Control",
      category: "Environment",
      concepts: [
        "Air Pollutants",
        "AQI",
        "Emission Sources",
        "Control Devices",
        "Monitoring",
      ],
    }),
    createSubject({
      code: "SOLID",
      name: "Solid Waste Management",
      category: "Environment",
      concepts: [
        "Waste Generation",
        "Segregation",
        "Recycling",
        "Composting",
        "Waste to Energy",
      ],
    }),
  ],

  second2: [
    createSubject({
      code: "HYDRO",
      name: "Hydrology",
      category: "Water",
      concepts: [
        "Water Cycle",
        "Rainfall",
        "Runoff",
        "Groundwater",
        "Floods",
      ],
    }),
    createSubject({
      code: "RWH",
      name: "Rainwater Harvesting",
      category: "Sustainability",
      concepts: [
        "Rainwater Collection",
        "Recharge",
        "Storage",
        "Water Conservation",
        "Groundwater Management",
      ],
    }),
    createSubject({
      code: "GIS",
      name: "Environmental GIS",
      category: "Technology",
      concepts: [
        "GIS",
        "Spatial Data",
        "Remote Sensing",
        "Mapping",
        "Environmental Analysis",
      ],
    }),
  ],

  third1: [
    createSubject({
      code: "CLIMATE",
      name: "Climate Change",
      category: "Environment",
      concepts: [
        "Greenhouse Gases",
        "Global Warming",
        "Climate Models",
        "Adaptation",
        "Mitigation",
      ],
    }),
    createSubject({
      code: "SUSTAIN",
      name: "Sustainable Development",
      category: "Sustainability",
      concepts: [
        "Sustainability",
        "Circular Economy",
        "Renewable Energy",
        "Resource Efficiency",
        "SDGs",
      ],
    }),
  ],

  third2: [
    createSubject({
      code: "ENVTECH",
      name: "Advanced Environmental Technology",
      category: "Environment",
      concepts: [
        "Advanced Treatment",
        "Membrane Technology",
        "Bioremediation",
        "Waste Recovery",
        "Pollution Control",
      ],
    }),
    createSubject({
      code: "PROJECT",
      name: "Environmental Engineering Project",
      category: "Project",
      concepts: [
        "Problem Definition",
        "Data Collection",
        "Analysis",
        "Solution Design",
        "Evaluation",
      ],
    }),
  ],

  final1: [
    createSubject({
      code: "ENVPLANNING",
      name: "Environmental Planning",
      category: "Environment",
      concepts: [
        "EIA",
        "Environmental Management",
        "Sustainability",
        "Risk Assessment",
        "Policy",
      ],
    }),
  ],

  final2: [
    createSubject({
      code: "CAPSTONE",
      name: "Environmental Capstone",
      category: "Project",
      concepts: [
        "Problem Analysis",
        "Environmental Assessment",
        "Solution Design",
        "Implementation",
        "Evaluation",
      ],
    }),
  ],
});


// =========================================================
// CURRICULUM MAP
// =========================================================

const CURRICULUM = {

  "Computer Engineering":
    COMPUTER_ENGINEERING,

  "AI & Machine Learning":
    AI_ML,

  "AI & Data Science":
    AI_DATA_SCIENCE,

  "Information Technology":
    INFORMATION_TECHNOLOGY,

  "Electrical Engineering":
    ELECTRICAL_ENGINEERING,

  "E&TC Engineering":
    ENTC_ENGINEERING,

  "Mechanical Engineering":
    MECHANICAL_ENGINEERING,

  "Civil Engineering":
    CIVIL_ENGINEERING,

  "Chemical Engineering":
    CHEMICAL_ENGINEERING,

  "Biomedical Engineering":
    BIOMEDICAL_ENGINEERING,

  "Robotics & Automation":
    ROBOTICS_AUTOMATION,

  "Automobile Engineering":
    AUTOMOBILE_ENGINEERING,

  "Production Engineering":
    PRODUCTION_ENGINEERING,

  "Environmental Engineering":
    ENVIRONMENTAL_ENGINEERING,
};


// =========================================================
// NORMALIZATION HELPERS
// =========================================================

function normalizeBranch(branch) {
  if (!branch) {
    return "";
  }

  if (typeof branch === "string") {
    return branch;
  }

  return (
    branch.name ||
    branch.label ||
    branch.id ||
    ""
  );
}

function normalizeYear(year) {
  if (!year) {
    return "";
  }

  if (typeof year === "string") {
    return year;
  }

  return (
    year.name ||
    year.label ||
    year.id ||
    ""
  );
}

function normalizeSemester(semester) {
  if (!semester) {
    return "";
  }

  if (typeof semester === "string") {
    return semester;
  }

  return (
    semester.name ||
    semester.label ||
    semester.id ||
    ""
  );
}


// =========================================================
// HELPER FUNCTIONS
// =========================================================

export function getSubjects(
  branch,
  year,
  semester
) {
  const branchName =
    normalizeBranch(branch);

  const yearName =
    normalizeYear(year);

  const semesterName =
    normalizeSemester(semester);

  const branchData =
    CURRICULUM?.[branchName];

  if (!branchData) {
    return [];
  }

  const yearData =
    branchData?.[yearName];

  if (!yearData) {
    return [];
  }

  // Normal semester lookup
  if (Array.isArray(
    yearData?.[semesterName]
  )) {
    return yearData[semesterName];
  }

  // Support semester labels such as
  // "1", "2", "3", etc.
  const numericSemester =
    String(semesterName)
      .replace(/[^0-9]/g, "");

  const semesterMap = {
    "1": "Semester 1",
    "2": "Semester 2",
    "3": "Semester 1",
    "4": "Semester 2",
    "5": "Semester 1",
    "6": "Semester 2",
    "7": "Semester 1",
    "8": "Semester 2",
  };

  const mappedSemester =
    semesterMap[numericSemester];

  if (
    mappedSemester &&
    Array.isArray(
      yearData?.[mappedSemester]
    )
  ) {
    return yearData[mappedSemester];
  }

  return [];
}


export function getSubject(
  branch,
  year,
  semester,
  subjectCode
) {
  const subjects =
    getSubjects(
      branch,
      year,
      semester
    );

  if (!subjectCode) {
    return null;
  }

  if (
    typeof subjectCode === "object"
  ) {
    subjectCode =
      subjectCode.code ||
      subjectCode.id ||
      subjectCode.value;
  }

  return (
    subjects.find(
      (subject) =>
        subject.code === subjectCode ||
        subject.id === subjectCode
    ) || null
  );
}


export function getConcepts(
  branch,
  year,
  semester,
  subjectCode
) {
  const selectedSubject =
    getSubject(
      branch,
      year,
      semester,
      subjectCode
    );

  return (
    selectedSubject?.concepts || []
  );
}


export function getQuestions(
  branch,
  year,
  semester,
  subjectCode
) {
  const selectedSubject =
    getSubject(
      branch,
      year,
      semester,
      subjectCode
    );

  if (!selectedSubject) {
    return [];
  }

  return Object.values(
    selectedSubject.questions || {}
  ).flat();
}


export function getPrerequisites(
  branch,
  year,
  semester,
  subjectCode,
  concept
) {
  const selectedSubject =
    getSubject(
      branch,
      year,
      semester,
      subjectCode
    );

  const prerequisites =
    selectedSubject
      ?.prerequisites
      ?.[
        concept
      ];

  return Array.isArray(
    prerequisites
  )
    ? prerequisites
    : [];
}


export function getCurriculum(
  branch
) {
  const branchName =
    normalizeBranch(branch);

  return (
    CURRICULUM?.[branchName] ||
    null
  );
}


export function getConcept(
  branch,
  year,
  semester,
  subjectCode,
  concept
) {
  const concepts =
    getConcepts(
      branch,
      year,
      semester,
      subjectCode
    );

  return concepts.includes(concept)
    ? concept
    : null;
}


export function getQuestionCount(
  branch,
  year,
  semester,
  subjectCode
) {
  return getQuestions(
    branch,
    year,
    semester,
    subjectCode
  ).length;
}


export default CURRICULUM;