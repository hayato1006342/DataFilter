from flask.views import MethodView
from flask import jsonify, request
from models.clients import client


class createclient(MethodView):
    def post(self):
        cl = client()
        content = request.get_json()
        cl.id = int(content.get('id'))
        cl.enviroment = int(content.get('enviroment'))
        cl.name = content.get('name')
        cl.surname = content.get('surname')
        cl.phone = content.get('phone')
        cl.address = content.get('address')
        cl.email = content.get('email')
        answer = cl.add_client()
        return jsonify(answer), 200


    def get(self):
        cl = client()
        content = request.get_json()
        cl.enviroment = content.get('enviroment')
        answer = cl.show_clients()
        if(answer):
            return jsonify(answer),200
        else:
            return jsonify(),400 

class searchclient(MethodView):
    def get(self):
        cl = client()
        content = request.get_json()
        cl.id = int(content.get('id'))
        cl.enviroment = int(content.get('enviroment'))
        answer = cl.search_clients()
        if(answer):
            return jsonify(answer),200
        else:
            return jsonify(),400 

class deleteclient(MethodView):
    def post(self):
        cl = client()
        content = request.get_json()
        print(content)
        cl.enviroment = int(content.get('enviroment'))
        cl.identification = content.get('identification')
        answer = cl.delete_client()
        return jsonify(answer), 200

class showClients(MethodView):
    def post(self):
        cl = client()
        content = request.get_json()
        cl.enviroment = int(content.get('enviroment'))
        answer = cl.show_clients()
        return jsonify(answer), 200


class searchClient(MethodView):
    def post(self):
        cl = client()
        content = request.get_json()
        cl.enviroment = int(content.get('enviroment'))
        cl.identification = content.get('identification')
        answer = cl.search_client()
        return jsonify(answer), 200

class editclient(MethodView):
    def post(self):
        cl = client()
        content = request.get_json()
        cl.name = content.get('name')
        cl.surname = content.get('surname')
        cl.email = content.get('email')
        cl.phone = content.get('phone')
        cl.address = content.get('address')
        cl.enviroment = int(content.get('enviroment'))
        cl.identification = content.get('identification')
        answer = cl.edit_client()
        return jsonify(answer), 200


class showHistory(MethodView):
    def post(self):
        cl = client()
        content = request.get_json()
        cl.enviroment = int(content.get('enviroment'))
        cl.identification = content.get('identification')
        answer = cl.show_history()
        if(answer):
            return jsonify(answer), 200
        else:
            return jsonify(), 400


class consultClient(MethodView):
    def post(self):
        cl = client()
        content = request.get_json()
        cl.identification = content.get('identification')
        answer = cl.consult_client()
        if(answer):
            return jsonify(answer), 200
        else:
            return jsonify(), 400
    


