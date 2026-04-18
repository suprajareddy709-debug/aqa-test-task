import type { Page, Browser } from '@playwright/test';
import { expect, request } from '@playwright/test';
import { ProjectPage } from '../pages/project.page';
import { AuthPage } from '../pages/login.page';

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

// Update Project
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

  await projectPage.confirmDeleteButton.click();

  await expect(projectPage.getProjectByName(name)).toHaveCount(0);
}

// Safe delete
export async function deleteProjectIfExists(page: Page, name: string) {
  const projectPage = new ProjectPage(page);

  if (await projectPage.isProjectVisible(name)) {
    await projectPage.openProjectMenu(name);
    await projectPage.selectProjectAction('Delete');
    await projectPage.confirmDeleteButton.click();

    await expect(projectPage.getProjectByName(name)).toHaveCount(0);
  }
}

// API helpers
export async function getToken(browser: Browser): Promise<string> {
  const context = await browser.newContext();
  const page = await context.newPage();
  const auth = new AuthPage(page);

  await page.goto('http://localhost:8080/login');

  await auth.loginUser(
    process.env.VIKUNJA_USERNAME!,
    process.env.VIKUNJA_PASSWORD!
  );

  const token = await page.evaluate(() =>
    localStorage.getItem('token')
  );

  if (!token) throw new Error('Token not found');

  await context.close();
  return token;
}

export async function getApiContext(browser: Browser) {
  const token = await getToken(browser);

  return request.newContext({
    baseURL: 'http://localhost:8080/api/v1',
    extraHTTPHeaders: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
}