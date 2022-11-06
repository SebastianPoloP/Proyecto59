import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Visitante, VisitanteRelations, Usuarios} from '../models';
import {UsuariosRepository} from './usuarios.repository';

export class VisitanteRepository extends DefaultCrudRepository<
  Visitante,
  typeof Visitante.prototype.id,
  VisitanteRelations
> {

  public readonly usuarios: BelongsToAccessor<Usuarios, typeof Visitante.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuariosRepository') protected usuariosRepositoryGetter: Getter<UsuariosRepository>,
  ) {
    super(Visitante, dataSource);
    this.usuarios = this.createBelongsToAccessorFor('usuarios', usuariosRepositoryGetter,);
    this.registerInclusionResolver('usuarios', this.usuarios.inclusionResolver);
  }
}
