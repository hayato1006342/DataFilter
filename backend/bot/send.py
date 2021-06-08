import random
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


def ActivarCuenta(email,code):

    ccs = random.randint(1000000,9999999)
    proveedor_correo = 'smtp.gmail.com: 587'
    remitente = 'codegroup787@gmail.com'
    password = 'codegroup787..'

    servidor = smtplib.SMTP(proveedor_correo)
    servidor.starttls()
    servidor.ehlo()

    servidor.login(remitente, password)

    mensaje = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='utf-8'>
        <meta http-equiv='X-UA-Compatible' content='IE=edge'>
        <title>correo</title>
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">

        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Chivo:wght@300&display=swap" rel="stylesheet">

    </head>  
    <body>
        <div class="contenedor">
            <table style="border-collapse: collapse; margin: 0 auto; padding: 10px; text-align: center; position: relative; width: 100%; max-width: 700px; height: 500px;">
                <tr>
                    <td style="background-color: #FFF; ">
                        <h2 style="color: #000; font-size: 66px; font-family: 'Roboto', sans-serif; -webkit-text-stroke: 2px black;">Data Filter</h2>
                        <hr style="border-top: 2px solid #000;">
                    </td> 
                </tr>
                <tr>
                    <td style="padding: 0px 0px 30px 0px; background-color: #FFF;">
                        <div>
                            <p style="padding-bottom: 10px; font-size: 18px; font-weight: bold; color: rgb(0, 0, 0); font-family: 'Roboto', sans-serif;">Bienvenido <span style="color: rgb(255, 83, 83);">nombre</span>, muchas gracias por utilizar nuestro aplicativo web, antes de completar su registro debemos validar si su cuenta es verdadera, esto para evitar un exceso de registros por parte de nuestros usuarios y para otras funcionalidades, por favor oprima en el botón que se encuentra en la parte inferior "Verificar", el cual lo llevará a nuestro aplicativo para completar al 100% su registro.</p>
                            <br>
                            <a href="http://localhost:4200/activated-account/{code}" style="text-decoration: none; border-radius: 5px; box-shadow: 3px 3px rgb(0, 0, 0); font-size: 23px; font-weight: 600; padding: 10px 20px; color: #FFF; background-color: rgb(31, 31, 31); color: #FFF; font-family: 'Chivo', sans-serif;">Verificar</a>
                        </div>
                    </td>
                </tr>
                <tr style="height: 15px;">
                    <td style="background-color: #FFF;">
                        <hr style="border-top: 2px solid #000; position: relative; top: 10px;">
                        <p style="font-weight: bold; position: relative; color: #000; top: 16px; font-family: 'Roboto', sans-serif;">Derechos reservados a <span style="font-weight: bold; color: #000; font-family: 'Lobster', cursive;">Code Group</span>. 2021</p>
                    </td>
                </tr>
            </table>
        </div>
    </body>
    </html>"""
    msg = MIMEMultipart()
    msg.attach(MIMEText(mensaje, 'html'))
    msg['From'] = remitente
    msg['To'] = email
    msg['Subject'] = 'Activación de la cuenta'
    servidor.sendmail(msg['From'] , msg['To'], msg.as_string())

def RecuperarContrasena(email,code):
    ccs = random.randint(1000000,9999999)
    proveedor_correo = 'smtp.gmail.com: 587'
    remitente = 'codegroup787@gmail.com'
    password = 'codegroup787..'

    servidor = smtplib.SMTP(proveedor_correo)
    servidor.starttls()
    servidor.ehlo()

    servidor.login(remitente, password)

    mensaje = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='utf-8'>
        <meta http-equiv='X-UA-Compatible' content='IE=edge'>
        <title>correo</title>
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">

        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Chivo:wght@300&display=swap" rel="stylesheet">

    </head>  
    <body>
        <div class="contenedor">
            <table style="border-collapse: collapse; margin: 0 auto; padding: 10px; text-align: center; position: relative; width: 100%; max-width: 700px; height: 500px;">
                <tr>
                    <td style="background-color: #FFF; ">
                        <h2 style="color: #000; font-size: 66px; font-family: 'Roboto', sans-serif; -webkit-text-stroke: 2px black;">Data Filter</h2>
                        <hr style="border-top: 2px solid #000;">
                    </td> 
                </tr>
                <tr>
                    <td style="padding: 0px 0px 30px 0px; background-color: #FFF;">
                        <div>
                            <p style="padding-bottom: 10px; font-size: 18px; font-weight: bold; color: rgb(0, 0, 0); font-family: 'Roboto', sans-serif;">Si deseas recuperar tu contraseña deberás crear una nueva, para ello debes oprimir en el botón "Recuperar", el cual te llevará a nuestro aplicativo web para que puedas crear una nueva contraseña.</p>
                            <br>
                            <a href="http://localhost:4200/recovery/{code}" style="text-decoration: none; border-radius: 5px; box-shadow: 3px 3px rgb(0, 0, 0); font-size: 23px; font-weight: 600; padding: 10px 20px; color: #FFF; background-color: rgb(31, 31, 31); color: #FFF; font-family: 'Chivo', sans-serif;">Recuperar</a>
                        </div>
                    </td>
                </tr>
                <tr style="height: 15px;">
                    <td style="background-color: #FFF;">
                        <hr style="border-top: 2px solid #000; position: relative; top: 10px;">
                        <p style="font-weight: bold; position: relative; color: #000; top: 16px; font-family: 'Roboto', sans-serif;">Derechos reservados a <span style="font-weight: bold; color: #000; font-family: 'Lobster', cursive;">Code Group</span>. 2021</p>
                    </td>
                </tr>
            </table>
        </div>
    </body>
    </html>"""
    msg = MIMEMultipart()
    msg.attach(MIMEText(mensaje, 'html'))
    msg['From'] = remitente
    msg['To'] = email
    msg['Subject'] = 'Recuperación de contraseña'
    servidor.sendmail(msg['From'] , msg['To'], msg.as_string())

