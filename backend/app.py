from flask import Flask, request, jsonify
from scrapingbee import ScrapingBeeClient

# TODO: reset this key
client = ScrapingBeeClient(api_key='W9M3DRSN277PWESEA9FG87NA7DDHAAQ3NR6RTB444C11IXY3XDK142VVOSFA8IX04SZKW51CKJT4CNRY')

app = Flask(__name__)
app.debug = True # to disable local testing

@app.route("/scholarships", methods=['POST'])
def get_scholarship_data():
    scholarship_url = request.json['url']
    response = client.get(scholarship_url)
    return response.content