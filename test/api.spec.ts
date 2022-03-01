import * as fs from 'fs';

const packageJson = JSON.parse(fs.readFileSync('./package.json', { encoding: 'utf-8' })) as Partial<{
  name: string;
  version: string;
}>;
const { name, version } = packageJson;

describe('electron APIs', () => {
  describe('custom', () => {
    it('should return the expected response', async () => {
      const result = await browser.electronAPI();
      expect(result).toEqual('test');
    });
  });
  describe('app', () => {
    it('should retrieve app metadata through the electron API', async () => {
      const appName = await browser.electronApp('getName');
      expect(appName).toEqual(name);
      const appVersion = await browser.electronApp('getVersion');
      expect(appVersion).toEqual(version);
    });
  });
});
