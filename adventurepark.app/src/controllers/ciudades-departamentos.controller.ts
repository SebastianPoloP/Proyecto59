import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Ciudades,
  Departamentos,
} from '../models';
import {CiudadesRepository} from '../repositories';

export class CiudadesDepartamentosController {
  constructor(
    @repository(CiudadesRepository)
    public ciudadesRepository: CiudadesRepository,
  ) { }

  @get('/ciudades/{id}/departamentos', {
    responses: {
      '200': {
        description: 'Departamentos belonging to Ciudades',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Departamentos)},
          },
        },
      },
    },
  })
  async getDepartamentos(
    @param.path.string('id') id: typeof Ciudades.prototype.id,
  ): Promise<Departamentos> {
    return this.ciudadesRepository.departamentos(id);
  }
}
