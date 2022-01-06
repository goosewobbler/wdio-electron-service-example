import { Browser, WaitUntilOptions } from 'webdriverio';

async function waitUntilTextExists(
  this: Browser<'async'>,
  selector: string,
  text: string,
  timeout: Partial<WaitUntilOptions>,
) {
  try {
    await this.waitUntil(async () => {
      const elem = await browser.$(selector);
      if (!(await elem.isExisting())) {
        return false;
      }
      const selectorText = await elem.getText();
      return Array.isArray(selectorText)
        ? selectorText.some((s: string[]) => s.includes(text))
        : selectorText.includes(text);
    }, timeout || 5000);
  } catch (error) {
    throw new Error(`waitUntilTextExists error: ${(error as Error).message}`);
  }
}

before(() => {
  browser.addCommand('waitUntilTextExists', waitUntilTextExists);
});

describe('application loading', () => {
  describe('App', () => {
    it('should launch the application', async () => {
      // await browser.waitUntilTextExists('html', 'Hello');
      const title = await browser.getTitle();
      expect(title).toEqual('Test');
    });

    // it('should pass args through to the launched application', async () => {
    //   // custom args are set in the wdio.conf.js file as they need to be set before WDIO starts
    //   const argv = await app.mainProcess.argv();
    //   expect(argv).toContain('--foo');
    //   expect(argv).toContain('--bar=baz');
    // });
  });
});
