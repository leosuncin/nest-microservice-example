import {
  AuthClientService,
  getServiceName,
  OrderClientService,
  ProductClientService,
} from '@example/shared-microservice';
import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AuthClientService,
        ProductClientService,
        OrderClientService,
        AppService,
      ],
    })
      .useMocker((token) => {
        const services = new Set<unknown>([
          getServiceName('auth'),
          getServiceName('product'),
          getServiceName('order'),
        ]);

        if (services.has(token)) {
          return {
            send: jest.fn(),
            emit: jest.fn(),
          };
        }

        return;
      })
      .compile();
  });

  describe('getData', () => {
    it('should return "Welcome to api-gateway!"', () => {
      const appController = app.get<AppController>(AppController);

      expect(appController.getData()).toEqual({
        message: 'Welcome to api-gateway!',
      });
    });
  });
});
