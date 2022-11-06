import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Ventas,
  CompraBoletos,
} from '../models';
import {VentasRepository} from '../repositories';

export class VentasCompraBoletosController {
  constructor(
    @repository(VentasRepository)
    public ventasRepository: VentasRepository,
  ) { }

  @get('/ventas/{id}/compra-boletos', {
    responses: {
      '200': {
        description: 'CompraBoletos belonging to Ventas',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CompraBoletos)},
          },
        },
      },
    },
  })
  async getCompraBoletos(
    @param.path.string('id') id: typeof Ventas.prototype.id,
  ): Promise<CompraBoletos> {
    return this.ventasRepository.compraBoletos(id);
  }
}
