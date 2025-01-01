import { By, until } from 'selenium-webdriver';
import dotenv from 'dotenv';

dotenv.config();


async function loginToTwitter(driver) {
  try {
    // Go to Twitter login
    await driver.get('https://twitter.com/i/flow/login');
    
    // Wait for and enter username
    const usernameInput = await driver.wait(
      until.elementLocated(By.css('input[autocomplete="username"]')),
      10000
    );
    await usernameInput.sendKeys(process.env.TWITTER_USERNAME);
    
    // Click the Next button
    const nextButton = await driver.wait(
      until.elementLocated(By.css('button[role="button"]:nth-of-type(2)')),
      5000
    );
    await nextButton.click();
    
    // Wait for and enter password
    const passwordInput = await driver.wait(
      until.elementLocated(By.css('input[name="password"]')),
      5000
    );
    await passwordInput.sendKeys(process.env.TWITTER_PASSWORD);
    
    // Click the Login button
    const loginButton = await driver.wait(
      until.elementLocated(By.css('button[data-testid="LoginForm_Login_Button"]')),
      70000000
    );
    await loginButton.click();
    
    // Wait for login to complete
    await driver.wait(
      until.elementLocated(By.css('div[data-testid="primaryColumn"]')),
      10000
    );
  } catch (error) {
    console.error('Login error:', error);
    throw new Error('Failed to login to Twitter: ' + error.message);
  }
}
async function extractTrendingTopics(driver) {
  try {
    // Go to Explore page where trends are shown
    await driver.get('https://x.com/explore');
    
    // Wait for trends section to load
    await driver.wait(
      until.elementLocated(By.css('section[aria-labelledby="accessible-list-0"]')),
      10000
    );
    
    // Get all trend elements
    const trends = await driver.findElements(
      By.css('div[data-testid="trend"]')
    );
    
    // Extract trend text (limited to 5)
    const trendTexts = [];
    for (let i = 0; i < Math.min(5, trends.length); i++) {
      const trendText = await trends[i].getText();
      const lines = trendText.split('\n');
      // Get the main trend text (usually the second line)
      const trend = lines.length > 1 ? lines[1] : lines[0];
      trendTexts.push(trend);
    }
    
    return trendTexts;
  } catch (error) {
    console.error('Extraction error:', error);
    throw new Error('Failed to extract trending topics: ' + error.message);
  }
}

export async function scrapeTrendingTopics(driver) {
  try {
    await loginToTwitter(driver);
    return await extractTrendingTopics(driver);
  } catch (error) {
    console.error('Scraping error:', error);
    throw error;
  }
} 