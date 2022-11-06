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
  Ventas,
} from '../models';
import {SecretarioRepository} from '../repositories';

export class SecretarioVentasController {
  constructor(
    @repository(SecretarioRepository) protected secretarioRepository: SecretarioRepository,
  ) { }

  @get('/secretarios/{id}/ventas', {
    responses: {
      '200': {
        description: 'Array of Secretario has many Ventas',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ventas)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Ventas>,
  ): Promise<Ventas[]> {
    return this.secretarioRepository.ventas(id).find(filter);
  }

  @post('/secretarios/{id}/ventas', {
    responses: {
      '200': {
        description: 'Secretario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ventas)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Secretario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ventas, {
            title: 'NewVentasInSecretario',
            exclude: ['id'],
            optional: ['secretarioId']
          }),
        },
      },
    }) ventas: Omit<Ventas, 'id'>,
  ): Promise<Ventas> {
    return this.secretarioRepository.ventas(id).create(ventas);
  }

  @patch('/secretarios/{id}/ventas', {
    responses: {
      '200': {
        description: 'Secretario.Ventas PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ventas, {partial: true}),
        },
      },
    })
    ventas: Partial<Ventas>,
    @param.query.object('where', getWhereSchemaFor(Ventas)) where?: Where<Ventas>,
  ): Promise<Count> {
    return this.secretarioRepository.ventas(id).patch(ventas, where);
  }

  @del('/secretarios/{id}/ventas', {
    responses: {
      '200': {
        description: 'Secretario.Ventas DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Ventas)) where?: Where<Ventas>,
  ): Promise<Count> {
    return this.secretarioRepository.ventas(id).delete(where);
  }
}
