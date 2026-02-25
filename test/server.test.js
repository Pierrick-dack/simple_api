const request = require('supertest');
const { app, toUpperCase } = require('../server');

describe('toUpperCase function', () => {
  test('should convert text to uppercase', () => {
    expect(toUpperCase('hello')).toBe('HELLO');
    expect(toUpperCase('world')).toBe('WORLD');
    expect(toUpperCase('Hello World')).toBe('HELLO WORLD');
    expect(toUpperCase('')).toBe('');
  });
});

describe('GET /to_uppercase/:text', () => {
  test('should return original and uppercased text', async () => {
    const response = await request(app)
      .get('/to_uppercase/hello')
      .expect(200);

    expect(response.body).toEqual({
      original: 'hello',
      uppercased: 'HELLO'
    });
  });

  test('should handle text with spaces', async () => {
    const response = await request(app)
      .get('/to_uppercase/hello%20world')
      .expect(200);

    expect(response.body).toEqual({
      original: 'hello world',
      uppercased: 'HELLO WORLD'
    });
  });
});