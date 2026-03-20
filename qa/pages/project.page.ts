import{ type Page, type Locator, expect } from '@playwright/test';

export class ProjectPage {
    readonly projectTab: Locator;
    readonly newProjectIcon: Locator;
    readonly projectTitle: Locator;
    readonly createButton : Locator;
    readonly updateTitle: Locator;
    readonly saveButton: Locator;
    readonly deleteButton: Locator;
    readonly deleteprojectContent: Locator;

  constructor(private page: Page) {
    this.projectTab = this.page.locator('//span[contains(@class,"menu-item-icon icon")]/following-sibling::text()[contains(.,"Projects")]/parent::*');
    this.newProjectIcon = this.page.locator('//span[text()="New project"]');
    this.projectTitle = this.page.locator('[name="projectTitle"]')
    this.createButton = this.page.locator('//span[text()="Create"]');
    this.updateTitle = this.page.locator('[id="title"]');
    this.saveButton = this.page.locator('//span[text()="Save"]');
    this.deleteButton = this.page.locator('//span[text()="Do it!"]');
    this.deleteprojectContent = this.page.locator('//span[contains(text(),"Delete this project")]');
  }

  async clickOnProjects3dots(projectName: string) {
    const threeDots = this.page.locator(`//span[text()="${projectName}"]/ancestor::div[contains(@class, "navigation-item")]//span[text()="Open project settings menu"]/parent::button`);
    await expect(threeDots).toBeVisible()
    await threeDots.click();
  }

  async selectProjectButtons(projectName: string, button: string) {
    const selectButton = this.page.locator(`//span[text()="${projectName}"]/ancestor::div[contains(@class, "navigation-item")]//div/child::a/span[text()="${button}"]`);
    await expect(selectButton).toBeVisible()
    await selectButton.click();
  }

  async isProjectPresent(projectName: string) {
    const locator = this.page.locator(`//a[@class="base-button list-menu-link"]/child::span[text()="${projectName}"]`);
    return await locator.isVisible().catch(() => false);
    }

    async projectName(projectName: string) {
        return this.page.locator(`//a[@class="base-button list-menu-link"]/child::span[text()="${projectName}"]`);
    }
}