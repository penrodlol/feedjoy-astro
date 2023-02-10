import type { Handler } from '@netlify/functions';
import puppeteer from 'puppeteer';

export const handler: Handler = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: { width: 1920, height: 1080 },
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
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
