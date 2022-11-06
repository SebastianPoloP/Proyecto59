import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Administrador,
  Parque,
} from '../models';
import {AdministradorRepository} from '../repositories';

export class AdministradorParqueController {
  constructor(
    @repository(AdministradorRepository)
    public administradorRepository: AdministradorRepository,
  ) { }

  @get('/administradors/{id}/parque', {
    responses: {
      '200': {
        description: 'Parque belonging to Administrador',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Parque)},
          },
        },
      },
    },
  })
  async getParque(
    @param.path.string('id') id: typeof Administrador.prototype.id,
  ): Promise<Parque> {
    return this.administradorRepository.parque(id);
  }
}
