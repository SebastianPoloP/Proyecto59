import {Entity, model, property, belongsTo} from '@loopback/repository';
import {CompraBoletos} from './compra-boletos.model';

@model()
export class Ventas extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  secretarioId?: string;

  @belongsTo(() => CompraBoletos)
  compraBoletosId: string;

  constructor(data?: Partial<Ventas>) {
    super(data);
  }
}

export interface VentasRelations {
  // describe navigational properties here
}

export type VentasWithRelations = Ventas & VentasRelations;
