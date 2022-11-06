import { AuthenticationStrategy } from "@loopback/authentication";
import { service } from "@loopback/core";
import { Request, RedirectRoute, HttpErrors } from "@loopback/rest";
import { UserProfile } from "@loopback/security";
import { ParamsDictionary } from "express-serve-static-core";
import parseBearerToken from "parse-bearer-token";
import { ParsedQs } from "qs";
import { AutenticacionService } from "../services";


export class EstrategiaSercretario implements AuthenticationStrategy{
    name: string= 'secretario'
    constructor(
        @service(AutenticacionService)
        public secretarioAutenticacion: AutenticacionService
    ){}
    async authenticate(request: Request): Promise<UserProfile | undefined> {
        let token=parseBearerToken(request);
        if(token){
            let datos= this.secretarioAutenticacion.ValidarToken(token)
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