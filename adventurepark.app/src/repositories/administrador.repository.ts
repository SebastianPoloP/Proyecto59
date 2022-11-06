import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Administrador, AdministradorRelations, Usuarios, Parque, Ciudades, Departamentos} from '../models';
import {UsuariosRepository} from './usuarios.repository';
import {ParqueRepository} from './parque.repository';
import {CiudadesRepository} from './ciudades.repository';
import {DepartamentosRepository} from './departamentos.repository';

export class AdministradorRepository extends DefaultCrudRepository<
  Administrador,
  typeof Administrador.prototype.id,
  AdministradorRelations
> {

  public readonly usuarios: BelongsToAccessor<Usuarios, typeof Administrador.prototype.id>;

  public readonly parque: BelongsToAccessor<Parque, typeof Administrador.prototype.id>;

  public readonly ciudades: BelongsToAccessor<Ciudades, typeof Administrador.prototype.id>;

  public readonly departamentos: BelongsToAccessor<Departamentos, typeof Administrador.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuariosRepository') protected usuariosRepositoryGetter: Getter<UsuariosRepository>, @repository.getter('ParqueRepository') protected parqueRepositoryGetter: Getter<ParqueRepository>, @repository.getter('CiudadesRepository') protected ciudadesRepositoryGetter: Getter<CiudadesRepository>, @repository.getter('DepartamentosRepository') protected departamentosRepositoryGetter: Getter<DepartamentosRepository>,
  ) {
    super(Administrador, dataSource);
    this.departamentos = this.createBelongsToAccessorFor('departamentos', departamentosRepositoryGetter,);
    this.registerInclusionResolver('departamentos', this.departamentos.inclusionResolver);
    this.ciudades = this.createBelongsToAccessorFor('ciudades', ciudadesRepositoryGetter,);
    this.registerInclusionResolver('ciudades', this.ciudades.inclusionResolver);
    this.parque = this.createBelongsToAccessorFor('parque', parqueRepositoryGetter,);
    this.registerInclusionResolver('parque', this.parque.inclusionResolver);
    this.usuarios = this.createBelongsToAccessorFor('usuarios', usuariosRepositoryGetter,);
    this.registerInclusionResolver('usuarios', this.usuarios.inclusionResolver);
  }
}
