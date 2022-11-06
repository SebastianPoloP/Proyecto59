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
import { request } from 'http';
import {Credenciales, Visitante} from '../models';
import {VisitanteRepository} from '../repositories';
import { AutenticacionService } from '../services';

export class VisitanteController {
  constructor(
    @repository(VisitanteRepository)
    public visitanteRepository : VisitanteRepository,
    @service(AutenticacionService)
    public visitanteAutenticacion: AutenticacionService
  ) {}
  // Metodos propios
  @post('/LoginVisitante')
  @response(200,{
    description: 'Visitante Login'
  })
  async LoginVisitante(
    @requestBody() credenciales: Credenciales
  ){
    let v= await this.visitanteAutenticacion.IdentificarPersona(credenciales.usuario, credenciales.clave);
    if(v){
      let token=this.visitanteAutenticacion.GenerarToken(v);
      return{
        datos:{
          nombre: v.nombre,
          correo: v.correo,
          id: v.id,
          rol: v.rol
        },
        tk: token
      }
    }else{
      throw new HttpErrors[401]('Datos no encontrados');
    }
  }

  // Metodos generados.

  @post('/visitantes')
  @response(200, {
    description: 'Visitante model instance',
    content: {'application/json': {schema: getModelSchemaRef(Visitante)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Visitante, {
            title: 'NewVisitante',
            exclude: ['id'],
          }),
        },
      },
    })
    visitante: Omit<Visitante, 'id'>,
  ): Promise<Visitante> {
    return this.visitanteRepository.create(visitante);
  }

  @get('/visitantes/count')
  @response(200, {
    description: 'Visitante model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Visitante) where?: Where<Visitante>,
  ): Promise<Count> {
    return this.visitanteRepository.count(where);
  }

  @get('/visitantes')
  @response(200, {
    description: 'Array of Visitante model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Visitante, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Visitante) filter?: Filter<Visitante>,
  ): Promise<Visitante[]> {
    return this.visitanteRepository.find(filter);
  }

  @patch('/visitantes')
  @response(200, {
    description: 'Visitante PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Visitante, {partial: true}),
        },
      },
    })
    visitante: Visitante,
    @param.where(Visitante) where?: Where<Visitante>,
  ): Promise<Count> {
    return this.visitanteRepository.updateAll(visitante, where);
  }

  @get('/visitantes/{id}')
  @response(200, {
    description: 'Visitante model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Visitante, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Visitante, {exclude: 'where'}) filter?: FilterExcludingWhere<Visitante>
  ): Promise<Visitante> {
    return this.visitanteRepository.findById(id, filter);
  }

  @patch('/visitantes/{id}')
  @response(204, {
    description: 'Visitante PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Visitante, {partial: true}),
        },
      },
    })
    visitante: Visitante,
  ): Promise<void> {
    await this.visitanteRepository.updateById(id, visitante);
  }

  @put('/visitantes/{id}')
  @response(204, {
    description: 'Visitante PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() visitante: Visitante,
  ): Promise<void> {
    await this.visitanteRepository.replaceById(id, visitante);
  }

  @del('/visitantes/{id}')
  @response(204, {
    description: 'Visitante DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.visitanteRepository.deleteById(id);
  }
}
