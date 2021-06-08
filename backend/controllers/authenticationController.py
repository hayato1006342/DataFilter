from flask.views import MethodView
from flask import Flask,jsonify, request
from config import KEY_TOKEN_AUTH
import bcrypt
import jwt

class AuthorizationControllers(MethodView):
    def post(self):
    	return jsonify({"Status": "No ha enviado un token"}), 200

    def get(self):
        if (request.headers.get('Authorization')):
            token = request.headers.get('Authorization').split(" ")
            print("-----------------_", token[1])
            try:
                data = jwt.decode(token[1], KEY_TOKEN_AUTH , algorithms=['HS256'])
                return jsonify({"Status": "Autorizado por token", "emailextraido": data.get("email"), "nombre": data.get("nombre")}), 200
            except:
                return jsonify({"Status": "TOKEN NO VALIDO"}), 403
        return jsonify({"Status": "No ha enviado un token"}), 403