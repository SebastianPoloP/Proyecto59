import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Departamentos} from './departamentos.model';

@model()
export class Ciudades extends Entity {
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

  @belongsTo(() => Departamentos)
  departamentosId: string;

  constructor(data?: Partial<Ciudades>) {
    super(data);
  }
}

export interface CiudadesRelations {
  // describe navigational properties here
}

export type CiudadesWithRelations = Ciudades & CiudadesRelations;
