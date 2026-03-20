import type{ Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { ProjectPage } from '../pages/project.page.js';


export async function createNewProject (page: Page, projectName: string) {
   const projectHomePage = new ProjectPage(page);
    await projectHomePage.projectTab.click();
    await projectHomePage.newProjectIcon.click();
    await projectHomePage.projectTitle.fill(projectName);
    await projectHomePage.createButton.click();
    await expect(projectHomePage.projectTitle).toBeVisible(); 
}

export async function updateProject (page: Page, projectName: string, button: string, updatedProjectName:string) {
    const projectHomePage = new ProjectPage(page);
    await page.waitForTimeout(500);
    await projectHomePage.clickOnProjects3dots(projectName);
    await projectHomePage.selectProjectButtons(projectName, button);
    await projectHomePage.updateTitle.fill(updatedProjectName);
    await expect(projectHomePage.saveButton).toBeVisible();
    await projectHomePage.saveButton.click();
}

export async function deleteProject (page: Page, projectName:string, button: string) {
    const projectHomePage = new ProjectPage(page);
    await page.waitForTimeout(500);
    await projectHomePage.clickOnProjects3dots(projectName);
    await projectHomePage.selectProjectButtons(projectName, button);
    await expect(projectHomePage.deleteprojectContent).toBeVisible();
    await expect(projectHomePage.deleteButton).toBeVisible();
    await projectHomePage.deleteButton.click();

}