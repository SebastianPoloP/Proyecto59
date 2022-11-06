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
} from '@loopback/rest';
import {Departamentos} from '../models';
import {DepartamentosRepository} from '../repositories';

export class DepartamentosController {
  constructor(
    @repository(DepartamentosRepository)
    public departamentosRepository : DepartamentosRepository,
  ) {}

  @post('/departamentos')
  @response(200, {
    description: 'Departamentos model instance',
    content: {'application/json': {schema: getModelSchemaRef(Departamentos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Departamentos, {
            title: 'NewDepartamentos',
            exclude: ['id'],
          }),
        },
      },
    })
    departamentos: Omit<Departamentos, 'id'>,
  ): Promise<Departamentos> {
    return this.departamentosRepository.create(departamentos);
  }

  @get('/departamentos/count')
  @response(200, {
    description: 'Departamentos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Departamentos) where?: Where<Departamentos>,
  ): Promise<Count> {
    return this.departamentosRepository.count(where);
  }

  @get('/departamentos')
  @response(200, {
    description: 'Array of Departamentos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Departamentos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Departamentos) filter?: Filter<Departamentos>,
  ): Promise<Departamentos[]> {
    return this.departamentosRepository.find(filter);
  }

  @patch('/departamentos')
  @response(200, {
    description: 'Departamentos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Departamentos, {partial: true}),
        },
      },
    })
    departamentos: Departamentos,
    @param.where(Departamentos) where?: Where<Departamentos>,
  ): Promise<Count> {
    return this.departamentosRepository.updateAll(departamentos, where);
  }

  @get('/departamentos/{id}')
  @response(200, {
    description: 'Departamentos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Departamentos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Departamentos, {exclude: 'where'}) filter?: FilterExcludingWhere<Departamentos>
  ): Promise<Departamentos> {
    return this.departamentosRepository.findById(id, filter);
  }

  @patch('/departamentos/{id}')
  @response(204, {
    description: 'Departamentos PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Departamentos, {partial: true}),
        },
      },
    })
    departamentos: Departamentos,
  ): Promise<void> {
    await this.departamentosRepository.updateById(id, departamentos);
  }

  @put('/departamentos/{id}')
  @response(204, {
    description: 'Departamentos PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() departamentos: Departamentos,
  ): Promise<void> {
    await this.departamentosRepository.replaceById(id, departamentos);
  }

  @del('/departamentos/{id}')
  @response(204, {
    description: 'Departamentos DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.departamentosRepository.deleteById(id);
  }
}
