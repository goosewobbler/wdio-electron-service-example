import { expect } from '@wdio/globals';

let browser: typeof import('wdio-electron-service').browser;

describe('application', () => {
  before(async () => {
    ({ browser } = await import('wdio-electron-service'));
  });
  it('should launch the application', async () => {
    await expect(browser).toHaveTitle('Test');
  });

  it('should pass args through to the launched application', async () => {
    // custom args are set in the wdio.conf.js file as they need to be set before WDIO starts
    const argv = await browser.electron.execute(() => process.argv);
    expect(argv).toContain('--foo');
    expect(argv).toContain('--bar=baz');
  });
});
