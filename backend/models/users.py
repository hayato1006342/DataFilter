from models import conexion
from datetime import timedelta, date, datetime

class users:

    def __init__(self):
        self.id = 0
        self.name = ''
        self.surname = ''
        self.img = ''
        self.email =''
        self.password = ''
        self.activated = 0
        self.code = ''
        self.env = 0

    def create_user(self):
        respuesta = conexion.Add("insert into users (name,surname,email,password,img,activated,code) values (%s,%s,%s,%s,%s,%s,%s);",[self.name,self.surname,self.email,self.password,"https://firebasestorage.googleapis.com/v0/b/datafilter-32b92.appspot.com/o/profile%2Fpngegg.png?alt=media&token=3f31a154-ef66-487c-abfd-962b3c349e88",0,self.code])

    def get_user(self):
        respuesta = conexion.search("select * from users where email = %s ",[self.email])
        if(respuesta):
            return respuesta
        else:
            return None
    
    def activated_account(self):
        respuesta = conexion.Add('update users set activated = %s where code = %s',[self.activated, self.code])
    

    def send_email_recover(self):
        respuesta = conexion.search('select name,email from users where email = %s',[self.email])
        if respuesta:
            for i in respuesta:
                now = datetime.now() + timedelta(hours=24)
                resp = conexion.Add('update users set code=%s, recovery_date= %s where email = %s',[self.code,now,self.email])
                return i[0]
        else:
            return None
    
    def check_code(self):
        respuesta = conexion.search('select code, recovery_date from users where code = %s',[self.code])
        if respuesta:
            for i in respuesta:
                now = datetime.now()
                if now.strftime('%Y %m %d %H %M %S') > i[1].strftime('%Y %m %d %H %M %S'):
                    return 'invalid'
                else:
                    return 'valid'
        else: 
            return None
    
    def modification_pass(self):
        now = datetime.now()
        respuesta = conexion.Add('update users set password = %s, recovery_date = %s where code = %s',[self.password,now,self.code])
        if respuesta:
            return 'Ok'

#--------------------------profile--------------------------------------------------------------------------------
    def bring_profile(self):
        data = {}
        data['profile'] = []
        consult = conexion.search('select name, surname, email, img from users where id = %s',[self.id])
        if(consult):
            for i in consult:
                data['profile'].append({'name':i[0],'surname':i[1],'email':i[2], 'img':i[3]})
            return data['profile']
        else:
            return None

    def save_picture(self):
        update = conexion.Add("update users set img = %s where id = %s",[self.img,self.id])
        return 'Ok'


    def edit_name(self):
        update = conexion.Add('update users set name = %s, surname = %s where id = %s',[self.name,self.surname,self.id])
        if update:
            return 'Ok'

    def change_password(self):
        update = conexion.Add('update users set password = %s where id = %s',[self.password,self.id])
        if update:
            return 'Ok'

    """def report_general(self):
        cmm1 = conexion.search(" select user,count(*) from devices where environment = %s group by user", [self.env])

        cmm2 = conexion.search("select start_process,count(*) from devices where environment = %s group by start_process", [self.env])

        cmm3 = conexion.search("")"""