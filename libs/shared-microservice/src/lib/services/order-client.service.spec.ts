import { Test, TestingModule } from '@nestjs/testing';

import { getServiceName } from '../utils/get-service-name';
import { OrderClientService } from './order-client.service';

describe('OrderClientService', () => {
  let service: OrderClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getServiceName('order'),
          useValue: {
            emit: jest.fn(),
            send: jest.fn(),
          },
        },
        OrderClientService,
      ],
    }).compile();

    service = module.get<OrderClientService>(OrderClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
