import type { ServiceName } from '../types/service-name';

export function getServiceName(service: ServiceName) {
  return `${service.toUpperCase() as Uppercase<ServiceName>}_SERVICE` as const;
}
