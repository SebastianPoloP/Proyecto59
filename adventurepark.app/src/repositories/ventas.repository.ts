import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Ventas, VentasRelations, CompraBoletos} from '../models';
import {CompraBoletosRepository} from './compra-boletos.repository';

export class VentasRepository extends DefaultCrudRepository<
  Ventas,
  typeof Ventas.prototype.id,
  VentasRelations
> {

  public readonly compraBoletos: BelongsToAccessor<CompraBoletos, typeof Ventas.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CompraBoletosRepository') protected compraBoletosRepositoryGetter: Getter<CompraBoletosRepository>,
  ) {
    super(Ventas, dataSource);
    this.compraBoletos = this.createBelongsToAccessorFor('compraBoletos', compraBoletosRepositoryGetter,);
    this.registerInclusionResolver('compraBoletos', this.compraBoletos.inclusionResolver);
  }
}
