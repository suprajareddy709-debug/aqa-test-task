import { test, expect, request } from '@playwright/test';
import type { APIRequestContext } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.BASE_URL || 'http://localhost:8080/api/v1';
const USER_JWT = process.env.USER_JWT!;

test.describe('Vikunja API tests', () => {
  let api: APIRequestContext;

  test.beforeAll(async () => {
    api = await request.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: {
        'Authorization': `Bearer ${USER_JWT}`,
        'Content-Type': 'application/json',
      },
    });
  });

  test('GET current user', async () => {
    const res = await api.get('/user');
    expect(res.status()).toBe(200);

    if (res.headers()['content-type']?.includes('application/json')) {
      const body = await res.json();
      expect(body.username).toBe('testuser');
    } else {
      const text = await res.text();
      console.error('Non-JSON response:', text);
    }
  });

  test('POST create a new task', async () => {
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

  test('PUT update a task', async () => {
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

  test.afterAll(async () => {
    await api.dispose();
  });
});