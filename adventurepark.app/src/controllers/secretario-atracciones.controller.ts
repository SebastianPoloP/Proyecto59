import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Secretario,
  Atracciones,
} from '../models';
import {SecretarioRepository} from '../repositories';

export class SecretarioAtraccionesController {
  constructor(
    @repository(SecretarioRepository) protected secretarioRepository: SecretarioRepository,
  ) { }

  @get('/secretarios/{id}/atracciones', {
    responses: {
      '200': {
        description: 'Array of Secretario has many Atracciones',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Atracciones)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Atracciones>,
  ): Promise<Atracciones[]> {
    return this.secretarioRepository.atracciones(id).find(filter);
  }

  @post('/secretarios/{id}/atracciones', {
    responses: {
      '200': {
        description: 'Secretario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Atracciones)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Secretario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Atracciones, {
            title: 'NewAtraccionesInSecretario',
            exclude: ['id'],
            optional: ['secretarioId']
          }),
        },
      },
    }) atracciones: Omit<Atracciones, 'id'>,
  ): Promise<Atracciones> {
    return this.secretarioRepository.atracciones(id).create(atracciones);
  }

  @patch('/secretarios/{id}/atracciones', {
    responses: {
      '200': {
        description: 'Secretario.Atracciones PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Atracciones, {partial: true}),
        },
      },
    })
    atracciones: Partial<Atracciones>,
    @param.query.object('where', getWhereSchemaFor(Atracciones)) where?: Where<Atracciones>,
  ): Promise<Count> {
    return this.secretarioRepository.atracciones(id).patch(atracciones, where);
  }

  @del('/secretarios/{id}/atracciones', {
    responses: {
      '200': {
        description: 'Secretario.Atracciones DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Atracciones)) where?: Where<Atracciones>,
  ): Promise<Count> {
    return this.secretarioRepository.atracciones(id).delete(where);
  }
}