def SendMailToCollaborators(email,env,owner):
    ccs = random.randint(1000000,9999999)
    proveedor_correo = 'smtp.gmail.com: 587'
    remitente = 'codegroup787@gmail.com'
    password = 'codegroup787..'

    servidor = smtplib.SMTP(proveedor_correo)
    servidor.starttls()
    servidor.ehlo()

    servidor.login(remitente, password)

    mensaje = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='utf-8'>
        <meta http-equiv='X-UA-Compatible' content='IE=edge'>
        <title>correo</title>
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">

        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Chivo:wght@300&display=swap" rel="stylesheet">

    </head>  
    <body>
        <div class="contenedor">
            <table style="border-collapse: collapse; margin: 0 auto; padding: 10px; text-align: center; position: relative; width: 100%; max-width: 700px; height: 500px;">
                <tr>
                    <td style="background-color: #FFF; ">
                        <h2 style="color: #000; font-size: 66px; font-family: 'Roboto', sans-serif; -webkit-text-stroke: 2px black;">Data Filter</h2>
                        <hr style="border-top: 2px solid #000;">
                    </td> 
                </tr>
                <tr>
                    <td style="padding: 0px 0px 30px 0px; background-color: #FFF;">
                        <div>
                            <p style="padding-bottom: 10px; font-size: 18px; font-weight: bold; color: rgb(0, 0, 0); font-family: 'Roboto', sans-serif;">Hola, un usuario de nuestro aplicativo web lo invitó a formar parte de un equipo de trabajo llamado {env[0][0]} para que ejecute una labor de colaborador, si desea aceptar solo tiene que oprimir el botón "ingresar".</p>
                            <br>
                            <a href="http://localhost:4200/environment/join/{env[0][1]}" style="text-decoration: none; border-radius: 5px; box-shadow: 3px 3px rgb(0, 0, 0); font-size: 23px; font-weight: 600; padding: 10px 20px; color: #FFF; background-color: rgb(31, 31, 31); color: #FFF; font-family: 'Chivo', sans-serif;">Ingresar</a>
                        </div>
                    </td>
                </tr>
                <tr style="height: 15px;">
                    <td style="background-color: #FFF;">
                        <hr style="border-top: 2px solid #000; position: relative; top: 10px;">
                        <p style="font-weight: bold; position: relative; color: #000; top: 16px; font-family: 'Roboto', sans-serif;">Derechos reservados a <span style="font-weight: bold; color: #000; font-family: 'Lobster', cursive;">Code Group</span>. 2021</p>
                    </td>
                </tr>
            </table>
        </div>
    </body>
    </html>"""
    msg = MIMEMultipart()
    msg.attach(MIMEText(mensaje, 'html'))
    msg['From'] = remitente
    msg['To'] = email
    msg['Subject'] = 'Invitación a un entorno de trabajo'
    servidor.sendmail(msg['From'] , msg['To'], msg.as_string())