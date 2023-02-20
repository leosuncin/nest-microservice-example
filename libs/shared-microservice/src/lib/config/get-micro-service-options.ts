import { RmqOptions, Transport } from '@nestjs/microservices';

import type { ServiceName } from '../types/service-name';
import { getQueueName } from '../utils/get-queue-name';

export function getMicroServiceOptions(
  service: ServiceName,
  noAck = true
): RmqOptions {
  return {
    transport: Transport.RMQ,
    options: {
      urls: [
        process.env['RABBIT_MQ_URL'] ?? 'amqp://user:bitnami@localhost:5672',
      ],
      queue: getQueueName(service),
      noAck,
      persistent: true,
      queueOptions: {
        durable: true,
      },
    },
  };
}
