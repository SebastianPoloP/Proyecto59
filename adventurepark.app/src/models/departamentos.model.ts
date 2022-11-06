import {Entity, model, property} from '@loopback/repository';

@model()
export class Departamentos extends Entity {
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


  constructor(data?: Partial<Departamentos>) {
    super(data);
  }
}

export interface DepartamentosRelations {
  // describe navigational properties here
}

export type DepartamentosWithRelations = Departamentos & DepartamentosRelations;
