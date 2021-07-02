const assert = require('assert');
const {Builder, Key, By, until} = require('selenium-webdriver');
const delay = require('delay');
const timestamp = Date.now();

describe('Coco annotator categories page tests', function () {
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
        await driver.findElement(By.xpath("//a[contains(text(),'Categories')]")).click();       
        await driver.wait(until.urlContains("categories"), 20000);
    });
    afterEach(async function(){
        await driver.findElement(By.xpath("//a[@id='dropdownMenuLink']")).click();   
        await driver.findElement(By.xpath("//a[contains(text(),'Logout')]")).click();  
    });

    it('Should be created a category when filled valid values', async function() {
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[1]/div[1]/button[1]")).click();   
        await delay(150);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[3]/div[1]/div[1]/div[2]/form[1]/div[1]/input[1]")).sendKeys("testCategory"+timestamp);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[3]/div[1]/div[1]/div[2]/form[1]/div[2]/input[1]")).sendKeys("superCategory"+timestamp);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[3]/div[1]/div[1]/div[2]/form[1]/div[4]/div[1]/i[1]")).click(); 
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[3]/div[1]/div[1]/div[2]/form[1]/div[4]/div[1]/form[1]/ul[1]/li[last()]/div[1]/div[1]/input[1]")).sendKeys("testLabel"+timestamp);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[3]/div[1]/div[1]/div[2]/form[1]/div[4]/div[1]/form[1]/ul[1]/li[last()]/div[1]/div[3]/div[1]/div[1]/input[1]")).sendKeys("testConnect"+timestamp);
        await driver.findElement(By.xpath("//button[contains(text(),'Create Category')]")).click(); 
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[3]/div[1]/div[1]/div[3]/button[2]")).click();        
    });

    it('Should be created a category when only filled categoryName', async function() {
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[1]/div[1]/button[1]")).click();   
        await delay(150);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[3]/div[1]/div[1]/div[2]/form[1]/div[1]/input[1]")).sendKeys("testCategory"+timestamp);
        await driver.findElement(By.xpath("//button[contains(text(),'Create Category')]")).click(); 
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[3]/div[1]/div[1]/div[3]/button[2]")).click();        
    });

    it('Should be created a category when only filled categoryName and keyPoints', async function() {
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[1]/div[1]/button[1]")).click();   
        await delay(150);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[3]/div[1]/div[1]/div[2]/form[1]/div[1]/input[1]")).sendKeys("testCategory"+timestamp);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[3]/div[1]/div[1]/div[2]/form[1]/div[4]/div[1]/i[1]")).click(); 
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[3]/div[1]/div[1]/div[2]/form[1]/div[4]/div[1]/form[1]/ul[1]/li[last()]/div[1]/div[1]/input[1]")).sendKeys("testLabel"+timestamp);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[3]/div[1]/div[1]/div[2]/form[1]/div[4]/div[1]/form[1]/ul[1]/li[last()]/div[1]/div[3]/div[1]/div[1]/input[1]")).sendKeys("testConnect"+timestamp);
        await driver.findElement(By.xpath("//button[contains(text(),'Create Category')]")).click();
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[3]/div[1]/div[1]/div[3]/button[2]")).click();        
    });

    it('Should be edited a category when no changes', async function() {
        await delay(150);
        await driver.findElement(By.xpath("/html[1]/body[1]/div[1]/div[1]/div[2]/div[1]/div[2]/div[2]/div[last()]/div[1]/div[1]/i[1]")).click();   
        await delay(150);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[2]/div[last()]/div[1]/div[1]/div[2]/button[1]")).click();  
        await delay(300);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[2]/div[last()]/div[2]/div[1]/div[1]/div[3]/button[1]")).click();
        await delay(150);
        await driver.findElement(By.xpath("//body/div[@id='toast-container']/div[1]")).getText().then(textValue => {
            assert.strictEqual('Updating Category\nCategory successfully updated', textValue);
        });        
    });

    it('Should be edited a category when only filled categoryName', async function() {
        await delay(150);
        await driver.findElement(By.xpath("/html[1]/body[1]/div[1]/div[1]/div[2]/div[1]/div[2]/div[2]/div[last()]/div[1]/div[1]/i[1]")).click();   
        await delay(150);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[2]/div[last()]/div[1]/div[1]/div[2]/button[1]")).click();  
        await delay(150);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[2]/div[last()]/div[2]/div[1]/div[1]/div[2]/form[1]/div[1]/input[1]")).clear();
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[2]/div[last()]/div[2]/div[1]/div[1]/div[2]/form[1]/div[1]/input[1]")).sendKeys("updatedCategory"+timestamp);
        await delay(300);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[2]/div[last()]/div[2]/div[1]/div[1]/div[3]/button[1]")).click();
        await delay(150);
        await driver.findElement(By.xpath("//body/div[@id='toast-container']/div[1]")).getText().then(textValue => {
            assert.strictEqual('Updating Category\nCategory successfully updated', textValue);
        });       
    });
    
    it.skip('Should be edited a category when only filled categoryName and keyPoints', async function() {
        //This a flaky test. It starts giving an error after the number of keyPoints increases.
        await delay(150);
        await driver.findElement(By.xpath("/html[1]/body[1]/div[1]/div[1]/div[2]/div[1]/div[2]/div[2]/div[last()]/div[1]/div[1]/i[1]")).click();   
        await delay(150);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[2]/div[last()]/div[1]/div[1]/div[2]/button[1]")).click();  
        await delay(150);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[2]/div[last()]/div[2]/div[1]/div[1]/div[2]/form[1]/div[1]/input[1]")).clear();
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[2]/div[last()]/div[2]/div[1]/div[1]/div[2]/form[1]/div[1]/input[1]")).sendKeys("updatedCategory"+timestamp);
        await delay(300);
        await driver.findElement(By.xpath("//body[1]/div[1]/div[1]/div[2]/div[1]/div[2]/div[2]/div[last()]/div[2]/div[1]/div[1]/div[2]/form[1]/div[4]/div[1]/i[1]")).click();  
        await delay(150);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[2]/div[last()]/div[2]/div[1]/div[1]/div[2]/form[1]/div[4]/div[1]/form[1]/ul[1]/li[last()]/div[1]/div[1]/input[1]")).sendKeys("updatedLabel"+timestamp);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[2]/div[last()]/div[2]/div[1]/div[1]/div[2]/form[1]/div[4]/div[1]/form[1]/ul[1]/li[last()]/div[1]/div[3]/div[1]/div[1]/input[1]")).sendKeys("updatedConnect"+timestamp);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[2]/div[last()]/div[2]/div[1]/div[1]/div[3]/button[1]")).click();
        await delay(150);
        await driver.findElement(By.xpath("//body/div[@id='toast-container']/div[1]")).getText().then(textValue => {
            assert.strictEqual('Updating Category\nCategory successfully updated', textValue);
        });        
    });

    after(() => driver && driver.quit());
})