import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Secretario, SecretarioRelations, Usuarios, Visitante, Ventas, Atracciones} from '../models';
import {UsuariosRepository} from './usuarios.repository';
import {VisitanteRepository} from './visitante.repository';
import {VentasRepository} from './ventas.repository';
import {AtraccionesRepository} from './atracciones.repository';

export class SecretarioRepository extends DefaultCrudRepository<
  Secretario,
  typeof Secretario.prototype.id,
  SecretarioRelations
> {

  public readonly usuarios: BelongsToAccessor<Usuarios, typeof Secretario.prototype.id>;

  public readonly visitantes: HasManyRepositoryFactory<Visitante, typeof Secretario.prototype.id>;

  public readonly ventas: HasManyRepositoryFactory<Ventas, typeof Secretario.prototype.id>;

  public readonly atracciones: HasManyRepositoryFactory<Atracciones, typeof Secretario.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuariosRepository') protected usuariosRepositoryGetter: Getter<UsuariosRepository>, @repository.getter('VisitanteRepository') protected visitanteRepositoryGetter: Getter<VisitanteRepository>, @repository.getter('VentasRepository') protected ventasRepositoryGetter: Getter<VentasRepository>, @repository.getter('AtraccionesRepository') protected atraccionesRepositoryGetter: Getter<AtraccionesRepository>,
  ) {
    super(Secretario, dataSource);
    this.atracciones = this.createHasManyRepositoryFactoryFor('atracciones', atraccionesRepositoryGetter,);
    this.registerInclusionResolver('atracciones', this.atracciones.inclusionResolver);
    this.ventas = this.createHasManyRepositoryFactoryFor('ventas', ventasRepositoryGetter,);
    this.registerInclusionResolver('ventas', this.ventas.inclusionResolver);
    this.visitantes = this.createHasManyRepositoryFactoryFor('visitantes', visitanteRepositoryGetter,);
    this.registerInclusionResolver('visitantes', this.visitantes.inclusionResolver);
    this.usuarios = this.createBelongsToAccessorFor('usuarios', usuariosRepositoryGetter,);
    this.registerInclusionResolver('usuarios', this.usuarios.inclusionResolver);
  }
}
