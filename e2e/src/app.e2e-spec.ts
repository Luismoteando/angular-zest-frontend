import {AppPage} from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should render app root', () => {
    page.navigateTo();
    expect(page.appRootIsPresent());
  });
});
