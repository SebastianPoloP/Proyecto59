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
  Planes,
} from '../models';
import {CompraBoletosRepository} from '../repositories';

export class CompraBoletosPlanesController {
  constructor(
    @repository(CompraBoletosRepository)
    public compraBoletosRepository: CompraBoletosRepository,
  ) { }

  @get('/compra-boletos/{id}/planes', {
    responses: {
      '200': {
        description: 'Planes belonging to CompraBoletos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Planes)},
          },
        },
      },
    },
  })
  async getPlanes(
    @param.path.string('id') id: typeof CompraBoletos.prototype.id,
  ): Promise<Planes> {
    return this.compraBoletosRepository.planes(id);
  }
}
