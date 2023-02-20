import type { ServiceName } from '../types/service-name';

export function getQueueName(service: ServiceName) {
  return `${service.toUpperCase() as Uppercase<ServiceName>}_QUEUE` as const;
}
