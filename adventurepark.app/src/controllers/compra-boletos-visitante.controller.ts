import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  CompraBoletos,
  Visitante,
} from '../models';
import {CompraBoletosRepository} from '../repositories';

export class CompraBoletosVisitanteController {
  constructor(
    @repository(CompraBoletosRepository)
    public compraBoletosRepository: CompraBoletosRepository,
  ) { }

  @get('/compra-boletos/{id}/visitante', {
    responses: {
      '200': {
        description: 'Visitante belonging to CompraBoletos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Visitante)},
          },
        },
      },
    },
  })
  async getVisitante(
    @param.path.string('id') id: typeof CompraBoletos.prototype.id,
  ): Promise<Visitante> {
    return this.compraBoletosRepository.visitante(id);
  }
}
