# -*- coding: utf-8 -*-
"""
Created on Tue Oct 18 19:07:44 2022

@author: Juan
"""

from flask import Flask
import os 
from twilio.rest import Client
from flask import request
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

app=Flask(__name__) #Instanciando una clase tipo flask
@app.route('/')
def inicio():
    test= os.environ.get('Test')
    return test

#Definición para el envió de sms
@app.route('/sms')
def sms():
    try:
        account_sid = os.environ['TWILIO_ACCOUNT_SID']
        auth_token = os.environ['TWILIO_AUTH_TOKEN']
        client = Client(account_sid, auth_token)
        contenido=request.args.get('mensaje')
        destino=request.args.get('telefono')
        message = client.messages \
                        .create(
                             body=contenido,
                             from_='+18584654230',
                             to='+57' + destino
                         )
        
        print(message.sid)
        return "Se ha enviado correctamente"
        
    except Exception as e:
        return "Error al enviar el mensaje"
    
@app.route('/e-mail')
def email():
    #Varibales de dinamismo para el envio de msj    
    destino=request.args.get('correo_destino')
    asunto=request.args.get('asunto')
    mensaje=request.args.get('mensaje')
    
    message = Mail(
    from_email='juansebastianpolopolo@gmail.com',
    to_emails=destino,
    subject=asunto,
    html_content=mensaje)
    
    try:
        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
        return "Correo enviado exitosamente"
    except Exception as e:
        print(e.message)
        return "Error al enviar el correo"

if __name__=='__main__':
    app.run()
