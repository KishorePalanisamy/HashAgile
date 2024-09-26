from flask import Flask, request, jsonify
from flask_cors import CORS 
from neo4j import GraphDatabase

app = Flask(__name__)
CORS(app)  

uri = "neo4j+s://905b1f70.databases.neo4j.io:7687" 
user = "neo4j"
password = "BoCDzL6VtonQCEaDcsXKIYYYesHL-3uWWriY05PEVsQ"  # Make sure this is correct
driver = GraphDatabase.driver(uri, auth=(user, password))

@app.route('/api/candidates', methods=['POST'])
def create_candidate():
    data = request.json
    name = data['name']
    college = data['college']
    year_of_passout = data['yearOfPassout']
    degree = data['degree']
    skills = data['skills']

    with driver.session() as session:
        session.run("""
            MERGE (n:Name {name: $name})
            MERGE (co:College {name: $college})
            MERGE (y:YearOfPassout {year: $year_of_passout})
            MERGE (d:Degree {name: $degree})
            MERGE (s:Skills {name: $skills})

            MERGE (n)-[:STUDIED_AT]->(co)
            MERGE (n)-[:PASSED_OUT]->(y)
            MERGE (n)-[:HAS_DEGREE]->(d)
            MERGE (n)-[:HAS_SKILL]->(s)
        """, name=name, college=college, year_of_passout=year_of_passout, degree=degree, skills=skills)

    return jsonify({"message": "Candidate created successfully!"}), 201

@app.route('/api/test', methods=['GET'])
def test():
    return jsonify({"message": "Server is running!"})

@app.route('/')
def index():
    return "Welcome to the Flask API", 200

@app.route('/api/candidates', methods=['GET'])
def get_candidates():
    with driver.session() as session:
        result = session.run("""
            MATCH (n:Name)-[:STUDIED_AT]->(co:College),
                  (n)-[:PASSED_OUT]->(y:YearOfPassout),
                  (n)-[:HAS_DEGREE]->(d:Degree),
                  (n)-[:HAS_SKILL]->(s:Skills)
            RETURN n.name AS name, 
                   co.name AS college, 
                   y.year AS yearOfPassout, 
                   d.name AS degree, 
                   COLLECT(s.name) AS skills
        """)
        candidates = []
        for record in result:
            candidates.append({
                "name": record["name"],                # Name from the Name node
                "college": record["college"],          # College from the College node
                "yearOfPassout": record["yearOfPassout"],  # Year of Passout from YearOfPassout node
                "degree": record["degree"],            # Degree from the Degree node
                "skills": record["skills"]             # Skills from Skills nodes
            })

    return jsonify(candidates), 200


if __name__ == '__main__':
    app.run(debug=True)
