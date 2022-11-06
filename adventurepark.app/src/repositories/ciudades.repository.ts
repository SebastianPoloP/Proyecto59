import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Ciudades, CiudadesRelations, Departamentos} from '../models';
import {DepartamentosRepository} from './departamentos.repository';

export class CiudadesRepository extends DefaultCrudRepository<
  Ciudades,
  typeof Ciudades.prototype.id,
  CiudadesRelations
> {

  public readonly departamentos: BelongsToAccessor<Departamentos, typeof Ciudades.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('DepartamentosRepository') protected departamentosRepositoryGetter: Getter<DepartamentosRepository>,
  ) {
    super(Ciudades, dataSource);
    this.departamentos = this.createBelongsToAccessorFor('departamentos', departamentosRepositoryGetter,);
    this.registerInclusionResolver('departamentos', this.departamentos.inclusionResolver);
  }
}
