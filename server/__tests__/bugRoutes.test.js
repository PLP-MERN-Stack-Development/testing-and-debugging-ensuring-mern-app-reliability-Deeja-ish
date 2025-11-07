const request = require('supertest');
const app = require('../server');
const Bug = require('../models/Bug'); 
const mongoose = require('mongoose');

describe('Bug API (Integration Test)', () => {

  // --- Test for POST /api/bugs (Create) ---
  describe('POST /api/bugs', () => {
    it('should create a new bug and save it to the DB', async () => {
      const newBugData = { title: 'New Bug', description: 'Bug description' };

      const res = await request(app).post('/api/bugs').send(newBugData);

      // 1. Check the API response
      expect(res.statusCode).toEqual(201);
      expect(res.body.title).toBe('New Bug');
      expect(res.body._id).toBeDefined();

      // 2. Check the test database directly
      const bugInDb = await Bug.findById(res.body._id);
      expect(bugInDb).not.toBeNull();
      expect(bugInDb.description).toBe('Bug description');
      expect(bugInDb.status).toBe('Open');
    });

    it('should return 400 if title is missing', async () => {
      const res = await request(app)
        .post('/api/bugs')
        .send({ description: 'No title' });

      // Check response
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toBe('Please provide a title and description');

      // Check that nothing was saved to the DB
      const count = await Bug.countDocuments();
      expect(count).toBe(0);
    });
  });

  // --- Test for GET /api/bugs (Read) ---
  describe('GET /api/bugs', () => {
    it('should retrieve all bugs from the DB', async () => {
      // Seed the database with a bug
      await Bug.create({ title: 'Test Bug', description: 'This is a test bug' });

      const res = await request(app).get('/api/bugs');

      // Check the response
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toBe(1);
      expect(res.body[0].title).toBe('Test Bug');
    });

    it('should return an empty array if no bugs exist', async () => {
      const res = await request(app).get('/api/bugs');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual([]);
    });
  });

  // --- Test for PUT /api/bugs/:id (Update) ---
  describe('PUT /api/bugs/:id', () => {
    it('should update a bug status in the DB', async () => {
      // 1. Seed the DB with a bug to update
      const bug = await Bug.create({
        title: 'Update Me',
        description: '...',
        status: 'Open',
      });

      // 2. Send the update request
      const res = await request(app)
        .put(`/api/bugs/${bug._id}`)
        .send({ status: 'Resolved' });

      // 3. Check the API response
      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toBe('Resolved');

      // 4. Check the database directly
      const updatedBug = await Bug.findById(bug._id);
      expect(updatedBug.status).toBe('Resolved');
    });

    it('should return 404 if bug not found for update', async () => {
      // Create a valid but non-existent MongoDB ID
      const fakeId = new mongoose.Types.ObjectId();

      const res = await request(app)
        .put(`/api/bugs/${fakeId}`)
        .send({ status: 'In-Progress' });

      expect(res.statusCode).toEqual(404);
      expect(res.body.message).toBe('Bug not found');
    });
  });

  // --- Test for DELETE /api/bugs/:id (Delete) ---
  describe('DELETE /api/bugs/:id', () => {
    it('should delete a bug from the DB', async () => {
      // 1. Seed the DB with a bug to delete
      const bug = await Bug.create({ title: 'Delete Me', description: '...' });

      // 2. Send the delete request
      const res = await request(app).delete(`/api/bugs/${bug._id}`);

      // 3. Check the API response
      expect(res.statusCode).toEqual(200);
      expect(res.body.id).toBe(bug._id.toString());

      // 4. Check the database directly
      const deletedBug = await Bug.findById(bug._id);
      expect(deletedBug).toBeNull();
    });

    it('should return 404 if bug not found for delete', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app).delete(`/api/bugs/${fakeId}`);

      expect(res.statusCode).toEqual(404);
      expect(res.body.message).toBe('Bug not found');
    });
  });
});