from flask_mysqldb import MySQL
from app import app

app.config['SECRET_KEY'] = 'thisisasecret'
app.config['MYSQL_HOST'] = 'localhost' 
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_PORT'] = 3306
app.config['MYSQL_DB'] = 'DB_DataFilter'
mysql = MySQL(app)

def Add(sql,valor):
        cur = mysql.connection.cursor()
        cur.execute(sql,valor)
        mysql.connection.commit()
        cur.close()
        return "Accion Satisfactoria"

def View(sql):
        cur = mysql.connection.cursor()
        cur.execute(sql)
        Data = cur.fetchall()
        cur.close()
        return Data

def search(sql,valor):
        cur = mysql.connection.cursor()
        cur.execute(sql,valor)
        Data = cur.fetchall()
        cur.close()
        return Data
