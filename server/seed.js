const mongoose = require("mongoose");
require("dotenv").config();
const Question = require("./models/Question");

const sampleQuestions = [
  // --- ARRAYS ---
  {
    subject: "Data Structures",
    topic: "Arrays",
    concept: "Index Access",
    question: "What is the time complexity to access an element by index in an array?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
    correctAnswer: "O(1)",
    difficulty: "easy"
  },
  {
    subject: "Data Structures",
    topic: "Arrays",
    concept: "Dynamic Resizing",
    question: "What is the amortized time complexity of inserting an element at the end of a dynamic array?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
    correctAnswer: "O(1)",
    difficulty: "medium"
  },
  {
    subject: "Data Structures",
    topic: "Arrays",
    concept: "Prefix Sum / Two Pointers",
    question: "Which algorithm finds the maximum subarray sum in O(n) time?",
    options: ["Kadane's Algorithm", "Floyd's Algorithm", "Dijkstra's Algorithm", "Kruskal's Algorithm"],
    correctAnswer: "Kadane's Algorithm",
    difficulty: "hard"
  },

  // --- LINKED LISTS ---
  {
    subject: "Data Structures",
    topic: "Linked Lists",
    concept: "Node Traversal",
    question: "What is the time complexity to search for an element in a singly linked list of size n?",
    options: ["O(n)", "O(1)", "O(log n)", "O(n^2)"],
    correctAnswer: "O(n)",
    difficulty: "easy"
  },
  {
    subject: "Data Structures",
    topic: "Linked Lists",
    concept: "Cycle Detection",
    question: "Which algorithm detects a cycle in a linked list using two pointers moving at different speeds?",
    options: ["Floyd's Tortoise and Hare", "Kadane's Algorithm", "Binary Search", "Boyer-Moore Voting"],
    correctAnswer: "Floyd's Tortoise and Hare",
    difficulty: "medium"
  },
  {
    subject: "Data Structures",
    topic: "Linked Lists",
    concept: "List Reversal in Groups",
    question: "What is the space complexity of reversing a linked list in k-group iteratively?",
    options: ["O(1)", "O(k)", "O(n)", "O(log n)"],
    correctAnswer: "O(1)",
    difficulty: "hard"
  },

  // --- STACKS & QUEUES ---
  {
    subject: "Data Structures",
    topic: "Stacks & Queues",
    concept: "LIFO vs FIFO",
    question: "Which principle does a standard stack follow?",
    options: ["LIFO (Last In First Out)", "FIFO (First In First Out)", "Priority Based", "Random Order"],
    correctAnswer: "LIFO (Last In First Out)",
    difficulty: "easy"
  },
  {
    subject: "Data Structures",
    topic: "Stacks & Queues",
    concept: "Queue Implementation",
    question: "How many stacks are minimally required to implement a FIFO queue?",
    options: ["2", "1", "3", "4"],
    correctAnswer: "2",
    difficulty: "medium"
  },
  {
    subject: "Data Structures",
    topic: "Stacks & Queues",
    concept: "Monotonic Stack",
    question: "What is the optimal time complexity to find the 'Next Greater Element' for all array elements using a monotonic stack?",
    options: ["O(n)", "O(n^2)", "O(n log n)", "O(log n)"],
    correctAnswer: "O(n)",
    difficulty: "hard"
  },

  // --- TREES ---
  {
    subject: "Data Structures",
    topic: "Trees",
    concept: "Binary Search Tree Property",
    question: "In a valid Binary Search Tree (BST), the left child of a node is always:",
    options: [
      "Smaller than the parent node",
      "Larger than the parent node",
      "Equal to the right child",
      "Always null"
    ],
    correctAnswer: "Smaller than the parent node",
    difficulty: "easy"
  },
  {
    subject: "Data Structures",
    topic: "Trees",
    concept: "Tree Traversal",
    question: "Which traversal of a Binary Search Tree produces values in strictly sorted order?",
    options: ["Inorder", "Preorder", "Postorder", "Level-order"],
    correctAnswer: "Inorder",
    difficulty: "medium"
  },
  {
    subject: "Data Structures",
    topic: "Trees",
    concept: "Self-Balancing Trees",
    question: "What is the maximum allowed balance factor difference between subtrees in an AVL tree?",
    options: ["1", "0", "2", "No limit"],
    correctAnswer: "1",
    difficulty: "hard"
  }
];

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding...");

    // Clear existing questions to avoid duplicates
    await Question.deleteMany({});
    console.log("Cleared old questions.");

    await Question.insertMany(sampleQuestions);
    console.log("✅ Successfully seeded 12 Data Structures questions!");

    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    mongoose.connection.close();
  }
}

seedDB();