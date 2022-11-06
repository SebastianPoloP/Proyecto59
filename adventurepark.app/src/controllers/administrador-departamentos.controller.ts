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
  Departamentos,
} from '../models';
import {AdministradorRepository} from '../repositories';

export class AdministradorDepartamentosController {
  constructor(
    @repository(AdministradorRepository)
    public administradorRepository: AdministradorRepository,
  ) { }

  @get('/administradors/{id}/departamentos', {
    responses: {
      '200': {
        description: 'Departamentos belonging to Administrador',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Departamentos)},
          },
        },
      },
    },
  })
  async getDepartamentos(
    @param.path.string('id') id: typeof Administrador.prototype.id,
  ): Promise<Departamentos> {
    return this.administradorRepository.departamentos(id);
  }
}
