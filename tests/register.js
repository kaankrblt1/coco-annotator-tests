const assert = require('assert');
const {Builder, Key, By, until} = require('selenium-webdriver');
const delay = require('delay');
const { del } = require('selenium-webdriver/http');
const timestamp = Date.now();

describe('Coco annotator register page tests', function () {
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

    it('Should be register and show full name and redirect to datasets page when all fields are correct with full name', async function() {
        await driver.findElement(By.xpath("//a[@id='contact-tab']")).click();  
        await delay(150);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[2]/form[1]/div[1]/input[1]")).sendKeys("fullname");
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[2]/form[1]/div[2]/input[1]")).sendKeys("test"+timestamp);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[2]/form[1]/div[3]/input[1]")).sendKeys("password");
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[2]/form[1]/div[4]/input[1]")).sendKeys("password");
        await driver.findElement(By.xpath("//button[contains(text(),'Register')]")).click();    
        await driver.wait(until.urlContains("datasets"), 20000);
        await driver.findElement(By.xpath("//a[@id='dropdownMenuLink']")).getText().then(textValue => {
            assert.strictEqual('fullname', textValue);
        });  
        await driver.findElement(By.xpath("//a[@id='dropdownMenuLink']")).click();    
        await driver.findElement(By.xpath("//a[contains(text(),'Logout')]")).click(); 
    });

    it('Should be register and redirect to datasets page when all fields are correct without full name', async function() {
        await driver.findElement(By.xpath("//a[@id='contact-tab']")).click();  
        await delay(150);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[2]/form[1]/div[2]/input[1]")).sendKeys("test1"+timestamp);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[2]/form[1]/div[3]/input[1]")).sendKeys("password");
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[2]/form[1]/div[4]/input[1]")).sendKeys("password");
        await driver.findElement(By.xpath("//button[contains(text(),'Register')]")).click();    
        await driver.wait(until.urlContains("datasets"), 20000);
        await driver.findElement(By.xpath("//a[@id='dropdownMenuLink']")).getText().then(textValue => {
            assert.strictEqual('test1'+timestamp, textValue);
        });    
        await driver.findElement(By.xpath("//a[@id='dropdownMenuLink']")).click();    
        await driver.findElement(By.xpath("//a[contains(text(),'Logout')]")).click(); 
    });

    it('Should be nothing and not register when the fields are not filled', async function() {
        await driver.findElement(By.xpath("//a[@id='contact-tab']")).click();  
        await delay(150);
        await driver.findElement(By.xpath("//button[contains(text(),'Register')]")).click(); 
        await driver.wait(until.urlIs("http://localhost:5000/#/auth"));
          //console.log(await driver.findElement(By.xpath("//body/div[@id='toast-container']/div[1]")).getText());
    });

    it('Should be nothing and not register when only filled full name', async function() {
        await driver.findElement(By.xpath("//a[@id='contact-tab']")).click();  
        await delay(150);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[2]/form[1]/div[1]/input[1]")).sendKeys("fullname");
        await driver.findElement(By.xpath("//button[contains(text(),'Register')]")).click(); 
        await driver.wait(until.urlIs("http://localhost:5000/#/auth"));
    });

    it('Should be nothing and not register when only filled username', async function() {
        await driver.findElement(By.xpath("//a[@id='contact-tab']")).click();  
        await delay(150);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[2]/form[1]/div[2]/input[1]")).sendKeys("username");
        await driver.findElement(By.xpath("//button[contains(text(),'Register')]")).click(); 
        await driver.wait(until.urlIs("http://localhost:5000/#/auth"));
    });

    it('Should be nothing and not register when only filled password', async function() {
        await driver.findElement(By.xpath("//a[@id='contact-tab']")).click();  
        await delay(150);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[2]/form[1]/div[3]/input[1]")).sendKeys("password");
        await driver.findElement(By.xpath("//button[contains(text(),'Register')]")).click(); 
        await driver.wait(until.urlIs("http://localhost:5000/#/auth"));
    });

    it('Should be nothing and not register when only filled confirm password', async function() {
        await driver.findElement(By.xpath("//a[@id='contact-tab']")).click();  
        await delay(150);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[2]/form[1]/div[4]/input[1]")).sendKeys("password");
        await driver.findElement(By.xpath("//button[contains(text(),'Register')]")).click(); 
        await driver.wait(until.urlIs("http://localhost:5000/#/auth"));
    });

    it('Should be nothing and not register when only filled password and confirm password', async function() {
        await driver.findElement(By.xpath("//a[@id='contact-tab']")).click();  
        await delay(150);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[2]/form[1]/div[3]/input[1]")).sendKeys("password");
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[2]/form[1]/div[4]/input[1]")).sendKeys("password");
        await driver.findElement(By.xpath("//button[contains(text(),'Register')]")).click(); 
        await driver.wait(until.urlIs("http://localhost:5000/#/auth"));
    });

    it('Should be nothing and not register when only filled full name and username', async function() {
        await driver.findElement(By.xpath("//a[@id='contact-tab']")).click();  
        await delay(150);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[2]/form[1]/div[1]/input[1]")).sendKeys("fullname");
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[2]/form[1]/div[2]/input[1]")).sendKeys("username");
        await driver.findElement(By.xpath("//button[contains(text(),'Register')]")).click(); 
        await driver.wait(until.urlIs("http://localhost:5000/#/auth"));
    });

    it('Should be nothing and not register when only filled full name and password', async function() {
        await driver.findElement(By.xpath("//a[@id='contact-tab']")).click();  
        await delay(150);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[2]/form[1]/div[1]/input[1]")).sendKeys("fullname");
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[2]/form[1]/div[3]/input[1]")).sendKeys("password");
        await driver.findElement(By.xpath("//button[contains(text(),'Register')]")).click(); 
        await driver.wait(until.urlIs("http://localhost:5000/#/auth"));
    });

    it('Should be nothing and not register when only filled full name and confirm password', async function() {
        await driver.findElement(By.xpath("//a[@id='contact-tab']")).click();  
        await delay(150);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[2]/form[1]/div[1]/input[1]")).sendKeys("fullname");
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[2]/form[1]/div[4]/input[1]")).sendKeys("password");
        await driver.findElement(By.xpath("//button[contains(text(),'Register')]")).click(); 
        await driver.wait(until.urlIs("http://localhost:5000/#/auth"));
    });

    it('Should be nothing and not register when only filled full name and passwords', async function() {
        await driver.findElement(By.xpath("//a[@id='contact-tab']")).click();  
        await delay(150);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[2]/form[1]/div[1]/input[1]")).sendKeys("fullname");
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[2]/form[1]/div[3]/input[1]")).sendKeys("password");
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[2]/form[1]/div[4]/input[1]")).sendKeys("password");
        await driver.findElement(By.xpath("//button[contains(text(),'Register')]")).click(); 
        await driver.wait(until.urlIs("http://localhost:5000/#/auth"));
    });

    it('Should give errror message when Username is invalid format', async function() {
        await driver.findElement(By.xpath("//a[@id='contact-tab']")).click();  
        await delay(150);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[2]/form[1]/div[2]/input[1]")).sendKeys("ü");
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[2]/form[1]/div[2]/div[1]"));
        //console.log(await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[2]/form[1]/div[2]/div[1]")).getText());
        await driver.findElement(By.xpath("//div[contains(text(),'Minimum length of 5 characters.')]"));
    });

    it('Should give errror message when password length is less than 5', async function() {
        await driver.findElement(By.xpath("//a[@id='contact-tab']")).click();  
        await delay(150);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[2]/form[1]/div[3]/input[1]")).sendKeys("pass");
        await driver.findElement(By.xpath("//div[contains(text(),'Minimum length of 5 characters.')]"));
    });

    it('Should give errror message when username already exist', async function() {
        await driver.findElement(By.xpath("//a[@id='contact-tab']")).click();  
        await delay(150);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[2]/form[1]/div[2]/input[1]")).sendKeys("test123");
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[2]/form[1]/div[3]/input[1]")).sendKeys("test123");
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[2]/form[1]/div[4]/input[1]")).sendKeys("test123");
        await driver.findElement(By.xpath("//button[contains(text(),'Register')]")).click(); 
        await driver.findElement(By.xpath("//body/div[@id='toast-container']/div[1]"));   
    });

    after(() => driver && driver.quit());
})