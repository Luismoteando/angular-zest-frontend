import {browser, element} from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  appRootIsPresent() {
    return element('app-root').isPresent();
  }
}
