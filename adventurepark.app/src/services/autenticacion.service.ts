import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { request } from 'http';
import { Usuarios } from '../models';
import { UsuariosRepository } from '../repositories';
import {Keys} from '../config/keys';
import { resolve } from 'path';

const generador = require('generate-password');
const cryptojs=require('crypto-js');
const JWT=require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(UsuariosRepository)
    public usuarioRepository: UsuariosRepository
  ) {}

  /*
   * Generar y encriptar contraseñas
   */
  GenerarClave(){
    let clave = generador.generate({
      length: 8,
      numbers: true
    });
    return clave;
  }

  CifrarClave(clave:string){
    let claveCifrada=cryptojs.MD5(clave);
    return claveCifrada;
  }
  //Logeo, generación de token y validar el token.
  IdentificarPersona(usuario:string, clave:string){
    try {
       let u=this.usuarioRepository.findOne({where:{correo: usuario, clave: clave}});
       if(u){
        return u;
       }
       return false;
    } catch {
      return false;
    }
  }

  GenerarToken(usuario: Usuarios){
    let token= JWT.sign({
      data:{
        id: usuario.id,
        corre: usuario.correo,
        nombre: usuario.nombre +" "+ usuario.apellido,
        rol: usuario.rol
      }
    },
    Keys.claveJWT);
    return token;
  }

  ValidarToken(token:string){
    try {
      let datos= JWT.verify(token, Keys.claveJWT);
      return datos;
    } catch {
      return false;
    }
  }
}
