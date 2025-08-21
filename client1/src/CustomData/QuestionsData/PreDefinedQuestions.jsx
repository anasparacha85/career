import { Building, Code, CodeIcon, House, Laptop } from 'lucide-react';
import React, { useState } from 'react';

const PreDefinedQuestions = () => {
  const [predefinedQuestions] = useState([
    // ================= BIM =================
   // ================= BIM =================
{
  category: 'bim',
  title: 'BIM Engineering Templates',
  description: 'BIM subcategories: Architecture, Structure, MEP',
  icon: <Building />,
  questions: [
    { 
      id: 407, 
      category: 'bim', 
      subcategory: 'Architecture Focus', 
      part: 'part 1(MCQs)', 
      set: 'Set 1',
      question: 'Which LOD stage typically includes fabrication-level shop drawings for architectural elements?', 
      options: ['LOD 200', 'LOD 300', 'LOD 400', 'LOD 500'], 
      correct: 'LOD 400', 
      answerType: 'mcq' 
    },
    { 
      id: 408, 
      category: 'bim', 
      subcategory: 'Architecture Focus', 
      part: 'part 1(MCQs)',
      set: 'Set 1',
      question: 'In BIM 360, the “Publish” function means:', 
      options: ['Sending the model by email', 'Printing sheets', 'Making the latest version available to the team', 'Locking the file'], 
      correct: 'Making the latest version available to the team', 
      answerType: 'mcq' 
    },
    { 
      id: 409, 
      category: 'bim', 
      subcategory: 'Architecture Focus', 
      part: 'part 1(MCQs)',
      set: 'Set 1',
      question: 'In a BIM Execution Plan, which section defines responsibilities for model updates?', 
      options: ['Roles & Responsibilities', 'Data Security', 'Level of Effort', 'View Templates'], 
      correct: 'Roles & Responsibilities', 
      answerType: 'mcq' 
    },
    { 
      id: 410, 
      category: 'bim', 
      subcategory: 'Architecture Focus', 
      part: 'part 1(MCQs)',
      set: 'Set 1',
      question: 'What is the advantage of using Revit Worksets in large projects?', 
      options: ['Makes rendering faster', 'Enables multiple team members to work on the same model simultaneously', 'Reduces file size automatically', 'Creates parametric families'], 
      correct: 'Enables multiple team members to work on the same model simultaneously', 
      answerType: 'mcq' 
    },
    { 
      id: 411, 
      category: 'bim', 
      subcategory: 'Architecture Focus', 
      part: 'part 1(MCQs)',
      set: 'Set 1',
      question: 'Which Revit tool is best suited to create repetitive façade panels?', 
      options: ['Sweep', 'Extrusion', 'Curtain Wall System', 'Massing Model'], 
      correct: 'Curtain Wall System', 
      answerType: 'mcq' 
    },
    { 
      id: 412, 
      category: 'bim', 
      subcategory: 'Architecture Focus', 
      part: 'part 1(MCQs)',
      set: 'Set 1',
      question: 'What is the correct file extension for Revit Families?', 
      options: ['.RVT', '.RTE', '.RFA', '.IFC'], 
      correct: '.RFA', 
      answerType: 'mcq' 
    },
    { 
      id: 413, 
      category: 'bim', 
      subcategory: 'Architecture Focus', 
      part: 'part 1(MCQs)',
      set: 'Set 1',
      question: 'ISO 19650 refers to:', 
      options: ['BIM software license', 'International BIM standards for information management', 'Autodesk certification', 'UAE municipal code'], 
      correct: 'International BIM standards for information management', 
      answerType: 'mcq' 
    },
    { 
      id: 414, 
      category: 'bim', 
      subcategory: 'Architecture Focus', 
      part: 'part 1(MCQs)',
      set: 'Set 1',
      question: 'Which Revit feature allows element visibility control per view without changing the model?', 
      options: ['Worksets', 'View Filters', 'Design Options', 'Schedules'], 
      correct: 'View Filters', 
      answerType: 'mcq' 
    },
    { 
      id: 415, 
      category: 'bim', 
      subcategory: 'Architecture Focus', 
      part: 'part 1(MCQs)',
      set: 'Set 1',
      question: 'The main purpose of clash detection is to:', 
      options: ['Improve rendering', 'Identify conflicts between model elements before construction', 'Reduce model size', 'Create presentations'], 
      correct: 'Identify conflicts between model elements before construction', 
      answerType: 'mcq' 
    },
    { 
      id: 401, 
      category: 'bim', 
      subcategory: 'Architecture Focus', 
      part: 'part 2(Practical Revit tasks)',
      set: 'Set 1',
      question: 'Model an LOD 350 façade with curtain walls, mullions, and parametric panels based on provided elevation drawings.', 
      answerType: 'input', 
      inputRequired: ['PDF/JPG elevation drawing', 'Material specifications', 'Panel size and mullion spacing data'],
      questionFile: '/files/questions/task_401_question.pdf',
      correctFile: '/files/correct/task_401_correct.rvt'
    },
    { 
      id: 402, 
      category: 'bim', 
      subcategory: 'Architecture Focus', 
      part: 'part 2(Practical Revit tasks)',
      set: 'Set 1',
      question: 'Create a parametric Revit family for an operable window with adjustable height, width, and material finishes.', 
      answerType: 'input', 
      inputRequired: ['Manufacturer datasheet with dimensions', 'Material finish list'],
      questionFile: '/files/questions/task_402_question.pdf',
      correctFile: '/files/correct/task_402_correct.rvt'
    },
    { 
      id: 403, 
      category: 'bim', 
      subcategory: 'Architecture Focus', 
      part: 'part 2(Practical Revit tasks)',
      set: 'Set 1',
      question: 'Develop a roof plan with multiple slopes and integrate drainage details according to the given design intent.', 
      answerType: 'input', 
      inputRequired: ['Roof slope diagram (PDF/JPG)', 'Drainage layout diagram'],
      questionFile: '/files/questions/task_403_question.pdf',
      correctFile: '/files/correct/task_403_correct.rvt'
    },
    { 
      id: 404, 
      category: 'bim', 
  subcategory: 'Architecture Focus',  
       part: 'part 2(Practical Revit tasks)',
      set: 'Set 1',
      question: 'Produce an architectural section and annotate it with dimensions, material tags, and keynotes as per company standards.', 
      answerType: 'input', 
      inputRequired: ['Provided Revit project file (.RVT) with modeled geometry', 'Annotation style guide'],
      questionFile: '/files/questions/task_404_question.pdf',
      correctFile: '/files/correct/task_404_correct.rvt'
    },
    { 
      id: 405, 
      category: 'bim', 
  subcategory: 'Architecture Focus', 
        part: 'part 2(Practical Revit tasks)',
      set: 'Set 1',
      question: 'Create a BIM 360 Workset for architecture and link MEP & structural models, aligning them using shared coordinates.', 
      answerType: 'input', 
      inputRequired: ['BIM 360 project link with MEP & structural models uploaded', 'Coordinate system reference file'],
      questionFile: '/files/questions/task_405_question.pdf',
      correctFile: '/files/correct/task_405_correct.rvt'
    },
    { 
      id: 406, 
      category: 'bim', 
       subcategory: 'Architecture Focus', 
      part: 'part 2(Practical Revit tasks)',
      set: 'Set 1',
      question: 'Apply phasing in Revit to show existing, demolition, and new construction in a single floor plan view.', 
      answerType: 'input', 
      inputRequired: ['Existing & proposed floor plan drawings', 'Demolition scope document'],
      questionFile: '/files/questions/task_406_question.pdf',
      correctFile: '/files/correct/task_406_correct.rvt'
    },
    // ==== BIM (Architectural Focus) | Set 2 ====

{ 
  id: 420, 
  category: 'bim', 
  subcategory: 'Architecture Focus', 
  part: 'part 1(MCQs)', 
  set: 'Set 2',
  question: 'Which LOD stage typically includes as-built documentation?', 
  options: ['LOD 200', 'LOD 300', 'LOD 400', 'LOD 500'], 
  correct: 'LOD 500', 
  answerType: 'mcq' 
},
{ 
  id: 421, 
  category: 'bim', 
  subcategory: 'Architecture Focus', 
  part: 'part 1(MCQs)', 
  set: 'Set 2',
  question: 'In Revit, which view is best suited for placing room tags?', 
  options: ['3D View', 'Floor Plan View', 'Section View', 'Schedule'], 
  correct: 'Floor Plan View', 
  answerType: 'mcq' 
},
{ 
  id: 422, 
  category: 'bim', 
  subcategory: 'Architecture Focus', 
  part: 'part 1(MCQs)', 
  set: 'Set 2',
  question: 'What is the main benefit of using shared parameters in Revit families?', 
  options: ['Improves rendering speed', 'Allows consistent data across multiple families', 'Reduces file size', 'Automates clash detection'], 
  correct: 'Allows consistent data across multiple families', 
  answerType: 'mcq' 
},
{ 
  id: 423, 
  category: 'bim', 
   subcategory: 'Architecture Focus',  
  part: 'part 1(MCQs)', 
  set: 'Set 2',
  question: 'Which BIM use case focuses on energy performance simulations?', 
  options: ['4D BIM', '5D BIM', 'Sustainability Analysis', 'Clash Detection'], 
  correct: 'Sustainability Analysis', 
  answerType: 'mcq' 
},
{ 
  id:424, 
  category: 'bim', 
  subcategory: 'Architecture Focus', 
    part: 'part 1(MCQs)', 
  set: 'Set 2',
  question: 'In Revit, which tool is used for creating building massing studies?', 
  options: ['Curtain Wall Tool', 'Conceptual Massing Environment', 'Schedules', 'Phasing'], 
  correct: 'Conceptual Massing Environment', 
  answerType: 'mcq' 
},
{ 
  id: 425, 
  category: 'bim', 
  subcategory: 'Architecture Focus', 
  part: 'part 1(MCQs)', 
  set: 'Set 2',
  question: 'Which file format is commonly used to exchange BIM data between software platforms?', 
  options: ['.DWG', '.RVT', '.IFC', '.PDF'], 
  correct: '.IFC', 
  answerType: 'mcq' 
},
{ 
  id: 426, 
  category: 'bim', 
  subcategory: 'Architecture Focus', 
  part: 'part 1(MCQs)', 
  set: 'Set 2',
  question: 'The Revit “Design Options” tool is primarily used for:', 
  options: ['Worksharing setup', 'Creating alternate design schemes', 'View template management', 'Family creation'], 
  correct: 'Creating alternate design schemes', 
  answerType: 'mcq' 
},
{ 
  id: 427, 
  category: 'bim', 
   subcategory: 'Architecture Focus', 
  part: 'part 1(MCQs)', 
  set: 'Set 2',
  question: 'What does COBie stand for in BIM standards?', 
  options: ['Construction Operation Building Information Exchange', 'Computer Optimized BIM Exchange', 'Collaborative BIM Execution', 'Construction Oriented BIM Environment'], 
  correct: 'Construction Operation Building Information Exchange', 
  answerType: 'mcq' 
},
{ 
  id: 428, 
  category: 'bim', 
  subcategory: 'Architecture Focus', 
  part: 'part 1(MCQs)', 
  set: 'Set 2',
  question: 'Which view template property controls the visibility of linked Revit models?', 
  options: ['Detail Level', 'Visibility/Graphics Overrides', 'Phasing', 'Filters'], 
  correct: 'Visibility/Graphics Overrides', 
  answerType: 'mcq' 
},

// ===== Practical Revit Tasks (Set 2) =====

{ 
  id: 429, 
  category: 'bim', 
   subcategory: 'Architecture Focus', 
  part: 'part 2(Practical Revit tasks)', 
  set: 'Set 2',
  question: 'Create a parametric family for a modular partition wall system with adjustable height and finishes.', 
  answerType: 'input', 
  inputRequired: ['Partition wall datasheet', 'Finish schedule'], 
  questionFile: '/files/questions/task_510_question.pdf', 
  correctFile: '/files/correct/task_510_correct.rvt' 
},
{ 
  id:430, 
  category: 'bim', 
   subcategory: 'Architecture Focus', 
  part: 'part 2(Practical Revit tasks)', 
  set: 'Set 2',
  question: 'Generate floor plans and sections for a two-story building based on provided schematic drawings.', 
  answerType: 'input', 
  inputRequired: ['Schematic floor plan PDF', 'Elevation drawings'], 
  questionFile: '/files/questions/task_511_question.pdf', 
  correctFile: '/files/correct/task_511_correct.rvt' 
},
{ 
  id: 431, 
  category: 'bim', 
  subcategory: 'Architecture Focus', 
  part: 'part 2(Practical Revit tasks)', 
  set: 'Set 2',
  question: 'Apply view templates to control the graphic standards for plans, sections, and 3D views.', 
  answerType: 'input', 
  inputRequired: ['Company CAD/BIM standards document'], 
  questionFile: '/files/questions/task_512_question.pdf', 
  correctFile: '/files/correct/task_512_correct.rvt' 
},
{ 
  id: 432, 
  category: 'bim', 
  subcategory: 'Architecture Focus', 
  part: 'part 2(Practical Revit tasks)', 
  set: 'Set 2',
  question: 'Link a structural Revit model into an architectural model and align grids and levels.', 
  answerType: 'input', 
  inputRequired: ['Structural model (.RVT)', 'Grid and level data'], 
  questionFile: '/files/questions/task_513_question.pdf', 
  correctFile: '/files/correct/task_513_correct.rvt' 
},
{ 
  id: 433, 
  category: 'bim', 
  subcategory: 'Architecture Focus', 
  part: 'part 2(Practical Revit tasks)', 
  set: 'Set 2',
  question: 'Model a staircase with custom railing profiles according to the design intent provided.', 
  answerType: 'input', 
  inputRequired: ['Staircase design drawing', 'Railing profile sketch'], 
  questionFile: '/files/questions/task_514_question.pdf', 
  correctFile: '/files/correct/task_514_correct.rvt' 
},
{ 
  id: 434, 
  category: 'bim', 
    subcategory: 'Architecture Focus', 
  part: 'part 2(Practical Revit tasks)', 
  set: 'Set 2',
  question: 'Set up project phasing for an expansion project with existing, demolition, and new construction phases.', 
  answerType: 'input', 
  inputRequired: ['Expansion plan PDF', 'Demolition notes'], 
  questionFile: '/files/questions/task_515_question.pdf', 
  correctFile: '/files/correct/task_515_correct.rvt' 
},


   
     
    // Architecture + Interior – Part A Practical Revit Tasks
        // Architecture + Interior – Part B MCQs
    { 
      id: 508, 
      category: 'bim', 
      subcategory: 'Architecture + Interior', 
      set: 'Set 1',
      part: 'part 1(MCQs)', 
      question: 'In Revit, the “Paint” tool is used for:', 
      options: ['Changing wall thickness', 'Applying a material to a single face of an element', 'Adding patterns to sheets', 'Changing family parameters'], 
      correct: 'Applying a material to a single face of an element', 
      answerType: 'mcq' 
    },
    { 
      id: 509, 
      category: 'bim', 
      set: 'Set 1',
      subcategory: 'Architecture + Interior', 
      part: 'part 1(MCQs)', 
      question: 'Which view type is most useful for interior design detailing?', 
      options: ['3D Section', 'Callout View', 'Floor Plan', 'Site Plan'], 
      correct: 'Callout View', 
      answerType: 'mcq' 
    },
    { 
      id: 510, 
      category: 'bim', 
      set: 'Set 1',
      subcategory: 'Architecture + Interior', 
      part: 'part 1(MCQs)', 
      question: 'In BIM terms, an "LOD 350" model for interiors includes:', 
      options: ['Massing only', 'Detailed geometry with accurate dimensions and connections', 'Fabrication-ready details', 'As-built conditions'], 
      correct: 'Detailed geometry with accurate dimensions and connections', 
      answerType: 'mcq' 
    },
    { 
      id: 511, 
      category: 'bim', 
      set: 'Set 1',
      subcategory: 'Architecture + Interior', 
      part: 'part 1(MCQs)', 
      question: 'What is the purpose of creating Revit Schedules for furniture?', 
      options: ['For clash detection', 'To quantify and list all furniture elements with parameters', 'To reduce file size', 'To create renderings'], 
      correct: 'To quantify and list all furniture elements with parameters', 
      answerType: 'mcq' 
    },
    { 
      id: 512, 
      category: 'bim', 
      set: 'Set 1',
      subcategory: 'Architecture + Interior', 
      part: 'part 1(MCQs)', 
      question: 'Which Revit feature allows creating alternative interior design options within the same model?', 
      options: ['Worksets', 'Design Options', 'Phases', 'Linked Models'], 
      correct: 'Design Options', 
      answerType: 'mcq' 
    },
    { 
      id: 513, 
      category: 'bim', 
      set: 'Set 1',
      subcategory: 'Architecture + Interior', 
      part: 'part 1(MCQs)', 
      question: 'Which lighting family category is used for ceiling lights?', 
      options: ['Furniture', 'Lighting Fixtures', 'Specialty Equipment', 'Electrical Fixtures'], 
      correct: 'Lighting Fixtures', 
      answerType: 'mcq' 
    },
    { 
      id: 514, 
      category: 'bim', 
      set: 'Set 1',
      subcategory: 'Architecture + Interior', 
      part: 'part 1(MCQs)', 
      question: 'In BIM 360, what is “Document Management” used for?', 
      options: ['Rendering projects', 'Storing, organizing, and controlling access to project files', 'Family creation', 'Model coordination'], 
      correct: 'Storing, organizing, and controlling access to project files', 
      answerType: 'mcq' 
    },
    { 
      id: 515, 
      category: 'bim', 
      set: 'Set 1',
      subcategory: 'Architecture + Interior', 
      part: 'part 1(MCQs)', 
      question: 'A BIM Execution Plan should be reviewed:', 
      options: ['Only at the start of the project', 'Regularly throughout the project lifecycle', 'Only after LOD 400 completion', 'Never after approval'], 
      correct: 'Regularly throughout the project lifecycle', 
      answerType: 'mcq' 
    },
    { 
      id: 501, 
      category: 'bim', 
      set: 'Set 1',
      subcategory: 'Architecture + Interior', 
      part: 'part 2(Practical Revit tasks)', 
      question: 'Create a parametric modular kitchen family with adjustable cabinet sizes and material finishes.', 
      answerType: 'input', 
      inputRequired: ['Manufacturer cabinet datasheet', 'Material swatches'],
      questionFile: '/files/questions/task_501_question.pdf',
      correctFile: '/files/correct/task_501_correct.rfa'
    },
    { 
      id: 502, 
      category: 'bim', 
      set: 'Set 1',
      subcategory: 'Architecture + Interior', 
      part: 'part 2(Practical Revit tasks)', 
      question: 'Develop a furniture layout plan using provided blocks, ensuring alignment with architectural walls.', 
      answerType: 'input', 
      inputRequired: ['CAD/DWG floor plan', 'Furniture block library'],
      questionFile: '/files/questions/task_502_question.pdf',
      correctFile: '/files/correct/task_502_correct.rvt'
    },
    { 
      id: 503, 
      category: 'bim', 
      set: 'Set 1',
      subcategory: 'Architecture + Interior', 
      part: 'part 2(Practical Revit tasks)', 
      question: 'Generate a floor material schedule for all rooms, grouped by material type.', 
      answerType: 'input', 
      inputRequired: ['Pre-modeled floor plan with materials applied'],
      questionFile: '/files/questions/task_503_question.pdf',
      correctFile: '/files/correct/task_503_correct.rvt'
    },
    { 
      id: 504, 
      category: 'bim', 
      set: 'Set 1',
      subcategory: 'Architecture + Interior', 
      part: 'part 2(Practical Revit tasks)', 
      question: 'Model a custom ceiling design with recess lighting in a living room.', 
      answerType: 'input', 
      inputRequired: ['Ceiling design sketch', 'Lighting fixture family'],
      questionFile: '/files/questions/task_504_question.pdf',
      correctFile: '/files/correct/task_504_correct.rvt'
    },
    { 
      id: 505, 
      category: 'bim', 
      set: 'Set 1',
      subcategory: 'Architecture + Interior', 
      part: 'part 2(Practical Revit tasks)', 
      question: 'Apply interior finishes using the paint tool for specific wall faces.', 
      answerType: 'input', 
      inputRequired: ['Material list', 'Wall finish schedule'],
      questionFile: '/files/questions/task_505_question.pdf',
      correctFile: '/files/correct/task_505_correct.rvt'
    },
    { 
      id: 506, 
      category: 'bim', 
      set: 'Set 1',
      subcategory: 'Architecture + Interior', 
      part: 'part 2(Practical Revit tasks)', 
      question: 'Place and tag interior furniture with correct family types and schedules.', 
      answerType: 'input', 
      inputRequired: ['Furniture library (RFA files)', 'Tagging standard'],
      questionFile: '/files/questions/task_506_question.pdf',
      correctFile: '/files/correct/task_506_correct.rfa'
    },
    { 
      id: 507, 
      category: 'bim', 
      set: 'Set 1',
      subcategory: 'Architecture + Interior', 
      part: 'part 2(Practical Revit tasks)', 
      question: 'Publish the updated model to BIM 360 with version comments.', 
      answerType: 'input', 
      inputRequired: ['BIM 360 project access', 'Publish guidelines'],
      questionFile: '/files/questions/task_507_question.pdf',
      correctFile: '/files/correct/task_507_correct.rvt'
    },




   
    // Architecture + Landscape – Part A Practical Revit Tasks
    { 
      id: 601, 
      category: 'bim', 
      set: 'Set 1',
      subcategory: 'Architecture + Landscape', 
      part: 'part 2(Practical Revit tasks)', 
      question: 'Model a site topography from provided CAD survey data.', 
      answerType: 'input', 
      inputRequired: ['CAD survey file', 'Site boundary details'],
      questionFile: '/files/questions/task_601_question.pdf',
      correctFile: '/files/correct/task_601_correct.rvt'
    },
    { 
      id: 602, 
      category: 'bim', 
      set: 'Set 1',
      subcategory: 'Architecture + Landscape', 
      part: 'part 2(Practical Revit tasks)', 
      question: 'Place landscape elements (trees, shrubs, benches) from the Revit library with correct spacing.', 
      answerType: 'input', 
      inputRequired: ['Planting schedule', 'RFA families for landscaping'],
      questionFile: '/files/questions/task_602_question.pdf',
      correctFile: '/files/correct/task_602_correct.rfa'
    },
    { 
      id: 603, 
      category: 'bim', 
      set: 'Set 1',
      subcategory: 'Architecture + Landscape', 
      part: 'part 2(Practical Revit tasks)', 
      question: 'Create a parametric pergola family for outdoor seating.', 
      answerType: 'input', 
      inputRequired: ['Pergola design drawing', 'Material specs'],
      questionFile: '/files/questions/task_603_question.pdf',
      correctFile: '/files/correct/task_603_correct.rfa'
    },
    { 
      id: 604, 
      category: 'bim', 
      set: 'Set 1',
      subcategory: 'Architecture + Landscape', 
      part: 'part 2(Practical Revit tasks)', 
      question: 'Generate a site plan showing property lines, hardscape, and planting areas with annotations.', 
      answerType: 'input', 
      inputRequired: ['Site plan CAD', 'Annotation standard'],
      questionFile: '/files/questions/task_604_question.pdf',
      correctFile: '/files/correct/task_604_correct.rvt'
    },
    { 
      id: 605, 
      category: 'bim', 
      set: 'Set 1',
      subcategory: 'Architecture + Landscape', 
      part: 'part 2(Practical Revit tasks)', 
      question: 'Apply material definitions to landscape elements for accurate render output.', 
      answerType: 'input', 
      inputRequired: ['Landscape material list', 'Rendering settings'],
      questionFile: '/files/questions/task_605_question.pdf',
      correctFile: '/files/correct/task_605_correct.rvt'
    },

    // Architecture + Landscape – Part B MCQs
    { 
      id: 606, 
      category: 'bim', 
      set: 'Set 1',
      subcategory: 'Architecture + Landscape', 
      part: 'part 1(MCQs)', 
      question: 'Which Revit tool is used to create sloped surfaces in site modeling?', 
      options: ['Floor Tool', 'Subregion Tool', 'Toposurface Tool', 'Sweep'], 
      correct: 'Subregion Tool', 
      answerType: 'mcq' 
    },
    { 
      id: 607, 
      category: 'bim', 
      set: 'Set 1',
      subcategory: 'Architecture + Landscape', 
      part: 'part 1(MCQs)', 
      question: 'For accurate site design in BIM, what should be imported first?', 
      options: ['Furniture layout', 'Survey CAD file with correct coordinates', 'Interior finishes', 'Landscape families'], 
      correct: 'Survey CAD file with correct coordinates', 
      answerType: 'mcq' 
    },
    { 
      id: 608, 
      category: 'bim', 
      set: 'Set 1',
      subcategory: 'Architecture + Landscape', 
      part: 'part 1(MCQs)', 
      question: 'Which view type is best for representing planting layouts?', 
      options: ['Elevation', 'Site Plan', 'Section View', 'Callout'], 
      correct: 'Site Plan', 
      answerType: 'mcq' 
    },
    { 
      id: 609, 
      category: 'bim', 
      set: 'Set 1',
      subcategory: 'Architecture + Landscape', 
      part: 'part 1(MCQs)', 
      question: 'In Revit, a planting family is always:', 
      options: ['Static geometry', 'Scaleable and can adjust to view scale', 'Hosted to roofs only', 'Non-parametric'], 
      correct: 'Scaleable and can adjust to view scale', 
      answerType: 'mcq' 
    },
    { 
      id: 610, 
      category: 'bim', 
      set: 'Set 1',
      subcategory: 'Architecture + Landscape', 
      part: 'part 1(MCQs)', 
      question: 'The main purpose of a planting schedule is to:', 
      options: ['Create renderings', 'List plant species, sizes, and quantities', 'Improve model performance', 'Reduce file size'], 
      correct: 'List plant species, sizes, and quantities', 
      answerType: 'mcq' 
    },
    { 
      id: 611, 
      category: 'bim', 
      set: 'Set 1',
      subcategory: 'Architecture + Landscape', 
      part: 'part 1(MCQs)', 
      question: 'Which LOD is typically used for tender documentation in landscape BIM?', 
      options: ['LOD 200', 'LOD 300', 'LOD 400', 'LOD 500'], 
      correct: 'LOD 300', 
      answerType: 'mcq' 
    },
    { 
      id: 612, 
      category: 'bim', 
      set: 'Set 1',
      subcategory: 'Architecture + Landscape', 
      part: 'part 1(MCQs)', 
      question: 'What is the main difference between LOD 300 and LOD 400 in landscape design?', 
      options: ['LOD 400 includes fabrication/installation details', 'LOD 300 has no dimensions', 'LOD 400 is conceptual', 'LOD 300 is as-built'], 
      correct: 'LOD 400 includes fabrication/installation details', 
      answerType: 'mcq' 
    },
    { 
      id: 613, 
      category: 'bim', 
      set: 'Set 1',
      subcategory: 'Architecture + Landscape', 
      part: 'part 1(MCQs)', 
      question: 'Which Revit category is used for site furniture?', 
      options: ['Generic Model', 'Site Category', 'Massing', 'Specialty Equipment'], 
      correct: 'Site Category', 
      answerType: 'mcq' 
    },
    { 
      id: 614, 
      category: 'bim', 
      set: 'Set 1',
      subcategory: 'Architecture + Landscape', 
      part: 'part 1(MCQs)', 
      question: 'In BIM 360, “Model Coordination” helps to:', 
      options: ['Apply textures', 'Check for clashes and design issues across disciplines', 'Render the model', 'Archive models'], 
      correct: 'Check for clashes and design issues across disciplines', 
      answerType: 'mcq' 
    },
    { 
      id: 615, 
      category: 'bim', 
      set: 'Set 1',
      subcategory: 'Architecture + Landscape', 
      part: 'part 1(MCQs)', 
      question: 'Which is a best practice for modeling site elements in BIM?', 
      options: ['Use only in-place families', 'Use parametric families for flexibility and data management', 'Always import DWG as 3D', 'Model all planting as generic geometry'], 
      correct: 'Use parametric families for flexibility and data management', 
      answerType: 'mcq' 
    }
  ]
}

    ,
    // ================= MERN =================
    {
      category: 'mern',
      title: 'MERN Stack Development Questions',
      description: 'Subcategories: MongoDB, Express.js, React.js, Node.js',
      icon: <Laptop/>,
      questions: [
        // MongoDB
        { id: 701, category: 'mern', subcategory: 'mongodb', part: 'part 1', question: 'Which type of database is MongoDB?', options: ['Relational', 'NoSQL', 'Graph', 'Time-series'], correct: 'NoSQL', answerType: 'mcq' },
        { id: 702, category: 'mern', subcategory: 'mongodb', part: 'part 2', question: 'Which command is used to view all databases in MongoDB shell?', options: ['show dbs', 'list databases', 'db.show()', 'display dbs'], correct: 'show dbs', answerType: 'mcq' },

        { id: 703, category: 'mern', subcategory: 'mongodb', part: 'part 1', question: 'What is the default port for MongoDB?', options: ['27017', '3306', '8080', '5432'], correct: '27017', answerType: 'mcq' },
        { id: 704, category: 'mern', subcategory: 'mongodb', part: 'part 2', question: 'Which data format is used to store documents in MongoDB?', options: ['JSON', 'XML', 'YAML', 'CSV'], correct: 'JSON', answerType: 'mcq' },

        { id: 705, category: 'mern', subcategory: 'mongodb', part: 'part 1', question: 'Which MongoDB operator is used for pattern matching?', options: ['$regex', '$match', '$like', '$search'], correct: '$regex', answerType: 'mcq' },
        { id: 706, category: 'mern', subcategory: 'mongodb', part: 'part 2', question: 'Which command is used to switch databases in MongoDB?', options: ['use <dbName>', 'switch <dbName>', 'db.change()', 'db.use()'], correct: 'use <dbName>', answerType: 'mcq' },

        // Express.js
        { id: 801, category: 'mern', subcategory: 'express', part: 'part 1', question: 'Which language is Express.js built on?', options: ['Java', 'Python', 'JavaScript', 'Ruby'], correct: 'JavaScript', answerType: 'mcq' },
        { id: 802, category: 'mern', subcategory: 'express', part: 'part 2', question: 'Which Express method is used to define routes for GET requests?', options: ['app.get()', 'app.route()', 'app.fetch()', 'app.http()'], correct: 'app.get()', answerType: 'mcq' },

        { id: 803, category: 'mern', subcategory: 'express', part: 'part 1', question: 'Which middleware parses incoming JSON requests?', options: ['express.json()', 'express.urlencoded()', 'bodyParser.raw()', 'app.json()'], correct: 'express.json()', answerType: 'mcq' },
        { id: 804, category: 'mern', subcategory: 'express', part: 'part 2', question: 'What does `res.send()` do in Express?', options: ['Sends a response to the client', 'Receives a request', 'Closes the server', 'Parses JSON'], correct: 'Sends a response to the client', answerType: 'mcq' },

        { id: 805, category: 'mern', subcategory: 'express', part: 'part 1', question: 'How do you serve static files in Express?', options: ['express.static()', 'express.files()', 'express.public()', 'express.assets()'], correct: 'express.static()', answerType: 'mcq' },
        { id: 806, category: 'mern', subcategory: 'express', part: 'part 2', question: 'Which status code means “Not Found”?', options: ['404', '200', '500', '403'], correct: '404', answerType: 'mcq' },

        // React.js
        { id: 901, category: 'mern', subcategory: 'react', part: 'part 1', question: 'What is JSX in React?', options: ['JavaScript XML', 'Java Syntax Extension', 'JSON Extension', 'Java XML Syntax'], correct: 'JavaScript XML', answerType: 'mcq' },
        { id: 902, category: 'mern', subcategory: 'react', part: 'part 2', question: 'Which hook is used for state management in React?', options: ['useState', 'useEffect', 'useRef', 'useContext'], correct: 'useState', answerType: 'mcq' },

        { id: 903, category: 'mern', subcategory: 'react', part: 'part 1', question: 'Which hook runs after every render?', options: ['useEffect', 'useState', 'useRef', 'useCallback'], correct: 'useEffect', answerType: 'mcq' },
        { id: 904, category: 'mern', subcategory: 'react', part: 'part 2', question: 'What is the default port for React development server?', options: ['3000', '5000', '8000', '4200'], correct: '3000', answerType: 'mcq' },

        { id: 905, category: 'mern', subcategory: 'react', part: 'part 1', question: 'Which method is used to create a new React app?', options: ['npx create-react-app', 'npm new react', 'react init', 'npm create app'], correct: 'npx create-react-app', answerType: 'mcq' },
        { id: 906, category: 'mern', subcategory: 'react', part: 'part 2', question: 'What does `useRef` return in React?', options: ['A mutable ref object', 'A new state', 'A callback', 'A DOM node'], correct: 'A mutable ref object', answerType: 'mcq' },

        // Node.js
        { id: 907, category: 'mern', subcategory: 'node', part: 'part 1', question: 'Which JavaScript engine powers Node.js?', options: ['V8', 'SpiderMonkey', 'Chakra', 'Nashorn'], correct: 'V8', answerType: 'mcq' },
        { id: 908, category: 'mern', subcategory: 'node', part: 'part 2', question: 'Which command runs a Node.js file?', options: ['node fileName', 'npm start', 'node run', 'js run'], correct: 'node fileName', answerType: 'mcq' },

        { id: 909, category: 'mern', subcategory: 'node', part: 'part 1', question: 'Which module is used to create a server in Node.js?', options: ['http', 'fs', 'url', 'path'], correct: 'http', answerType: 'mcq' },
        { id: 910, category: 'mern', subcategory: 'node', part: 'part 2', question: 'Which method is used to read a file in Node.js?', options: ['fs.readFile()', 'fs.loadFile()', 'file.read()', 'fs.getFile()'], correct: 'fs.readFile()', answerType: 'mcq' },

        { id: 911, category: 'mern', subcategory: 'node', part: 'part 1', question: 'What does `npm` stand for?', options: ['Node Package Manager', 'New Project Manager', 'Node Programming Module', 'Network Process Manager'], correct: 'Node Package Manager', answerType: 'mcq' },
        { id: 912, category: 'mern', subcategory: 'node', part: 'part 2', question: 'Which command installs all dependencies from package.json?', options: ['npm install', 'npm run', 'npm update', 'npm start'], correct: 'npm install', answerType: 'mcq' },
      ]
    }
  ]);

  return predefinedQuestions;
};

export default PreDefinedQuestions;
