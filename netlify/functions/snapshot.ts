import type { Handler } from '@netlify/functions';
import chromium from 'chrome-aws-lambda';

export const handler: Handler = async () => {
  const browser = await chromium.puppeteer.launch({
    executablePath: await chromium.executablePath,
    args: chromium.args,
    defaultViewport: { width: 1920, height: 1080 },
    headless: chromium.headless,
  });

  const page = await browser.newPage();
  const darkMode = { name: 'prefers-color-scheme', value: 'dark' };
  await page.emulateMediaFeatures([darkMode]);
  await page.goto('https://feedjoy.netlify.app', { waitUntil: 'networkidle2' });

  const payload = await page.screenshot({ type: 'png' });

  await browser.close();

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
    body: payload.toString('base64'),
    isBase64Encoded: true,
  };
};
