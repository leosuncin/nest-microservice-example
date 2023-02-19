import axios from 'axios';

describe('GET /api', () => {
  it('should return a message', async () => {
    const res = await axios.get(`/api`);

    expect(res.status).toBe(200);
    expect(res.data).toEqual({ message: 'Welcome to api-gateway!' });
  });
});

describe('GET /api/auth', () => {
  it('should return a message', async () => {
    const res = await axios.get(`/api/auth`);

    expect(res.status).toBe(200);
    expect(res.data).toEqual({ message: 'Welcome to auth-microservice!' });
  });
});

describe('GET /api/product', () => {
  it('should return a message', async () => {
    const res = await axios.get(`/api/product`);

    expect(res.status).toBe(200);
    expect(res.data).toEqual({ message: 'Welcome to product-microservice!' });
  });
});

describe('GET /api/order', () => {
  it('should return a message', async () => {
    const res = await axios.get(`/api/order`);

    expect(res.status).toBe(200);
    expect(res.data).toEqual({ message: 'Welcome to order-microservice!' });
  });
});
