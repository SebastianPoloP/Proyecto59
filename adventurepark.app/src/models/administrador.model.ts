import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {Usuarios} from './usuarios.model';
import {Parque} from './parque.model';
import {Ciudades} from './ciudades.model';
import {Departamentos} from './departamentos.model';

@model()
export class Administrador extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @hasOne(() => Usuarios)
  usuariosId: string;

  @belongsTo(() => Parque)
  parqueId: string;

  @belongsTo(() => Ciudades)
  ciudadesId: string;

  @belongsTo(() => Departamentos)
  departamentosId: string;

  constructor(data?: Partial<Administrador>) {
    super(data);
  }
}

export interface AdministradorRelations {
  // describe navigational properties here
}

export type AdministradorWithRelations = Administrador & AdministradorRelations;
