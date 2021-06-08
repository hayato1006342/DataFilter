from flask.views import MethodView
from flask import jsonify, request
from models.devices import device
import bcrypt
import jwt
from config import KEY_TOKEN_AUTH
import datetime
import time


class CountDevice(MethodView):
    def post(self):
        dev = device()
        content = request.get_json()
        dev.enviroment = content.get('environment')
        anwer = dev.count_device()
        if(anwer):
            return jsonify(anwer), 200
        return jsonify(0), 200


class showpending(MethodView):
    def post(self):
        dev = device()
        content = request.get_json()
        dev.status = content.get('status')
        dev.enviroment = content.get('environment')
        answer = dev.show_device()
        if(answer):
            return jsonify(answer),200
        else:
            return jsonify(),400 


class createdevice(MethodView):
    def post(self):
        dev = device()
        content = request.get_json()
        dev.enviroment = int(content.get('environment'))
        dev.client = int(content.get('client'))
        dev.user = int(content.get('user'))
        dev.device = content.get('device')
        dev.model = content.get('model')
        dev.brand = content.get('brand')
        dev.serial = content.get('serial')
        dev.accessories = content.get('accessories')
        dev.condition = content.get('condition')
        dev.work_to_do = content.get('work_to_do')
        dev.status = 1
        answer = dev.add_device()
        return jsonify(answer), 200

class deletedevice(MethodView):
    def post(self):
        dev = device() 
        content = request.get_json()
        dev.id = content.get('id_device')
        dev.enviroment = content.get('environment')
        answer = dev.delete()
        return jsonify(answer), 200

class moreInfoDevice(MethodView):
    def post(self):
        dev = device()
        content = request.get_json()
        dev.id = content.get('id_device')
        dev.enviroment = content.get('environment')
        answer = dev.more_info_device()
        if(answer):
            return jsonify(answer), 200
        return jsonify(), 200

class getdevice(MethodView):
    def get(self,id):
        dev = device()
        dev.id = int(id)
        answer = dev.get_device()
        if(answer):
            return jsonify(answer),200
        else:
            return jsonify(),400

class editDevice(MethodView):
    def post(self):
        dev = device()
        content = request.get_json()
        dev.id = int(content.get('id'))
        dev.device = content.get('device')
        dev.model = content.get('model')
        dev.brand = content.get('brand')
        dev.serial = content.get('serial')
        dev.accessories = content.get('accessories')
        dev.condition = content.get('condition')
        dev.work_to_do = content.get('work_to_do')
        anwer = dev.edit_device()
        return jsonify(), 200

class changestatusPending(MethodView):
    def post(self):
        dev = device()
        content = request.get_json()
        print(content)
        dev.id = content.get('id')
        dev.user = content.get('id_user')
        dev.enviroment = content.get('environment')
        dev.status = content.get('status')
        answer = dev.change_status()
        return jsonify(), 200

class showDevicesInProgress(MethodView):
    def post(self):
        dev = device()
        content = request.get_json()
        dev.status = content.get('status')
        dev.enviroment = content.get('environment')
        answer = dev.device_show_progress()
        if(answer):
            return jsonify(answer), 200
        else:
            return jsonify(), 400

class moreInfoDeviceProgress(MethodView):
    def post(self):
        dev = device()
        content = request.get_json()
        dev.id = content.get('id_device')
        dev.enviroment = content.get('environment')
        answer = dev.more_info_in_progress()
        if(answer):
            return jsonify(answer), 200
        return jsonify(), 200


class myDashboardGet(MethodView):
    def post(self):
        dev = device()
        content = request.get_json()
        dev.user = content.get('user')
        dev.status = content.get('status')
        dev.enviroment = content.get('environment')
        answer = dev.get_data_my_dashboard()
        if(answer):
            return jsonify(answer), 200
        return jsonify(), 400


class getInfoRepair(MethodView):
    def post(self):
        dev = device()
        content = request.get_json()
        dev.id = content.get('id_device')
        dev.enviroment = content.get('environment')
        answer = dev.get_info_repair()
        if(answer):
            return jsonify(answer), 200
        return jsonify(), 400


class saveInfoRepair(MethodView):
    def post(self):
        dev = device()
        content = request.get_json()
        dev.id = content.get('id_device')
        dev.enviroment = content.get('environment')
        dev.failure = content.get('failure')
        dev.diagnosis = content.get('diagnosis')
        dev.solution = content.get('solution')
        answer = dev.save_info_repair()
        if(answer):
            return jsonify(answer), 200
        return jsonify(), 400


class changeCheckStaus(MethodView):
    def post(self):
        dev = device()
        content = request.get_json()
        dev.id = content.get('id_device')
        dev.enviroment = content.get('environment')
        dev.status = content.get('status')
        answer = dev.check_repair()
        print(answer)
        if(answer == 'success'):
            return jsonify({'status': dev.status}), 200

        elif(answer == "error3"):
            return jsonify({'status': "error3"}), 200

        else:
            return jsonify(), 400

class ClientInfoDevice(MethodView):
    def post(self):
        dev = device()
        content = request.get_json()
        dev.id = content.get('id')
        dev.enviroment = content.get('enviroment')
        answer = dev.client_info_device()
        if(answer):
            return jsonify(answer), 200
        else:
            return jsonify(), 400

class ShowFinished(MethodView):
    def post(self):
        dev = device()
        content = request.get_json()
        dev.status = content.get('status')
        dev.enviroment = content.get('environment')
        answer = dev.show_devices_finished()
        if(answer):
            return jsonify(answer), 200
        return jsonify(), 400

class removeDevice(MethodView):
    def post(self):
        dev = device()
        content = request.get_json()
        dev.status = content.get('status')
        dev.id = content.get('id_device')
        dev.enviroment = content.get('environment')
        answer = dev.remove_sevice()
        if(answer):
            return jsonify(answer), 200
        return jsonify(), 400