const request = require('supertest');
const app = require('../src/server');

describe('Practice API Tests', () => {
  
  describe('Health Endpoint', () => {
    it('should return healthy status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);
      
      expect(response.body.status).toBe('healthy');
      expect(response.body.timestamp).toBeDefined();
      expect(response.body.uptime).toBeDefined();
    });
  });

  describe('Items API', () => {
    it('should get all items', async () => {
      const response = await request(app)
        .get('/api/v1/items')
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.count).toBeDefined();
    });

    it('should get item by ID', async () => {
      const response = await request(app)
        .get('/api/v1/items/1')
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(1);
    });

    it('should return 404 for non-existent item', async () => {
      const response = await request(app)
        .get('/api/v1/items/999')
        .expect(404);
      
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Item not found');
    });

    it('should create new item', async () => {
      const newItem = {
        name: 'Test Item',
        status: 'active'
      };

      const response = await request(app)
        .post('/api/v1/items')
        .send(newItem)
        .expect(201);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe(newItem.name);
      expect(response.body.data.status).toBe(newItem.status);
    });

    it('should require name for new item', async () => {
      const response = await request(app)
        .post('/api/v1/items')
        .send({ status: 'active' })
        .expect(400);
      
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Name is required');
    });

    it('should update existing item', async () => {
      const updateData = {
        name: 'Updated Item',
        status: 'inactive'
      };

      const response = await request(app)
        .put('/api/v1/items/1')
        .send(updateData)
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe(updateData.name);
    });

    it('should delete existing item', async () => {
      const response = await request(app)
        .delete('/api/v1/items/1')
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.message).toContain('deleted');
    });
  });

  describe('Error Handling', () => {
    it('should return 404 for unknown routes', async () => {
      const response = await request(app)
        .get('/unknown-route')
        .expect(404);
      
      expect(response.body.error).toBe('Route not found');
    });
  });
});
