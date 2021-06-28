const assert = require('assert');
const {Builder, Key, By, until} = require('selenium-webdriver');
const delay = require('delay');
const timestamp = Date.now();

describe('Coco annotator admin panel page tests', function () {
    let driver;
    before(async function() {
        driver = await new Builder()
        .forBrowser('chrome')
        .build();
        driver.manage().window().maximize();
    });
    beforeEach(async function(){
        await driver.get("http://localhost:5000/#/auth",10000);
    });
    afterEach(async function(){
        await driver.findElement(By.xpath("//a[@id='dropdownMenuLink']")).click();   
        await driver.findElement(By.xpath("//a[contains(text(),'Logout')]")).click();  
    });

    it('Should be created an user when valid values without name', async function() {
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/form[1]/div[1]/input[1]")).sendKeys("test123");
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/form[1]/div[2]/input[1]")).sendKeys("test123");
        await driver.findElement(By.xpath("//button[contains(text(),'Login')]")).click();       
        await driver.findElement(By.xpath("//a[contains(text(),'Admin')]")).click();       
        await driver.wait(until.urlContains("admin/panel"), 20000);
        await delay(200);
        let userCountBeforeCreate=await driver.findElement(By.xpath("/html[1]/body[1]/div[1]/div[1]/div[2]/div[1]/p[1]/strong[1]")).getText();
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[1]/div[1]/button[1]")).click();
        await delay(300);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[3]/div[1]/div[1]/div[2]/form[1]/div[1]/input[1]")).sendKeys("test2"+timestamp);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[3]/div[1]/div[1]/div[2]/form[1]/div[2]/input[1]")).sendKeys("password");
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[3]/div[1]/div[1]/div[3]/button[1]")).click();
        await driver.findElement(By.xpath("//button[contains(text(),'Close')]")).click();
        await delay(200);            
        await driver.findElement(By.xpath("/html[1]/body[1]/div[1]/div[1]/div[2]/div[1]/p[1]/strong[1]")).getText().then(textValue => {
            assert.strictEqual(parseInt(userCountBeforeCreate)+1, parseInt(textValue));
        });   
    });

    it('Should be created an user when valid values without name as admin', async function() {
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/form[1]/div[1]/input[1]")).sendKeys("test123");
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/form[1]/div[2]/input[1]")).sendKeys("test123");
        await driver.findElement(By.xpath("//button[contains(text(),'Login')]")).click();       
        await driver.findElement(By.xpath("//a[contains(text(),'Admin')]")).click();       
        await driver.wait(until.urlContains("admin/panel"), 20000);
        await delay(200);
        let userCountBeforeCreate=await driver.findElement(By.xpath("/html[1]/body[1]/div[1]/div[1]/div[2]/div[1]/p[1]/strong[1]")).getText();
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[1]/div[1]/button[1]")).click();
        await delay(300);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[3]/div[1]/div[1]/div[2]/form[1]/div[1]/input[1]")).sendKeys("test3"+timestamp);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[3]/div[1]/div[1]/div[2]/form[1]/div[2]/input[1]")).sendKeys("password");
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[3]/div[1]/div[1]/div[2]/form[1]/div[4]/input[1]")).click();
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[3]/div[1]/div[1]/div[3]/button[1]")).click();
        await driver.findElement(By.xpath("//button[contains(text(),'Close')]")).click();
        await delay(200);            
        await driver.findElement(By.xpath("/html[1]/body[1]/div[1]/div[1]/div[2]/div[1]/p[1]/strong[1]")).getText().then(textValue => {
            assert.strictEqual(parseInt(userCountBeforeCreate)+1, parseInt(textValue));
        });    
    });

    it('Should be created an user when valid values with name', async function() {
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/form[1]/div[1]/input[1]")).sendKeys("test123");
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/form[1]/div[2]/input[1]")).sendKeys("test123");
        await driver.findElement(By.xpath("//button[contains(text(),'Login')]")).click();       
        await driver.findElement(By.xpath("//a[contains(text(),'Admin')]")).click();       
        await driver.wait(until.urlContains("admin/panel"), 20000);
        await delay(200);
        let userCountBeforeCreate=await driver.findElement(By.xpath("/html[1]/body[1]/div[1]/div[1]/div[2]/div[1]/p[1]/strong[1]")).getText();
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[1]/div[1]/button[1]")).click();
        await delay(300);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[3]/div[1]/div[1]/div[2]/form[1]/div[1]/input[1]")).sendKeys("test4"+timestamp);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[3]/div[1]/div[1]/div[2]/form[1]/div[2]/input[1]")).sendKeys("password");
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[3]/div[1]/div[1]/div[2]/form[1]/div[3]/input[1]")).sendKeys("test3"+timestamp);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[3]/div[1]/div[1]/div[3]/button[1]")).click();
        await driver.findElement(By.xpath("//button[contains(text(),'Close')]")).click();
        await delay(200);            
        await driver.findElement(By.xpath("/html[1]/body[1]/div[1]/div[1]/div[2]/div[1]/p[1]/strong[1]")).getText().then(textValue => {
            assert.strictEqual(parseInt(userCountBeforeCreate)+1, parseInt(textValue));
        });   
    });

    it('Should be created an user when valid values with name as admin', async function() {
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/form[1]/div[1]/input[1]")).sendKeys("test123");
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/form[1]/div[2]/input[1]")).sendKeys("test123");
        await driver.findElement(By.xpath("//button[contains(text(),'Login')]")).click();       
        await driver.findElement(By.xpath("//a[contains(text(),'Admin')]")).click();       
        await driver.wait(until.urlContains("admin/panel"), 20000);
        await delay(200);
        let userCountBeforeCreate=await driver.findElement(By.xpath("/html[1]/body[1]/div[1]/div[1]/div[2]/div[1]/p[1]/strong[1]")).getText();
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[1]/div[1]/button[1]")).click();
        await delay(300);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[3]/div[1]/div[1]/div[2]/form[1]/div[1]/input[1]")).sendKeys("test5"+timestamp);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[3]/div[1]/div[1]/div[2]/form[1]/div[2]/input[1]")).sendKeys("password");
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[3]/div[1]/div[1]/div[2]/form[1]/div[3]/input[1]")).sendKeys("test3"+timestamp);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[3]/div[1]/div[1]/div[2]/form[1]/div[4]/input[1]")).click();
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[3]/div[1]/div[1]/div[3]/button[1]")).click();
        await driver.findElement(By.xpath("//button[contains(text(),'Close')]")).click();
        await delay(200);            
        await driver.findElement(By.xpath("/html[1]/body[1]/div[1]/div[1]/div[2]/div[1]/p[1]/strong[1]")).getText().then(textValue => {
            assert.strictEqual(parseInt(userCountBeforeCreate)+1, parseInt(textValue));
        });  
    });

    it('Should give error message when creating exist user', async function() {
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/form[1]/div[1]/input[1]")).sendKeys("test123");
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/form[1]/div[2]/input[1]")).sendKeys("test123");
        await driver.findElement(By.xpath("//button[contains(text(),'Login')]")).click();       
        await driver.findElement(By.xpath("//a[contains(text(),'Admin')]")).click();       
        await driver.wait(until.urlContains("admin/panel"), 20000);
        await delay(200);
        let userCountBeforeCreate=await driver.findElement(By.xpath("/html[1]/body[1]/div[1]/div[1]/div[2]/div[1]/p[1]/strong[1]")).getText();
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[1]/div[1]/button[1]")).click();
        await delay(300);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[3]/div[1]/div[1]/div[2]/form[1]/div[1]/input[1]")).sendKeys("test2"+timestamp);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[3]/div[1]/div[1]/div[3]/button[1]")).click();
        await delay(150);
        await driver.findElement(By.xpath("//body/div[@id='toast-container']/div[1]")).getText().then(textValue => {
            assert.strictEqual('Create User\nUsername already exists.', textValue);
        });
        await driver.findElement(By.xpath("//button[contains(text(),'Close')]")).click();
        await delay(200);            
        await driver.findElement(By.xpath("/html[1]/body[1]/div[1]/div[1]/div[2]/div[1]/p[1]/strong[1]")).getText().then(textValue => {
            assert.strictEqual(parseInt(userCountBeforeCreate), parseInt(textValue));
        });  
    });

    it.skip('Should be deleted last user', async function() {
        //This case should not be implemented because a warning pop-up appears by the site. We can't take any action here and we can't click the button.
    });

    after(() => driver && driver.quit());
})