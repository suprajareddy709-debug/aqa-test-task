import { test } from '@playwright/test';
import { AuthPage } from '../../pages/login.page.js';
import { createNewProject,
  updateProject,
  deleteProject
 } from '../../hepler/hepler.js';

test('can create, update and delete project', async ({ page }) => {
  const auth = new AuthPage(page);
  await page.goto('/');
  
  const username = process.env.VIKUNJA_USERNAME!;
  const password = process.env.VIKUNJA_PASSWORD!;

  // Login first
   await auth.login(username, password);

  // Create project
  await createNewProject(page,"My Test Project");

  // // Update project
  await updateProject(page, "My Test Project", "Edit", "My Updated Project");
  
  // Delete project
  await deleteProject(page, "My Updated Project", "Delete");
});