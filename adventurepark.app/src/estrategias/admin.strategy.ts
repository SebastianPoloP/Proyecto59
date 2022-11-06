import { AuthenticationStrategy } from "@loopback/authentication";
import {service} from '@loopback/core'
import { Request, HttpErrors } from "@loopback/rest";
import { UserProfile } from "@loopback/security";
import parseBearerToken from "parse-bearer-token";
import { AutenticacionService } from "../services";


export class EstrategiaAdministrador implements AuthenticationStrategy{
    name: string = 'admin';
    constructor(
        @service(AutenticacionService)
        public servicioAutenticacion: AutenticacionService
    ){
    }
    async authenticate(request: Request): Promise<UserProfile | undefined> {
        let token= parseBearerToken(request);
        if(token){
            let datos= this.servicioAutenticacion.ValidarToken(token);
            if(datos){
                if(datos.data.rol){
                    let perfil: UserProfile=Object.assign({
                        nombre: datos.data.nombre,
                        rol: datos.data.rol
                    });
                    return perfil;
                }
            }else{
                throw new HttpErrors[401]('El token incluido no es valido')
            }
        }else{
            throw new HttpErrors[401]('No se ha encontrado un token')
        }
    }
}