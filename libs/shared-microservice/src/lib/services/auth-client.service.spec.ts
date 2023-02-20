import { Test } from '@nestjs/testing';

import { getServiceName } from '../utils/get-service-name';
import { AuthClientService } from './auth-client.service';

describe('AuthClientService', () => {
  let service: AuthClientService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: getServiceName('auth'),
          useValue: {
            send: jest.fn(),
            emit: jest.fn(),
          },
        },
        AuthClientService,
      ],
    }).compile();

    service = module.get(AuthClientService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
