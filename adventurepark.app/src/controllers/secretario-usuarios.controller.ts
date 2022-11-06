import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Secretario,
  Usuarios,
} from '../models';
import {SecretarioRepository} from '../repositories';

export class SecretarioUsuariosController {
  constructor(
    @repository(SecretarioRepository)
    public secretarioRepository: SecretarioRepository,
  ) { }

  @get('/secretarios/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Usuarios belonging to Secretario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuarios)},
          },
        },
      },
    },
  })
  async getUsuarios(
    @param.path.string('id') id: typeof Secretario.prototype.id,
  ): Promise<Usuarios> {
    return this.secretarioRepository.usuarios(id);
  }
}
