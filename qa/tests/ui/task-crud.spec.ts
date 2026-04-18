import { test, expect } from '../../fixture';
import {
  createProject,
  updateProjectByName,
  deleteProjectByName
} from '../../hepler/helper.js';

test('can create, update and delete project', { tag: ['@regression', '@Vikunja'] }, async ({ auth, page }) => {

  await auth.navigateToLogin();

  const username = process.env.VIKUNJA_USERNAME!;
  const password = process.env.VIKUNJA_PASSWORD!;
  await auth.loginUser(username, password);

  await createProject(page, 'My Test Project');

  await updateProjectByName(page, 'My Test Project', 'Edit', 'My Updated Project');

  await deleteProjectByName(page, 'My Updated Project', 'Delete');
});