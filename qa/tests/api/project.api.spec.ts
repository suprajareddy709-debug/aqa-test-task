import { test, expect } from '../../fixture';
import { request } from  '@playwright/test'


const BASE_URL = 'http://localhost:8080/api/v1';

const USERNAME = process.env.VIKUNJA_USERNAME!;


test.describe('Vikunja API Tests',  { tag: ['@Vikunja'] }, () => {

  test('GET current user', async ({api}) => {
    const res = await api.get(`${BASE_URL}/user`);

    expect(res.status()).toBe(200);

    const body = await res.json();
    expect(body.username).toBe(USERNAME);
  });

    test('POST create a new task', async ({api}) => {
    const taskPayload = {
      title: 'Test task from Playwright',
      project_id: 1,
      due: '2026-03-21T12:00:00Z',
      description: 'This task was created via API test.',
    };

    const res = await api.post('/tasks', { data: taskPayload });
    expect(res.status()).toBe(200);

    if (res.headers()['content-type']?.includes('application/json')) {
      const body = await res.json();
      expect(body.title).toBe(taskPayload.title);
    } else {
      const text = await res.text();
      console.error('Non-JSON response:', text);
    }
  });

  test('PUT update a task', async ({api}) => {
    const taskId = 1; 

    const updatePayload = {
      title: 'Updated task title',
      description: 'Updated via Playwright PUT request',
      due: '2026-03-22T12:00:00Z',
    };

    const res = await api.put(`/tasks/${taskId}`, { data: updatePayload });
    expect(res.status()).toBe(200);

    if (res.headers()['content-type']?.includes('application/json')) {
      const body = await res.json();
      expect(body.title).toBe(updatePayload.title);
    } else {
      const text = await res.text();
      console.error('Non-JSON response:', text);
    }
  });

  test('GET user without token', async () => {
    const noAuth = await request.newContext({
      baseURL: BASE_URL,
    });

    const res = await noAuth.get('/user');

    expect([200, 401]).toContain(res.status());
  });

  
});