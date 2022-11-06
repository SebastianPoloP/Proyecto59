import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Departamentos, DepartamentosRelations} from '../models';

export class DepartamentosRepository extends DefaultCrudRepository<
  Departamentos,
  typeof Departamentos.prototype.id,
  DepartamentosRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Departamentos, dataSource);
  }
}
