import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Parque, ParqueRelations, Atracciones, Comida, Zonas} from '../models';
import {AtraccionesRepository} from './atracciones.repository';
import {ComidaRepository} from './comida.repository';
import {ZonasRepository} from './zonas.repository';

export class ParqueRepository extends DefaultCrudRepository<
  Parque,
  typeof Parque.prototype.id,
  ParqueRelations
> {

  public readonly atracciones: HasManyRepositoryFactory<Atracciones, typeof Parque.prototype.id>;

  public readonly comidas: HasManyRepositoryFactory<Comida, typeof Parque.prototype.id>;

  public readonly zonas: HasManyRepositoryFactory<Zonas, typeof Parque.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AtraccionesRepository') protected atraccionesRepositoryGetter: Getter<AtraccionesRepository>, @repository.getter('ComidaRepository') protected comidaRepositoryGetter: Getter<ComidaRepository>, @repository.getter('ZonasRepository') protected zonasRepositoryGetter: Getter<ZonasRepository>,
  ) {
    super(Parque, dataSource);
    this.zonas = this.createHasManyRepositoryFactoryFor('zonas', zonasRepositoryGetter,);
    this.registerInclusionResolver('zonas', this.zonas.inclusionResolver);
    this.comidas = this.createHasManyRepositoryFactoryFor('comidas', comidaRepositoryGetter,);
    this.registerInclusionResolver('comidas', this.comidas.inclusionResolver);
    this.atracciones = this.createHasManyRepositoryFactoryFor('atracciones', atraccionesRepositoryGetter,);
    this.registerInclusionResolver('atracciones', this.atracciones.inclusionResolver);
  }
}
