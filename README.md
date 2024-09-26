# Project Overview
The purpose of this project is to build a web application with a React frontend, a Flask backend, and a Neo4j database. The application will enable users to create and retrieve candidate profiles, including name, college, year of passout, degree, and skills. The application should support adding new candidates, viewing a list of existing candidates, and fetching all records from the Neo4j database.

# Scope
The scope includes Frontend development using React for user interaction , Backend development using Flask to handle API requests and communicate with the Neo4j database , Neo4j database to store candidate-related data with relationships to colleges, degrees, and skills , API integration between React frontend and Flask backend to handle data storage and retrieval from Neo4j.

# Functional Requirements
  # 1) Frontend
  Display a list of candidates, including details such as name, college, year of passout, degree, and skills.
  Allow users to add new candidates via a form.
  Handle errors and loading states gracefully.
  # 2) Backend (Flask API)
  POST /api/candidates: Create a new candidate by accepting name, college, year of passout, degree, and skills.
  GET /api/candidates: Retrieve a list of all candidates stored in the Neo4j database.
  Error Handling: Handle failed requests with appropriate error messages.
  # 3) Database (Neo4j)
  Store candidate data in a graph structure with the Nodes such as Name, College, YearOfPassout, Degree, Skills
  and Relationships including STUDIED_AT , PASSED_OUT , HAS_DEGREE , HAS_SKILL.

# Non-Functional Requirements
  # 1) Performance
  Query optimization to ensure efficient data retrieval from the Neo4j database.
  # 2) Scalability
  The database and backend should be able to scale as the number of candidates grows.
  # 3) Usability
  The interface should be user-friendly and intuitive for HR users with minimal technical experience and appropriate error messages should be displayed in case of missing or incorrect data submissions.
