import request from 'supertest';
import app from '../app';
import sequelize from '../config/database';
import Credit from '../models/Credit';

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Credit Controller', () => {
  it('should retrieve credits for a specific patient', async () => {
    const patientId = 'patient123';
    await Credit.create({ type: 'basic', expirationDate: new Date(new Date().setDate(new Date().getDate() + 10)), patient: patientId });

    const res = await request(app)
      .get(`/credits/${patientId}`);

    expect(res.status).toBe(200);
    expect(res.body.credits).toHaveLength(1);
    expect(res.body.credits[0]).toHaveProperty('patient', patientId);
  });
});
