import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {CompraBoletos, CompraBoletosRelations, Visitante, Planes} from '../models';
import {VisitanteRepository} from './visitante.repository';
import {PlanesRepository} from './planes.repository';

export class CompraBoletosRepository extends DefaultCrudRepository<
  CompraBoletos,
  typeof CompraBoletos.prototype.id,
  CompraBoletosRelations
> {

  public readonly visitante: BelongsToAccessor<Visitante, typeof CompraBoletos.prototype.id>;

  public readonly planes: BelongsToAccessor<Planes, typeof CompraBoletos.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VisitanteRepository') protected visitanteRepositoryGetter: Getter<VisitanteRepository>, @repository.getter('PlanesRepository') protected planesRepositoryGetter: Getter<PlanesRepository>,
  ) {
    super(CompraBoletos, dataSource);
    this.planes = this.createBelongsToAccessorFor('planes', planesRepositoryGetter,);
    this.registerInclusionResolver('planes', this.planes.inclusionResolver);
    this.visitante = this.createBelongsToAccessorFor('visitante', visitanteRepositoryGetter,);
    this.registerInclusionResolver('visitante', this.visitante.inclusionResolver);
  }
}
