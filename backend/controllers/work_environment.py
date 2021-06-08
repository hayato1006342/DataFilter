from flask.views import MethodView
from flask import jsonify, request
from bot.send import SendMailToCollaborators
from models.environment import Environment
import bcrypt
import jwt
from config import KEY_TOKEN_AUTH
import datetime


class CreateEnvironment(MethodView):
    def post(self):
        environ = Environment() 
        content = request.get_json()
        print(content)
        environ.name = content.get('name')
        environ.img = content.get('img')
        environ.key_code = content.get('key_code')
        environ.created_by = content.get('created_by')
        answer = environ.create()
        return jsonify(), 200

class ShowEnvironment(MethodView):
    def post(self):
        environ = Environment()
        content = request.get_json()
        environ.id = content.get('id')
        answer = environ.show()
        if(answer):
            return jsonify(answer), 200
        else:
            return jsonify(), 400

class RemoveEnvironment(MethodView):
    def post(self):
        environ = Environment()
        content = request.get_json()
        environ.id = int(content)
        answer = environ.remove()
        return jsonify(), 200

class SearchEnvironment(MethodView):
    def post(self):
        environ = Environment()
        content = request.get_json()
        environ.id = content.get('id')
        environ.name = "%" + content.get('search') + "%"
        answer = environ.search_environment()
        if(answer):
            return jsonify(answer),200
        else:
            return jsonify(),400


class ManageUsers(MethodView):
    def get(self,id):
        environ = Environment()
        environ.id = int(id)
        answer = environ.manega_users_show()
        return jsonify(answer), 200

class ManageUsersRemove(MethodView):
    def post(self):
        environ = Environment()
        content = request.get_json()
        environ.id = content.get('id')
        answer = environ.manega_users_remove()
        print(answer)
        return jsonify(), 200

class JoinByCode(MethodView):
    def post(self):
        environ = Environment()
        content = request.get_json()
        environ.key_code = content.get('key_code')
        environ.id = content.get('id_user')
        answer = environ.manage_user_join_by_Code()
        if(answer == "stError"):
            return jsonify({'status':'stError'}), 200
        else:
            if(answer == "stError101"):
                return jsonify({'status':'stError101'}), 200
            else:
                return jsonify({'status':'good'}),200

class SearchManage(MethodView):
    def post(self):
        environ = Environment()
        content = request.get_json()
        environ.name = '%' + content.get('search') + '%'
        environ.id = content.get('id_environment')
        answer = environ.manage_search()
        if(answer):
            return jsonify(answer), 200
        else:
            return jsonify(), 500

class SendMailCollaborators(MethodView):
    def post(self):
        environ = Environment()
        content = request.get_json()
        users = content.get('users')
        environment = content.get('environment')
        owner = content.get("owner")
        if(users != ['','','']):
            answer = environ.manage_search_email(users)
            if(answer):
                env = environ.manage_consult_environments(environment)
                own = environ.manage_consult_owner(owner)
                for i in answer:
                    SendMailToCollaborators(i,env,own)
                return jsonify({"status":200,'users':answer}), 200
            else:
                return jsonify({"status":100}), 200
        else:
            return jsonify(), 400

class ChangeStatus(MethodView):
    def post(self):
        environ = Environment()
        content = request.get_json()
        environ.id = int(content.get("id"))
        environ.state = int(content.get("state"))
        answer = environ.manage_change_status()
        return jsonify(), 200

# --------------------------- main ---------------------------------------

class Main_bringEnvironmentData(MethodView):
    def post(self):
        main = Environment()
        content = request.get_json()
        main.id = content.get('id_user')
        main.id_environments = content.get('environment')
        answer = main.main_bring_data()
        if(answer):
            return jsonify(answer), 200
        else:
            return jsonify(), 400

class Main_RegisterClient(MethodView):
    def post(self):
        main = Environment()
        content = request.get_json()
        print(content)
        name = content.get('name')
        surname = content.get('surname')
        identification = content.get('identification')
        phone = content.get('phone')
        email = content.get('email')
        address = content.get('address')
        env = int(content.get('environment'))
        answer = main.main_register_client(identification,env,name,surname,email,phone,address)
        return jsonify(), 200

class Main_ConsultClient(MethodView):
    def post(self):
        main = Environment()
        content = request.get_json()
        consult = content.get("consult")
        id_user = content.get("id_user")
        env = int(content.get("environment"))
        answer = main.main_client_consult(consult,id_user,env)
        if(answer):
            return jsonify(answer), 200
        return jsonify(), 400