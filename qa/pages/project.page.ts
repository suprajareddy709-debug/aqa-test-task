import { type Page, type Locator, expect } from '@playwright/test';

export class ProjectPage {
  readonly projectsTab: Locator;
  readonly newProjectButton: Locator;
  readonly projectTitleInput: Locator;
  readonly createButton: Locator;
  readonly editTitleInput: Locator;
  readonly saveButton: Locator;
  readonly confirmDeleteButton: Locator;
  readonly deleteConfirmationText: Locator;

  constructor(private page: Page) {
    // Navigation
    this.projectsTab = this.page.getByRole('link', { name: 'Projects' });
    this.newProjectButton = this.page.locator('a:has-text("New project")');

    // Create
    this.projectTitleInput = this.page.locator('[name="projectTitle"]');
    this.createButton = this.page.getByRole('button', { name: 'Create' });

    // Update
    this.editTitleInput = this.page.locator('#title');
    this.saveButton = this.page.getByRole('button', { name: 'Save' });

    // Delete
    this.confirmDeleteButton = this.page.getByRole('button', { name: 'Do it!' });
    this.deleteConfirmationText = this.page.getByText('Delete this project');
  }

  // 🔹 Dynamic project locator
  getProjectByName(name: string): Locator {
    return this.page.getByRole('link', { name }).first();
  }

  // 🔹 3-dots menu button (fixed strict mode)
  getProjectMenuButton(name: string): Locator {
    return this.getProjectByName(name)
      .locator('..')
      .getByRole('button', { name: 'Open project settings menu' });
  }

  async openProjectMenu(projectName: string) {
    const menuButton = this.getProjectMenuButton(projectName);
    await expect(menuButton).toBeVisible();
    await menuButton.click();
  }

  // 🔥 FIXED: dropdown action selector
  async selectProjectAction(action: string) {
    const actionItem = this.page
      .locator('.dropdown-menu:visible')
      .locator('.dropdown-item')
      .filter({ hasText: action });

    await expect(actionItem).toBeVisible();
    await actionItem.click();
  }

  // 🔹 Safe existence check
  async isProjectVisible(name: string): Promise<boolean> {
    return await this.getProjectByName(name).isVisible().catch(() => false);
  }
}