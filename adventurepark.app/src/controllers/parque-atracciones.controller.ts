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
  Parque,
  Atracciones,
} from '../models';
import {ParqueRepository} from '../repositories';

export class ParqueAtraccionesController {
  constructor(
    @repository(ParqueRepository) protected parqueRepository: ParqueRepository,
  ) { }

  @get('/parques/{id}/atracciones', {
    responses: {
      '200': {
        description: 'Array of Parque has many Atracciones',
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
    return this.parqueRepository.atracciones(id).find(filter);
  }

  @post('/parques/{id}/atracciones', {
    responses: {
      '200': {
        description: 'Parque model instance',
        content: {'application/json': {schema: getModelSchemaRef(Atracciones)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Parque.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Atracciones, {
            title: 'NewAtraccionesInParque',
            exclude: ['id'],
            optional: ['parqueId']
          }),
        },
      },
    }) atracciones: Omit<Atracciones, 'id'>,
  ): Promise<Atracciones> {
    return this.parqueRepository.atracciones(id).create(atracciones);
  }

  @patch('/parques/{id}/atracciones', {
    responses: {
      '200': {
        description: 'Parque.Atracciones PATCH success count',
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
    return this.parqueRepository.atracciones(id).patch(atracciones, where);
  }

  @del('/parques/{id}/atracciones', {
    responses: {
      '200': {
        description: 'Parque.Atracciones DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Atracciones)) where?: Where<Atracciones>,
  ): Promise<Count> {
    return this.parqueRepository.atracciones(id).delete(where);
  }
}
