import { Builder } from 'selenium-webdriver';
import { scrapeTrendingTopics } from './scraper.js';

export async function getTrendingTopicsWithProxy() {
  const driver = await new Builder()
    .forBrowser('chrome')
    .build();
  
  try {
    return await scrapeTrendingTopics(driver);
  } finally {
    if (driver) {
      await driver.quit();
    }
  }
}