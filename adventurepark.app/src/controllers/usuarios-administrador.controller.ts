import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Usuarios,
  Administrador,
} from '../models';
import {UsuariosRepository} from '../repositories';

export class UsuariosAdministradorController {
  constructor(
    @repository(UsuariosRepository)
    public usuariosRepository: UsuariosRepository,
  ) { }

  @get('/usuarios/{id}/administrador', {
    responses: {
      '200': {
        description: 'Administrador belonging to Usuarios',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Administrador)},
          },
        },
      },
    },
  })
  async getAdministrador(
    @param.path.string('id') id: typeof Usuarios.prototype.id,
  ): Promise<Administrador> {
    return this.usuariosRepository.administrador(id);
  }
}
