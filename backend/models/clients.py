from models import conexion

class client:
    def __init__(self):
        self.id = 0 
        self.identification = ''
        self.enviroment = 0 
        self.name =""
        self.surname =""
        self.phone =""
        self.address =""
        self.email =""


    def add_client(self):
        cmm = conexion.Add("insert into Clients (id,enviroment,email,name,surname,phone,address) values (%s,%s,%s,%s,%s,%s,%s)",[self.id,self.enviroment,self.email,self.name,self.surname,self.phone,self.address])
        if cmm:
            return 'Ok'

    def show_clients(self):
        data = {}
        data['clients'] = []
        cmm = conexion.Add("select * from Clients where enviroment = %s",[self.enviroment])
        if(cmm):
            for i in cmm:
                data['clients'].append({'id':i[0],'enviroment':i[1],'email':i[2],'name':i[3],'surname':i[4],'phone':i[5],'address':i[6]})
            return data['clients']
        else:
            return None

    def search_clients(self):
        data = {}
        data['clients'] = []
        cmm = conexion.Add("select * from Clients where (enviroment = %s and id = %s)",[self.enviroment, self.id])
        if(cmm):
            for i in cmm:
                data['clients'].append({'id':i[0],'enviroment':i[1],'email':i[2],'name':i[3],'surname':i[4],'phone':i[5],'address':i[6]})
            return data['clients']
        else:
            return None

    def delete_client(self):
        cmm1 = conexion.Add("delete from devices where (environment = %s and client = %s)",[self.enviroment, self.identification])
        cmm2 = conexion.Add("delete from clients where (enviroment = %s and identification = %s)",[self.enviroment, self.identification])
        if cmm1:
            return 'Ok'

    def show_clients(self):
        data = {}
        data['data'] = []
        cmm = conexion.search("select identification,enviroment,name,surname,email from clients where enviroment = %s",[self.enviroment])
        if(cmm):
            for i in cmm:
                data['data'].append({'identification':i[0],'enviroment':i[1],'name':i[2],'surname':i[3],'email':i[4]})
            
            return data['data']
        else:
            return None

    def search_client(self):
        data = {}
        data['data'] = []
        cmm = conexion.search("select * from clients where (enviroment = %s and identification = %s)",[self.enviroment, self.identification])
        if(cmm):
            for i in cmm:
                data['data'].append({'identification':i[0],'enviroment':i[1],'name':i[2],'surname':i[3],'email':i[4],'phone':i[5],'address':i[6]})
            return data['data']
        else:
            return None

    def edit_client(self):
        cmm= conexion.Add("update clients set name = %s, surname = %s, email = %s, phone = %s, address = %s where (enviroment = %s and identification = %s)", [self.name,self.surname,self.email,self.phone,self.address,self.enviroment, self.identification])
        if cmm:
            return 'Ok'

    def show_history(self):
        data = {}
        data['history'] = []
        cmm = conexion.search("select d.id, d.type, d.model, d.brand, u.name ,d.admission_date,d.status from devices d, users u  where d.user = u.id and d.environment = %s and d.client = %s order by d.admission_date asc",[self.enviroment, self.identification])
        if(cmm):
            for i in cmm:
                data['history'].append({'id':i[0],'type':i[1],'model':i[2],'brand':i[3],'user':i[4],'admission_date':format(i[5]),'status':i[6]})
            return data['history']
        else:
            return None

    #Consult
    def consult_client(self):
        data = {}
        data['consult'] = []
        data['environment'] = []

        cmd = conexion.search("select e.name, e.img, c.identification, c.name , c.surname , u.name , u.surname from clients c , environments e, users u  where c.identification = %s and c.enviroment= e.id and e.created_by = u.id" , [self.identification])
        if(cmd):
            for i in cmd:
                data['environment'].append({'e_name':i[0],'e_img':i[1],'c_identification':i[2],'c_name': i[3],'c_surname':i[4],'u_name':i[5],'u_surname':i[6]})
        else:
            return None

        cmm = conexion.search("select c.identification,d.type,d.brand,d.diagnosis,d.failure,d.solution,d.status from clients c , environments e ,devices d where  c.identification = %s and d.client = c.identification ", [self.identification])
        if(cmm):
            for i in cmm:
                data['consult'].append({'c_identification':i[0],'d_type':i[1],'d_brand':i[2],'d_diagnosis':i[3],'d_failure':i[4],'d_solution':i[5],'d_status':i[6]})
            return data
        else:
            return None


