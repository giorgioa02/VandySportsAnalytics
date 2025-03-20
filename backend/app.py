from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow frontend to communicate with backend

# Dummy endpoint to return sample game data
@app.route('/api/games', methods=['GET'])
def get_games():
    sample_data = [
        {"id": 1, "team": "Vanderbilt", "opponent": "Tennessee", "score": "9999-14", "date": "2024-03-15"},
        {"id": 2, "team": "Vanderbilt", "opponent": "Alabama", "score": "10-35", "date": "2024-03-22"}
    ]
    return jsonify(sample_data)

if __name__ == '__main__':
    app.run(debug=True)

