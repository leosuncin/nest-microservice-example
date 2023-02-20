import { Inject } from '@nestjs/common';
import { Client } from '@nestjs/microservices';

import { getClientModuleOptions } from '../config/get-client-module-options';
import { getServiceName } from '../utils/get-service-name';

export const ProductClient = () => Client(getClientModuleOptions('product'));

export const InjectProductClient = () => Inject(getServiceName('product'));
