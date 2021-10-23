import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { Shipment } from '@domain/shipment/shipment.entity';

@EventSubscriber()
export class ShipmentSubscriber implements EntitySubscriberInterface<Shipment> {
  private FIXED_RATE = 10;
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Shipment;
  }

  beforeInsert({ entity }: InsertEvent<Shipment>) {
    this.setProfit(entity);
  }

  beforeUpdate({ entity }: UpdateEvent<Shipment>) {
    if (Boolean(entity)) {
      this.setProfit(entity as Shipment);
    }
  }

  private setProfit(entity: Shipment) {
    entity.profit = entity.quantityOfContainers * this.FIXED_RATE;
  }
}
