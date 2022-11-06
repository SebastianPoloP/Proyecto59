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
  Visitante,
} from '../models';
import {SecretarioRepository} from '../repositories';

export class SecretarioVisitanteController {
  constructor(
    @repository(SecretarioRepository) protected secretarioRepository: SecretarioRepository,
  ) { }

  @get('/secretarios/{id}/visitantes', {
    responses: {
      '200': {
        description: 'Array of Secretario has many Visitante',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Visitante)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Visitante>,
  ): Promise<Visitante[]> {
    return this.secretarioRepository.visitantes(id).find(filter);
  }

  @post('/secretarios/{id}/visitantes', {
    responses: {
      '200': {
        description: 'Secretario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Visitante)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Secretario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Visitante, {
            title: 'NewVisitanteInSecretario',
            exclude: ['id'],
            optional: ['secretarioId']
          }),
        },
      },
    }) visitante: Omit<Visitante, 'id'>,
  ): Promise<Visitante> {
    return this.secretarioRepository.visitantes(id).create(visitante);
  }

  @patch('/secretarios/{id}/visitantes', {
    responses: {
      '200': {
        description: 'Secretario.Visitante PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Visitante, {partial: true}),
        },
      },
    })
    visitante: Partial<Visitante>,
    @param.query.object('where', getWhereSchemaFor(Visitante)) where?: Where<Visitante>,
  ): Promise<Count> {
    return this.secretarioRepository.visitantes(id).patch(visitante, where);
  }

  @del('/secretarios/{id}/visitantes', {
    responses: {
      '200': {
        description: 'Secretario.Visitante DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Visitante)) where?: Where<Visitante>,
  ): Promise<Count> {
    return this.secretarioRepository.visitantes(id).delete(where);
  }
}
