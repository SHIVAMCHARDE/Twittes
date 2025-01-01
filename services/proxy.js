import { Builder } from 'selenium-webdriver';
import dotenv from 'dotenv';

dotenv.config();

export function createProxyDriver() {
  const proxyUrl = process.env.PROXYMESH_URL;
  
  return new Builder()
    .forBrowser('chrome')
    .usingWebDriver(driver => {
      driver.setProxy({
        httpProxy: proxyUrl,
        sslProxy: proxyUrl
      });
      return driver;
    })
    .build();
}