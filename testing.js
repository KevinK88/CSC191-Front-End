// require("chromedriver");
const { Builder, By, Key, util } = require("selenium-webdriver");
// const chrome = require("selenium-webdriver/chrome");
// const options = new chrome.Options();

driver = new Builder().forBrowser("chrome").build();

async function signup() {
  await driver.get("https://intangible-manager.herokuapp.com/signup");
  await driver.findElement(By.id("email")).sendKeys("auto@email.com");
  await driver.findElement(By.id("password")).sendKeys("123456");
  await driver
    .findElement(By.id("confirmPassword"))
    .sendKeys("123456", Key.RETURN);
}

// signup();
