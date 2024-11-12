from flask import Flask, request, jsonify
import os

app = Flask(__name__)

@app.route('/save/<string:id>', methods=['POST'])
def save_value(id):
    data = request.get_json()
    
    # Sprawdzenie, czy pole 'value' istnieje i czy jest liczbą
    if 'value' not in data or not isinstance(data['value'], (int, float)):
        return jsonify({"error": "Invalid input: 'value' must be a number."}), 400

    value = data['value']
    file_path = f"{id}.txt"

    # Tryb zapisu – jeżeli plik nie istnieje, zostanie utworzony
    with open(file_path, "a") as file:
        file.write(f"{value}\n")

    # Obliczanie liczby linii w pliku
    with open(file_path, "r") as file:
        line_count = sum(1 for _ in file)

    return jsonify({"line_count": line_count})

if __name__ == '__main__':
    app.run(debug=True)