import { describe, it, expect } from 'vitest';
import request from 'supertest';

const apiUrl = 'http://localhost:5050';

// describe('POST /register', () => {
//   it('should register a user with valid details', async () => {
//     const response = await request(apiUrl)
//       .post('/register')
//       .send({
//         name: 'John Doe',
//         email: 'john.doe@example.com',
//         password: 'secret123'
//       });

//     expect(response.status).toBe(201);
//   });
// });


describe('GET /urls', () => {
    it('should check with a not autenticated user could user the endpoint', async () => {
      const response = await request(apiUrl)
        .get('/urls')
        .send();
  
      expect(response.status).toBe(401);
    });
  });