import { service } from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  HttpErrors,
} from '@loopback/rest';
import { Keys } from '../config/keys';
import {Usuarios} from '../models';
import { Credenciales } from '../models/credenciales.model';
import {UsuariosRepository} from '../repositories';
import { AutenticacionService } from '../services';
const fetch=require('node-fetch')

export class UsuariosController {
  constructor(
    @repository(UsuariosRepository)
    public usuariosRepository : UsuariosRepository,
    @service(AutenticacionService)
    public servicioAutenticacion:AutenticacionService,
  ) {}
  // Metodos propios.
  @post('/LoginUsuario')
  @response(200,{
    description: 'Login para usuarios'
  })
  async loginUsuario(
    @requestBody() credenciales: Credenciales
  ){
    let u= await this.servicioAutenticacion.IdentificarPersona(credenciales.usuario, credenciales.clave);
    if(u){
      let token=this.servicioAutenticacion.GenerarToken(u);
      return {
        datos:{
          nombre: u.nombre,
          correo: u.correo,
          id: u.id,
          rol: u.rol
        },
        tk: token
      }
    }else{
      throw new HttpErrors[401]('Datos no encontrados');
    }
  }

  //Metodo crear usuario y autenticacion de usuario.

  @post('/usuarios')
  @response(200, {
    description: 'Usuarios model instance',
    content: {'application/json': {schema: getModelSchemaRef(Usuarios)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {
            title: 'NewUsuarios',
            exclude: ['id'],
          }),
        },
      },
    })
    usuarios: Omit<Usuarios, 'id'>,
  ): Promise<Usuarios> {
    // Metodo Clave cifrada para el usuario.
    let clave=this.servicioAutenticacion.GenerarClave();
    let claveCifrada=this.servicioAutenticacion.CifrarClave(clave);
    usuarios.clave=claveCifrada;
    let u = await this.usuariosRepository.create(usuarios);
    
    //Notificar al usuario
    let destino=usuarios.correo;
    let asunto='Registro en la plataforma de AdventurePark';
    let mensaje=`Hola ${usuarios.nombre}, su nombre de usuario es: ${usuarios.correo} y su contraseña es: ${clave} `;
    fetch(`${Keys.urlNotificaciones}/e-mail?correo_destino=${destino}&asunto=${asunto}&contenido=${mensaje}`)
      .then((data: any)=>{
        console.log(data);
      })
      return u;
  }

  //Metodos generados.

  @get('/usuarios/count')
  @response(200, {
    description: 'Usuarios model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Usuarios) where?: Where<Usuarios>,
  ): Promise<Count> {
    return this.usuariosRepository.count(where);
  }

  @get('/usuarios')
  @response(200, {
    description: 'Array of Usuarios model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Usuarios, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Usuarios) filter?: Filter<Usuarios>,
  ): Promise<Usuarios[]> {
    return this.usuariosRepository.find(filter);
  }

  @patch('/usuarios')
  @response(200, {
    description: 'Usuarios PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {partial: true}),
        },
      },
    })
    usuarios: Usuarios,
    @param.where(Usuarios) where?: Where<Usuarios>,
  ): Promise<Count> {
    return this.usuariosRepository.updateAll(usuarios, where);
  }

  @get('/usuarios/{id}')
  @response(200, {
    description: 'Usuarios model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usuarios, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Usuarios, {exclude: 'where'}) filter?: FilterExcludingWhere<Usuarios>
  ): Promise<Usuarios> {
    return this.usuariosRepository.findById(id, filter);
  }

  @patch('/usuarios/{id}')
  @response(204, {
    description: 'Usuarios PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {partial: true}),
        },
      },
    })
    usuarios: Usuarios,
  ): Promise<void> {
    await this.usuariosRepository.updateById(id, usuarios);
  }

  @put('/usuarios/{id}')
  @response(204, {
    description: 'Usuarios PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() usuarios: Usuarios,
  ): Promise<void> {
    await this.usuariosRepository.replaceById(id, usuarios);
  }

  @del('/usuarios/{id}')
  @response(204, {
    description: 'Usuarios DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usuariosRepository.deleteById(id);
  }
}
