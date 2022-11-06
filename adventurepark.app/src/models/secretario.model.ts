import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Usuarios} from './usuarios.model';
import {Visitante} from './visitante.model';
import {Ventas} from './ventas.model';
import {Atracciones} from './atracciones.model';

@model()
export class Secretario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @belongsTo(() => Usuarios)
  usuariosId: string;

  @hasMany(() => Visitante)
  visitantes: Visitante[];

  @hasMany(() => Ventas)
  ventas: Ventas[];

  @hasMany(() => Atracciones)
  atracciones: Atracciones[];

  constructor(data?: Partial<Secretario>) {
    super(data);
  }
}

export interface SecretarioRelations {
  // describe navigational properties here
}

export type SecretarioWithRelations = Secretario & SecretarioRelations;
