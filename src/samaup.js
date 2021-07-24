const { program } = require("commander");
const puppeteer = require("puppeteer-core");
const clipboardy = require("clipboardy");
const chalk = require("chalk");

program.version("1.0.0").description("Samaup CLI Downloader");

program.option("-u, --url <url>", "URL to download", "");

program.parse();

const { url } = program.opts();

(async () => {
  // https://sama-share.com/ykrgjlvkyuy8

  if (!url) return console.log(chalk.red("URL is required"));
  if (!url.includes("sama-share.com")) return console.log(chalk.red("URL is not valid"));

  const browser = await puppeteer.launch({
    headless: true,
    product: "chrome",
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    defaultViewport: false,
  });

  const page = await browser.newPage();

  await page.goto(url);

  await page.evaluate(() => {
    document.querySelector(".mngez-free-download").click();
  });

  await page.waitForNavigation();

  await page.evaluate(() => {
    document.querySelector(".downloadbtn").disabled = false;
    document.querySelector(".downloadbtn").click();
  });

  await page.waitForNavigation();

  const link = await page.$eval("#direct_link a", (el) => el.href);

  console.log(link);
  clipboardy.writeSync(link);
  console.log(chalk.green("The link copied to your clipboard ✌"));

  await browser.close();
})();
