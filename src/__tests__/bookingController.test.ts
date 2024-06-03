import 'jest';
import request from 'supertest';
import app from '../app';
import sequelize from '../config/database';
import Booking from '../models/Booking';
import Credit from '../models/Credit';

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Booking Controller', () => {
  it('should create a booking', async () => {
    const credit = await Credit.create({ type: 'basic', expirationDate: new Date(new Date().setDate(new Date().getDate() + 10)) });

    const res = await request(app)
      .post('/bookings')
      .send({
        time: new Date(new Date().setDate(new Date().getDate() + 1)),
        patient: 'John Doe',
        provider: 'Provider 1'
      });

    expect(res.status).toBe(201);
    expect(res.body.booking).toHaveProperty('id');
    expect(res.body.booking).toHaveProperty('time');
    expect(res.body.booking).toHaveProperty('patient', 'John Doe');
    expect(res.body.booking).toHaveProperty('provider', 'Provider 1');
    expect(res.body.booking).toHaveProperty('status', 'pending');
  });

  it('should retrieve bookings for a specific user', async () => {
    await Booking.create({ time: new Date(new Date().setDate(new Date().getDate() + 1)), patient: 'John Doe', provider: 'Provider 1', status: 'confirmed' });

    const res = await request(app)
      .get('/bookings')
      .query({ userId: 'John Doe' });

    expect(res.status).toBe(200);
    expect(res.body.bookings).toHaveLength(1);
    expect(res.body.bookings[0]).toHaveProperty('patient', 'John Doe');
  });
});
