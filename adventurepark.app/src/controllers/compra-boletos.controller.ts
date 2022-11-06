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
import {CompraBoletos} from '../models';
import {CompraBoletosRepository} from '../repositories';

export class CompraBoletosController {
  constructor(
    @repository(CompraBoletosRepository)
    public compraBoletosRepository : CompraBoletosRepository,
  ) {}

  @post('/compra-boletos')
  @response(200, {
    description: 'CompraBoletos model instance',
    content: {'application/json': {schema: getModelSchemaRef(CompraBoletos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CompraBoletos, {
            title: 'NewCompraBoletos',
            exclude: ['id'],
          }),
        },
      },
    })
    compraBoletos: Omit<CompraBoletos, 'id'>,
  ): Promise<CompraBoletos> {
    return this.compraBoletosRepository.create(compraBoletos);
  }

  @get('/compra-boletos/count')
  @response(200, {
    description: 'CompraBoletos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CompraBoletos) where?: Where<CompraBoletos>,
  ): Promise<Count> {
    return this.compraBoletosRepository.count(where);
  }

  @get('/compra-boletos')
  @response(200, {
    description: 'Array of CompraBoletos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CompraBoletos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CompraBoletos) filter?: Filter<CompraBoletos>,
  ): Promise<CompraBoletos[]> {
    return this.compraBoletosRepository.find(filter);
  }

  @patch('/compra-boletos')
  @response(200, {
    description: 'CompraBoletos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CompraBoletos, {partial: true}),
        },
      },
    })
    compraBoletos: CompraBoletos,
    @param.where(CompraBoletos) where?: Where<CompraBoletos>,
  ): Promise<Count> {
    return this.compraBoletosRepository.updateAll(compraBoletos, where);
  }

  @get('/compra-boletos/{id}')
  @response(200, {
    description: 'CompraBoletos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CompraBoletos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CompraBoletos, {exclude: 'where'}) filter?: FilterExcludingWhere<CompraBoletos>
  ): Promise<CompraBoletos> {
    return this.compraBoletosRepository.findById(id, filter);
  }

  @patch('/compra-boletos/{id}')
  @response(204, {
    description: 'CompraBoletos PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CompraBoletos, {partial: true}),
        },
      },
    })
    compraBoletos: CompraBoletos,
  ): Promise<void> {
    await this.compraBoletosRepository.updateById(id, compraBoletos);
  }

  @put('/compra-boletos/{id}')
  @response(204, {
    description: 'CompraBoletos PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() compraBoletos: CompraBoletos,
  ): Promise<void> {
    await this.compraBoletosRepository.replaceById(id, compraBoletos);
  }

  @del('/compra-boletos/{id}')
  @response(204, {
    description: 'CompraBoletos DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.compraBoletosRepository.deleteById(id);
  }
}
