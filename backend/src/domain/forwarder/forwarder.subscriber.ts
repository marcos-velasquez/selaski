import { hashSync } from 'bcryptjs';
import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { Forwarder } from './forwarder.entity';

@EventSubscriber()
export class ForwarderSubscriber implements EntitySubscriberInterface<Forwarder> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Forwarder;
  }

  beforeInsert({ entity }: InsertEvent<Forwarder>) {
    entity.password = hashSync(entity.password);
  }
}
