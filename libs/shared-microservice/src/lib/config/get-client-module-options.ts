import { ClientProviderOptions, Transport } from '@nestjs/microservices';

import type { ServiceName } from '../types/service-name';
import { getQueueName } from '../utils/get-queue-name';
import { getServiceName } from '../utils/get-service-name';

export function getClientModuleOptions(
  service: ServiceName
): ClientProviderOptions {
  return {
    name: getServiceName(service),
    transport: Transport.RMQ,
    options: {
      urls: [
        process.env['RABBIT_MQ_URL'] ?? 'amqp://user:bitnami@localhost:5672',
      ],
      queue: getQueueName(service),
    },
  };
}
