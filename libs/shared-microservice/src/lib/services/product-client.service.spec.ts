import { Test, TestingModule } from '@nestjs/testing';

import { getServiceName } from '../utils/get-service-name';
import { ProductClientService } from './product-client.service';

describe('ProductClientService', () => {
  let service: ProductClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getServiceName('product'),
          useValue: {
            emit: jest.fn(),
            send: jest.fn(),
          },
        },
        ProductClientService,
      ],
    }).compile();

    service = module.get<ProductClientService>(ProductClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
