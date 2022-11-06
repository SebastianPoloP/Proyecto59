import {Entity, model, property} from '@loopback/repository';

@model()
export class Atracciones extends Entity {
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
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  imagen: string;

  @property({
    type: 'string',
    required: true,
  })
  estaturaMinima: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  videoUrl: string;

  @property({
    type: 'boolean',
    required: true,
  })
  estado: boolean;

  @property({
    type: 'string',
  })
  parqueId?: string;

  @property({
    type: 'string',
  })
  secretarioId?: string;

  constructor(data?: Partial<Atracciones>) {
    super(data);
  }
}

export interface AtraccionesRelations {
  // describe navigational properties here
}

export type AtraccionesWithRelations = Atracciones & AtraccionesRelations;
