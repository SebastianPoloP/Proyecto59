import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Visitante,
  Usuarios,
} from '../models';
import {VisitanteRepository} from '../repositories';

export class VisitanteUsuariosController {
  constructor(
    @repository(VisitanteRepository)
    public visitanteRepository: VisitanteRepository,
  ) { }

  @get('/visitantes/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Usuarios belonging to Visitante',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuarios)},
          },
        },
      },
    },
  })
  async getUsuarios(
    @param.path.string('id') id: typeof Visitante.prototype.id,
  ): Promise<Usuarios> {
    return this.visitanteRepository.usuarios(id);
  }
}
