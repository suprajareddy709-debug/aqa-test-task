import type { Page, Browser } from '@playwright/test';
import { expect, request } from '@playwright/test';
import { ProjectPage } from '../pages/project.page.js';
import { AuthPage } from '../pages/login.page.js';

// Create Project
export async function createProject(page: Page, name: string) {
  const projectPage = new ProjectPage(page);

  await projectPage.projectsTab.click();

  await deleteProjectIfExists(page, name);

  await projectPage.newProjectButton.click();
  await projectPage.projectTitleInput.fill(name);
  await projectPage.createButton.click();

  await expect(projectPage.getProjectByName(name)).toBeVisible();
}

//  Update Project
export async function updateProjectByName(
  page: Page,
  oldName: string,
  action: string,
  newName: string
) {
  const projectPage = new ProjectPage(page);

  await projectPage.openProjectMenu(oldName);
  await projectPage.selectProjectAction(action);

  await projectPage.editTitleInput.fill(newName);
  await expect(projectPage.saveButton).toBeVisible();
  await projectPage.saveButton.click();

  await expect(projectPage.getProjectByName(newName)).toBeVisible();
}

// Delete Project
export async function deleteProjectByName(
  page: Page,
  name: string,
  action: string
) {
  const projectPage = new ProjectPage(page);

  await projectPage.openProjectMenu(name);
  await projectPage.selectProjectAction(action);

  await expect(projectPage.confirmDeleteButton).toBeVisible();
  await projectPage.confirmDeleteButton.click();

  await expect(projectPage.getProjectByName(name)).toHaveCount(0);
}

// Delete if exists (Reusable + Safe)
export async function deleteProjectIfExists(page: Page, name: string) {
  const projectPage = new ProjectPage(page);

  const exists = await projectPage.isProjectVisible(name);

  if (exists) {
    await projectPage.openProjectMenu(name);
    await projectPage.selectProjectAction('Delete');

    await projectPage.confirmDeleteButton.click();

    await expect(projectPage.getProjectByName(name)).toHaveCount(0);
  }
}

export async function getToken(browser: Browser): Promise<string> {
  const context = await browser.newContext();
  const page = await context.newPage();
  const auth = new AuthPage(page);
  const UI_URL = 'http://localhost:8080';

  await page.goto(`${UI_URL}/login`);

  const USERNAME = process.env.VIKUNJA_USERNAME!;
  const PASSWORD = process.env.VIKUNJA_PASSWORD!;
  await auth.loginUser(USERNAME, PASSWORD);

  await page.waitForLoadState('networkidle');

  const token = await page.evaluate(() => localStorage.getItem('token'));

  if (!token) throw new Error('Token not found after login');

  await context.close();
  return token;
}

export async function getApiContext(browser: Browser) {
  const token = await getToken(browser);
  const BASE_URL = 'http://localhost:8080/api/v1';

  return request.newContext({
    baseURL: BASE_URL,
    extraHTTPHeaders: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
}