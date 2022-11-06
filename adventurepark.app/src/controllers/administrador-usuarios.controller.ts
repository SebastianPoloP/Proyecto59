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
  Usuarios,
} from '../models';
import {AdministradorRepository} from '../repositories';

export class AdministradorUsuariosController {
  constructor(
    @repository(AdministradorRepository)
    public administradorRepository: AdministradorRepository,
  ) { }

  @get('/administradors/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Usuarios HasOne to Administrador',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuarios)},
          },
        },
      },
    },
  })
  async getUsuarios(
    @param.path.string('id') id: typeof Administrador.prototype.id,
  ): Promise<Usuarios> {
    return this.administradorRepository.usuarios(id);
  }
}
