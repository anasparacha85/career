import React, { useState } from 'react';

const PreDefinedQuestions = () => {
  const [predefinedQuestions] = useState([
    {
      category: 'mern',
      title: 'MERN Stack Developer Questions',
      description: 'Beginner to advanced questions for MERN stack developers',
      icon: '💻',
      questions: [
        // 5 Beginner
       // 5 Beginner
{ id: 1, category: 'mern', difficulty: 'beginner', question: 'What does MERN stand for?', options: ['MongoDB, Express, React, Node', 'MySQL, Express, React, Node', 'MongoDB, Ember, React, Node', 'MongoDB, Express, Redux, Node'], correct: 'MongoDB, Express, React, Node' },
{ id: 2, category: 'mern', difficulty: 'beginner', question: 'Which database is used in MERN stack by default?', options: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQLite'], correct: 'MongoDB' },
{ id: 3, category: 'mern', difficulty: 'beginner', question: 'Which command is used to start a React application in development mode?', options: ['npm start', 'npm run build', 'node server.js', 'react serve'], correct: 'npm start' },
{ id: 4, category: 'mern', difficulty: 'beginner', question: 'Which HTTP method is used to create new data in REST APIs?', options: ['GET', 'POST', 'PUT', 'DELETE'], correct: 'POST' },
{ id: 5, category: 'mern', difficulty: 'beginner', question: 'Which file typically contains the main configuration for a Node.js project?', options: ['config.json', 'package.json', 'server.js', 'index.html'], correct: 'package.json' },

// 5 Intermediate
{ id: 6, category: 'mern', difficulty: 'intermediate', question: 'What is the default port for MongoDB?', options: ['27017', '8080', '3306', '5000'], correct: '27017' },
{ id: 7, category: 'mern', difficulty: 'intermediate', question: 'Which React hook is used for managing state in functional components?', options: ['useEffect', 'useReducer', 'useState', 'useMemo'], correct: 'useState' },
{ id: 8, category: 'mern', difficulty: 'intermediate', question: 'Which MongoDB method is used to retrieve all documents from a collection?', options: ['find()', 'findOne()', 'get()', 'fetchAll()'], correct: 'find()' },
{ id: 9, category: 'mern', difficulty: 'intermediate', question: 'In Express.js, which method is used to handle middleware for all HTTP methods?', options: ['app.use()', 'app.get()', 'app.post()', 'app.all()'], correct: 'app.use()' },
{ id: 10, category: 'mern', difficulty: 'intermediate', question: 'Which React feature helps prevent unnecessary re-rendering by memoizing components?', options: ['React.memo', 'useEffect', 'useState', 'React.cache'], correct: 'React.memo' },

// 5 Advanced
{ id: 11, category: 'mern', difficulty: 'advanced', question: 'How can you implement server-side rendering (SSR) in a MERN application?', options: ['Using Next.js', 'Using jQuery', 'Using Angular Universal', 'Not Possible'], correct: 'Using Next.js' },
{ id: 12, category: 'mern', difficulty: 'advanced', question: 'Which database indexing strategy improves query performance in MongoDB?', options: ['Indexing', 'Sharding', 'Partitioning', 'Replication'], correct: 'Indexing' },
{ id: 13, category: 'mern', difficulty: 'advanced', question: 'What is the main advantage of using GraphQL over REST in a MERN app?', options: ['Single endpoint for all queries', 'Faster HTTP protocol', 'Automatic UI updates', 'No need for backend'], correct: 'Single endpoint for all queries' },
{ id: 14, category: 'mern', difficulty: 'advanced', question: 'Which Node.js cluster module method allows creating multiple processes?', options: ['cluster.fork()', 'process.spawn()', 'node.fork()', 'thread.create()'], correct: 'cluster.fork()' },
{ id: 15, category: 'mern', difficulty: 'advanced', question: 'Which MongoDB feature allows for distributing data across multiple servers?', options: ['Sharding', 'Indexing', 'Replication', 'Clustering'], correct: 'Sharding' },

      ]
    },
    {
      category: 'bim',
      title: 'BIM Engineering Questions',
      description: 'Comprehensive BIM questions from beginner to advanced',
      icon: '🏗️',
      questions: [
        // 5 Beginner
      // 5 Beginner
{ id: 101, category: 'bim', difficulty: 'beginner', question: 'What does BIM stand for?', options: ['Building Information Modeling', 'Basic Infrastructure Management', 'Building Integration Method', 'Business Information Model'], correct: 'Building Information Modeling' },
{ id: 102, category: 'bim', difficulty: 'beginner', question: 'Which software is most commonly associated with BIM?', options: ['Revit', 'Photoshop', 'Illustrator', 'Excel'], correct: 'Revit' },
{ id: 103, category: 'bim', difficulty: 'beginner', question: 'Which file format is commonly used for BIM data exchange?', options: ['IFC', 'JPEG', 'MP4', 'DOCX'], correct: 'IFC' },
{ id: 104, category: 'bim', difficulty: 'beginner', question: 'Which of these is a key benefit of BIM?', options: ['Better collaboration', 'Slower design process', 'Less accurate models', 'Higher costs'], correct: 'Better collaboration' },
{ id: 105, category: 'bim', difficulty: 'beginner', question: 'Which Autodesk software is primarily used for structural detailing in BIM?', options: ['Revit Structure', 'AutoCAD LT', '3ds Max', 'Photoshop'], correct: 'Revit Structure' },

// 5 Intermediate
{ id: 106, category: 'bim', difficulty: 'intermediate', question: 'What is a federated BIM model?', options: ['A model combining multiple disciplines', 'A model for one trade only', 'A 2D floor plan', 'A cost estimate'], correct: 'A model combining multiple disciplines' },
{ id: 107, category: 'bim', difficulty: 'intermediate', question: 'Which software is commonly used for clash detection in BIM projects?', options: ['Navisworks', 'Excel', 'AutoCAD LT', 'Photoshop'], correct: 'Navisworks' },
{ id: 108, category: 'bim', difficulty: 'intermediate', question: 'What does LOD stand for in BIM?', options: ['Level of Detail', 'List of Documents', 'Length of Design', 'Layout of Data'], correct: 'Level of Detail' },
{ id: 109, category: 'bim', difficulty: 'intermediate', question: 'Which BIM dimension is associated with project scheduling?', options: ['4D', '3D', '5D', '6D'], correct: '4D' },
{ id: 110, category: 'bim', difficulty: 'intermediate', question: 'What is the purpose of COBie in BIM?', options: ['Data exchange for facility management', '3D visualization', 'Rendering', 'Cost estimation'], correct: 'Data exchange for facility management' },

// 5 Advanced
{ id: 111, category: 'bim', difficulty: 'advanced', question: 'Which process ensures model elements meet project standards in BIM?', options: ['Model validation', 'Rendering', 'Clash detection', 'Animation'], correct: 'Model validation' },
{ id: 112, category: 'bim', difficulty: 'advanced', question: 'What is the primary goal of 6D BIM?', options: ['Sustainability and energy analysis', '3D modeling only', 'Scheduling', 'Cost estimation'], correct: 'Sustainability and energy analysis' },
{ id: 113, category: 'bim', difficulty: 'advanced', question: 'Which open-source BIM platform is widely used?', options: ['BIMserver', 'SketchUp', 'Maya', 'Blender'], correct: 'BIMserver' },
{ id: 114, category: 'bim', difficulty: 'advanced', question: 'What does "clash avoidance" mean in BIM projects?', options: ['Designing to prevent future clashes', 'Detecting clashes after modeling', 'Avoiding deadlines', 'Minimizing file size'], correct: 'Designing to prevent future clashes' },
{ id: 115, category: 'bim', difficulty: 'advanced', question: 'Which process in BIM is used to evaluate building performance over time?', options: ['Post-occupancy evaluation', 'LOD analysis', 'Federated modeling', 'Coordination'], correct: 'Post-occupancy evaluation' },

      ]
    },
    {
      category: 'java',
      title: 'Java Developer Questions',
      description: 'Java developer interview questions from beginner to advanced',
      icon: '☕',
      questions: [
        // 5 Beginner
       // 5 Beginner
{ id: 201, category: 'java', difficulty: 'beginner', question: 'Which keyword is used to define a class in Java?', options: ['class', 'Class', 'struct', 'define'], correct: 'class' },
{ id: 202, category: 'java', difficulty: 'beginner', question: 'Which method is the entry point of any Java program?', options: ['main()', 'start()', 'run()', 'execute()'], correct: 'main()' },
{ id: 203, category: 'java', difficulty: 'beginner', question: 'Which of these is not a Java primitive data type?', options: ['int', 'String', 'boolean', 'char'], correct: 'String' },
{ id: 204, category: 'java', difficulty: 'beginner', question: 'Which operator is used for comparison in Java?', options: ['==', '=', '!=', 'equals'], correct: '==' },
{ id: 205, category: 'java', difficulty: 'beginner', question: 'What does JVM stand for?', options: ['Java Virtual Machine', 'Java Variable Method', 'Java Visual Model', 'Java Version Manager'], correct: 'Java Virtual Machine' },

// 5 Intermediate
{ id: 206, category: 'java', difficulty: 'intermediate', question: 'Which collection class allows only unique elements in Java?', options: ['Set', 'List', 'Queue', 'Map'], correct: 'Set' },
{ id: 207, category: 'java', difficulty: 'intermediate', question: 'What is method overloading in Java?', options: ['Two methods with the same name but different parameters', 'Two methods with same name and same parameters', 'A method calling itself', 'A method with no return type'], correct: 'Two methods with the same name but different parameters' },
{ id: 208, category: 'java', difficulty: 'intermediate', question: 'Which keyword is used to inherit a class in Java?', options: ['extends', 'implements', 'inherit', 'super'], correct: 'extends' },
{ id: 209, category: 'java', difficulty: 'intermediate', question: 'Which interface is used for sorting in Java?', options: ['Comparable', 'Serializable', 'Cloneable', 'Iterable'], correct: 'Comparable' },
{ id: 210, category: 'java', difficulty: 'intermediate', question: 'Which Java concept is achieved using interfaces?', options: ['Multiple Inheritance', 'Single Inheritance', 'Encapsulation', 'Polymorphism'], correct: 'Multiple Inheritance' },

// 5 Advanced
{ id: 211, category: 'java', difficulty: 'advanced', question: 'What is the purpose of the transient keyword in Java?', options: ['Exclude a field from serialization', 'Make a variable constant', 'Synchronize access to a variable', 'Make a variable volatile'], correct: 'Exclude a field from serialization' },
{ id: 212, category: 'java', difficulty: 'advanced', question: 'Which garbage collection algorithm is default in Java 11?', options: ['G1 Garbage Collector', 'CMS Collector', 'Parallel GC', 'Serial GC'], correct: 'G1 Garbage Collector' },
{ id: 213, category: 'java', difficulty: 'advanced', question: 'What is a functional interface in Java?', options: ['An interface with exactly one abstract method', 'An interface with only static methods', 'An interface with no methods', 'An interface with multiple default methods'], correct: 'An interface with exactly one abstract method' },
{ id: 214, category: 'java', difficulty: 'advanced', question: 'Which Java feature allows defining behavior at runtime?', options: ['Reflection', 'Serialization', 'JVM Tuning', 'Generics'], correct: 'Reflection' },
{ id: 215, category: 'java', difficulty: 'advanced', question: 'What is the difference between volatile and synchronized in Java?', options: ['volatile ensures visibility, synchronized ensures visibility + atomicity', 'Both are same', 'volatile is for methods only, synchronized is for variables only', 'volatile is faster than synchronized in all cases'], correct: 'volatile ensures visibility, synchronized ensures visibility + atomicity' },

      ]
    }
  ]);

  return predefinedQuestions;
};

export default PreDefinedQuestions;
