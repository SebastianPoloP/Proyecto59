import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Visitante} from './visitante.model';
import {Planes} from './planes.model';

@model()
export class CompraBoletos extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'string',
    required: true,
  })
  fecha: string;

  @property({
    type: 'number',
    required: true,
  })
  total: number;

  @belongsTo(() => Visitante)
  visitanteId: string;

  @belongsTo(() => Planes)
  planesId: string;

  constructor(data?: Partial<CompraBoletos>) {
    super(data);
  }
}

export interface CompraBoletosRelations {
  // describe navigational properties here
}

export type CompraBoletosWithRelations = CompraBoletos & CompraBoletosRelations;
