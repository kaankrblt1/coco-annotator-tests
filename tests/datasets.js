const assert = require('assert');
const {Builder, Key, By, until} = require('selenium-webdriver');
const delay = require('delay');
const timestamp = Date.now();


describe('Coco annotator datasets page tests', function () {
    let driver;
    before(async function() {
        driver = await new Builder()
        .forBrowser('chrome')
        .build();
        driver.manage().window().maximize();
    });
    beforeEach(async function(){
        await driver.get("http://localhost:5000/#/auth",10000);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/form[1]/div[1]/input[1]")).sendKeys("test123");
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/form[1]/div[2]/input[1]")).sendKeys("test123");
        await driver.findElement(By.xpath("//button[contains(text(),'Login')]")).click();       
        await driver.wait(until.urlContains("datasets"), 20000);
    });
    afterEach(async function(){
        await driver.findElement(By.xpath("//a[@id='dropdownMenuLink']")).click();   
        await driver.findElement(By.xpath("//a[contains(text(),'Logout')]")).click();  
    });

    it('Should create a dataset when filled valid values', async function() {
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[1]/div[1]/button[1]")).click();   
        await delay(150);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[3]/div[1]/div[1]/div[2]/form[1]/div[1]/input[1]")).sendKeys("test"+timestamp);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[3]/div[1]/div[1]/div[2]/form[1]/div[2]/div[1]/div[1]/input[1]")).sendKeys("test"+timestamp);
        await driver.findElement(By.xpath("//button[contains(text(),'Create Dataset')]")).click();   
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[3]/div[1]/div[1]/div[3]/button[2]")).click();
    });

    it('Should create a dataset when without categories', async function() {
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[1]/div[1]/button[1]")).click();   
        await delay(150);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[3]/div[1]/div[1]/div[2]/form[1]/div[1]/input[1]")).sendKeys("test1"+timestamp);
        await driver.findElement(By.xpath("//button[contains(text(),'Create Dataset')]")).click();   
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[3]/div[1]/div[1]/div[3]/button[2]")).click();  
    });
    
    it('Should give error when dataset name is empty', async function() {
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[1]/div[1]/button[1]")).click();   
        await delay(300); 
        await driver.findElement(By.xpath("//div[contains(text(),'Dataset name is required')]")).getText().then(textValue => {
            assert.strictEqual('Dataset name is required', textValue);
        });
        await driver.findElement(By.xpath("//button[contains(text(),'Create Dataset')]")).click();   
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[3]/div[1]/div[1]/div[3]/button[2]")).click();  
    });

    it('Should give error when dataset name is exist', async function() {
        await delay(400);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[1]/div[1]/button[1]")).click();   
        await delay(150);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[3]/div[1]/div[1]/div[2]/form[1]/div[1]/input[1]")).sendKeys("test");
        await driver.findElement(By.xpath("//button[contains(text(),'Create Dataset')]")).click(); 
        await delay(150);
        await driver.findElement(By.xpath("//body/div[@id='toast-container']/div[1]")).getText().then(textValue => {
            assert.strictEqual('Creating Dataset\nDataset already exists. Check the undo tab to fully delete the dataset.', textValue);
        });
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[3]/div[1]/div[1]/div[3]/button[2]")).click(); 
    });

    it('Should delete last dataset', async function() {
        await delay(200);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[2]/div[last()]/div[1]/div[1]/i[1]")).click(); 
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[2]/div[last()]/div[1]/div[1]/div[2]/button[4]")).click();
        await delay(200);
    });

    after(() => driver && driver.quit());
})