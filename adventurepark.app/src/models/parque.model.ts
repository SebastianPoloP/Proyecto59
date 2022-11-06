import {Entity, model, property, hasMany} from '@loopback/repository';
import {Atracciones} from './atracciones.model';
import {Comida} from './comida.model';
import {Zonas} from './zonas.model';

@model()
export class Parque extends Entity {
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
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'number',
    required: true,
  })
  capacidad: number;

  @property({
    type: 'string',
    required: true,
  })
  imagenLogo: string;

  @property({
    type: 'string',
    required: true,
  })
  imagenMapa: string;

  @property({
    type: 'string',
    required: true,
  })
  eslogan: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @hasMany(() => Atracciones)
  atracciones: Atracciones[];

  @hasMany(() => Comida)
  comidas: Comida[];

  @hasMany(() => Zonas)
  zonas: Zonas[];

  constructor(data?: Partial<Parque>) {
    super(data);
  }
}

export interface ParqueRelations {
  // describe navigational properties here
}

export type ParqueWithRelations = Parque & ParqueRelations;
