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
  Ciudades,
} from '../models';
import {AdministradorRepository} from '../repositories';

export class AdministradorCiudadesController {
  constructor(
    @repository(AdministradorRepository)
    public administradorRepository: AdministradorRepository,
  ) { }

  @get('/administradors/{id}/ciudades', {
    responses: {
      '200': {
        description: 'Ciudades belonging to Administrador',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ciudades)},
          },
        },
      },
    },
  })
  async getCiudades(
    @param.path.string('id') id: typeof Administrador.prototype.id,
  ): Promise<Ciudades> {
    return this.administradorRepository.ciudades(id);
  }
}
