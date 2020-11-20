require("chromedriver");

const { Builder, By, Key, util, logging } = require("selenium-webdriver");
// const chrome = require("selenium-webdriver/chrome");
// const options = new chrome.Options();

driver = new Builder().forBrowser("chrome").build();
driver.manage().window().maximize();

async function signup() {
  await driver.get("https://intangible-manager.herokuapp.com/signup");
  await driver.findElement(By.id("email")).sendKeys("auto@email.com");
  await driver.findElement(By.id("password")).sendKeys("123456");
  await driver
    .findElement(By.id("confirmPassword"))
    .sendKeys("123456", Key.RETURN);
}

async function login() {
  await driver.get("https://intangible-manager.herokuapp.com/login");
  await driver.findElement(By.id("email")).sendKeys("user@email.com");
  await driver.findElement(By.id("password")).sendKeys("123456", Key.RETURN);
}

async function createProject() {
  await login();
  setTimeout(() => {
    driver.findElement(By.linkText(`New Project`)).click();
  }, 5000);

  setTimeout(() => {
    driver.findElement(By.id("projectName")).clear();
    driver
      .findElement(By.id("projectName"))
      .sendKeys("Creat a project automated test", Key.RETURN);
  }, 7000);
}

async function createTask() {
  await login();
  setTimeout(() => {
    driver.findElement(By.linkText(`Create a project automated test`)).click();
  }, 2000);

  setTimeout(() => {
    driver.findElement(By.linkText("New Task")).click();
  }, 4000);

  setTimeout(() => {
    driver.findElement(By.id("taskName")).sendKeys("Automated task name");
    driver
      .findElement(By.id("taskDescription"))
      .sendKeys("Automated task description...");
    driver.findElement(By.id("priority")).clear();
    driver.findElement(By.id("priority")).sendKeys("999");
    driver.findElement(By.id("dueDate")).sendKeys("12", "30", "1999");
    driver.findElement(By.id("completed")).sendKeys("c");
    driver.findElement(By.id("taskName")).sendKeys(Key.RETURN);
  }, 6000);
}

async function createSubTask() {
  await login();
  setTimeout(() => {
    driver.findElement(By.linkText(`Create a project automated test`)).click();
  }, 2000);

  setTimeout(() => {
    driver.findElement(By.xpath("/html/body/div/main/div/div/a/h4")).click();
  }, 4000);

  setTimeout(() => {
    driver.findElement(By.linkText("New Subtask")).click();
  }, 6000);

  setTimeout(() => {
    driver.findElement(By.id("taskName")).sendKeys("automated subtask");

    driver
      .findElement(By.id("taskDescription"))
      .sendKeys("auto sub description");

    driver.findElement(By.id("priority")).sendKeys("19");

    driver.findElement(By.id("dueDate")).sendKeys("05", "28", "2022");
    // driver.findElement(By.id("completed")).sendKeys("i");
    driver.findElement(By.id("taskName")).sendKeys(Key.RETURN);
  }, 8000);
}

// createSubTask();
// createTask();
// createProject();
// login();
// signup();
