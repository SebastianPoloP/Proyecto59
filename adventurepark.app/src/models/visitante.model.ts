import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Usuarios} from './usuarios.model';

@model()
export class Visitante extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  edad: string;

  @property({
    type: 'string',
    required: true,
  })
  tarjetaCredito: string;

  @property({
    type: 'string',
  })
  secretarioId?: string;

  @belongsTo(() => Usuarios)
  usuariosId: string;

  constructor(data?: Partial<Visitante>) {
    super(data);
  }
}

export interface VisitanteRelations {
  // describe navigational properties here
}

export type VisitanteWithRelations = Visitante & VisitanteRelations;
