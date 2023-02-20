import { Inject } from '@nestjs/common';
import { Client } from '@nestjs/microservices';

import { getClientModuleOptions } from '../config/get-client-module-options';
import { getServiceName } from '../utils/get-service-name';

export const AuthClient = () => Client(getClientModuleOptions('auth'));

export const InjectAuthClient = () => Inject(getServiceName('auth'));
