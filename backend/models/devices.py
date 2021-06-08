from models import conexion
from datetime import timedelta, date, datetime


class device:
    def __init__(self):
        self.id = 0
        self.enviroment = 0
        self.client = 0
        self.user = 0
        self.device = ''
        self.model = ''
        self.brand = ''
        self.serial = ''
        self.accessories = ''
        self.condition = ''
        self.work_to_do = ''
        self.status = 0     
        self.failure =''
        self.diagnosis =''
        self.solution =''


    def count_device(self):
        data = {}
        data['device'] = []
        result = conexion.search('select status, count(*) as amount from devices where environment = %s  group by status',[self.enviroment])
        if(result):
            for i in result:
                data['device'].append({"status":i[0],'amount':i[1]})
            return data['device']
        return None

    def add_device(self):
        now = datetime.now()
        cmm = conexion.Add("insert into devices (client,environment,user,type,model,brand,serial,accessories,conditions,work_to_do,status,admission_date) values (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)", [self.client,self.enviroment,self.user,self.device,self.model,self.brand,self.serial,self.accessories,self.condition,self.work_to_do,1,now])
        if cmm:
            return 'Ok'
    
    def delete(self):
        cmm = conexion.Add("delete from devices where id = %s and environment = %s",[self.id, self.enviroment])
        if cmm:
            return 'Ok'
    
    def more_info_device(self):
        data = {}
        data['device'] = []
        cmm = conexion.search('select d.brand,d.model,d.type,d.accessories,d.conditions,d.work_to_do,d.admission_date,u.name,c.name, c.surname, c.phone, c.email from users u, devices d,  clients c where d.user = u.id and d.client = c.identification and d.id = %s and d.environment = %s',[self.id,self.enviroment])
        if(cmm):
            for i in cmm:
                data['device'].append({'brand':i[0],'model':i[1],'type':i[2],'accessories':i[3],'conditions':i[4],'work_to_do':i[5] ,'admission_date':format(i[6]),'user':i[7],'c_name':i[8],'c_surname':i[9],'c_phone':i[10],'c_email':i[11]})
            return data['device']
        return None

            
    def show_device(self):
        data = {}
        data['device'] = []
        cmm = conexion.search("select d.id, d.brand,d.model,d.type,d.admission_date,u.name,c.name from users u, devices d,  clients c where d.user = u.id and d.client = c.identification and  d.environment =  %s and status = %s  order by d.admission_date asc",[self.enviroment,self.status])
        if(cmm):
            for i in cmm:
                data['device'].append({'id':i[0],'brand':i[1],'model':i[2],'type':i[3],'admission_date': format(i[4]),'user':i[5],'customer_name':i[6]})
            return data['device']
        else:
            return None

    def get_device(self):
        data = {}
        data['device'] = []
        cmm = conexion.search('select type, model, brand, serial, accessories, conditions, work_to_do from devices where id = %s',[self.id])
        if(cmm):
            for i in cmm:
                data['device'].append({'type':i[0],'model':i[1],'brand':i[2],'serial':i[3],'accessories':i[4],'conditions':i[5],'work_to_do':i[6]})
            return data['device']
        return None

    def edit_device(self):
        cmm = conexion.Add('update devices set type = %s, model = %s, brand = %s, serial = %s, accessories = %s, conditions = %s, work_to_do = %s where id = %s',[self.device,self.model,self.brand,self.serial,self.accessories,self.condition,self.work_to_do,self.id])
        if(cmm):
            return cmm
        else:
            return None

    def change_status(self):
        now = datetime.now()
        cmm = conexion.Add("update devices set status = %s, start_process = %s, process_start_date = %s  where id = %s and environment = %s", [self.status,self.user,now,self.id,self.enviroment])
        if cmm:
            return 'Ok'
    
    def device_show_progress(self):
        data = {}
        data['device'] = []
        cmm = conexion.search('select d.id, d.brand,d.model,d.type,d.process_start_date,u.name from users u, devices d where d.start_process = u.id and  d.environment =  %s and status = %s',[self.enviroment,self.status])
        if(cmm):
            for i in cmm:
                data['device'].append({'id':i[0],'brand':i[1],'model':i[2],'type':i[3],'process_start_date':format(i[4]),'start_process':i[5]})
            return data['device']
        return None
    
    def more_info_in_progress(self):
        data = {}
        data['device'] = []
        cmm = conexion.search('select d.brand,d.model,d.type,d.accessories,d.conditions,d.work_to_do,d.admission_date,u.name,c.name, c.surname, c.phone, c.email, d.failure, d.diagnosis, d.solution from users u, devices d,  clients c where d.user = u.id and d.client = c.identification and d.id = %s and d.environment = %s',[self.id,self.enviroment])
        if(cmm):
            for i in cmm:
                data['device'].append({'brand':i[0],'model':i[1],'type':i[2],'accessories':i[3],'conditions':i[4],'work_to_do':i[5] ,'admission_date':format(i[6]),'user':i[7],'c_name':i[8],'c_surname':i[9],'c_phone':i[10],'c_email':i[11],'failure':i[12],'diagnosis':i[13],'solution':i[14]})
            return data['device']
        return None
    
    def get_data_my_dashboard(self):
        data = {}
        data['device'] = []
        cmm = conexion.search('select id, type, model, brand, process_start_date from devices where user = %s and environment = %s and status = %s',[self.user,self.enviroment,self.status])
        if(cmm):
            for i in cmm:
                data['device'].append({'id':i[0],'type':i[1],'model':i[2],'brand':i[3],'process_start_date':format(i[4])})
            return data['device']
        return None

 #---------------------------------------

    def get_info_repair(self):
        data={}
        data['repair'] = []
        cmm = conexion.search("select id,environment,failure,diagnosis,solution from devices where (id = %s and environment = %s)", [self.id,self.enviroment])
        if(cmm):
            for i in cmm:
                data['repair'].append({'id':i[0],'environment':i[1],'failure':i[2],'diagnosis':i[3],'solution':i[4]})
            return data['repair']
        return None

    def save_info_repair(self):
        cmm = conexion.Add("update devices set failure = %s, diagnosis = %s, solution = %s where (id = %s and environment = %s)",[self.failure,self.diagnosis,self.solution,self.id,self.enviroment])
        if cmm:
            return 'Ok'

    def check_repair(self):
        now = datetime.now()
        cmm = conexion.search("select failure,diagnosis,solution from devices where (id = %s and environment = %s)", [self.id,self.enviroment])
        if(self.status == 3):
            if(cmm[0][0] != None and cmm[0][1] != None and cmm[0][2] != None):
                if((len(cmm[0][0]) != 0) and (len(cmm[0][1]) != 0) and (len(cmm[0][2]) != 0)):
                    cod = conexion.Add("update devices set status = %s,finish_date = %s where (id = %s and environment = %s)", [self.status,now,self.id,self.enviroment])
                    return "success"
                else:
                    return 'error3'
            else:
                return 'error3'
    
    def client_info_device(self):
        data={}
        data['info'] = []
        consult = conexion.search("select d.failure, d.diagnosis, d.solution, d.process_start_date, d.finish_date, d.departure_date, u.name from devices d, users u where d.start_process = u.id and d.id = %s and d.environment = %s",[self.id, self.enviroment])
        if(consult):
            for i in consult:
                data['info'].append({'failure':i[0],'diagnosis':i[1],'solution':i[2],'process_start_date':format(i[3]),'finish_date':format(i[4]),'departure_date':format(i[5]),'name':i[6]})
            return data['info']
        else:
            return None
    
    def show_devices_finished(self):
        data={}
        data['finished'] = []
        consult = conexion.search("select d.id, d.client, d.type, d.model, d.brand, d.finish_date, u.name from devices d, users u where d.start_process = u.id and d.environment = %s and d.status= %s",[self.enviroment,self.status])
        if(consult):
            for i in consult:
                data['finished'].append({'id':i[0],'client':i[1],'type':i[2],'model':i[3],'brand':i[4],'finish_date':format(i[5]),'name':i[6]})
            return data['finished']
        else:
            return None

    def remove_sevice(self):
        now = datetime.now()
        cmm = conexion.Add("update devices set status = %s , departure_date = %s where (id = %s and environment = %s)", [self.status,now,self.id,self.enviroment])
        if cmm:
            return 'Ok'