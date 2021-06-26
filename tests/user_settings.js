const assert = require('assert');
const {Builder, Key, By, until} = require('selenium-webdriver');
const delay = require('delay');
const { del } = require('selenium-webdriver/http');
const timestamp = Date.now();

describe('Coco annotator user page tests', function () {
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

    it('Should change password when filled valid values', async function() {
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
        await driver.findElement(By.xpath("//a[contains(text(),'User Settings')]")).click();    
        await driver.wait(until.urlContains("user"), 20000);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[1]/form[1]/div[1]/input[1]")).sendKeys("password");
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[1]/form[1]/div[2]/input[1]")).sendKeys("password1");
        await driver.findElement(By.xpath("//button[contains(text(),'Submit')]")).click();   
        await delay(150);
        await driver.findElement(By.xpath("//body/div[@id='toast-container']/div[1]")).getText().then(textValue => {
            assert.strictEqual('Changing Password\nPassword has been changed', textValue);
        });
    });

    it('Should give errror message when password length is less than 5', async function() {
        await driver.findElement(By.xpath("//a[@id='contact-tab']")).click();  
        await delay(150);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[2]/form[1]/div[1]/input[1]")).sendKeys("fullname");
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[2]/form[1]/div[2]/input[1]")).sendKeys("test1"+timestamp);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[2]/form[1]/div[3]/input[1]")).sendKeys("password");
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[2]/form[1]/div[4]/input[1]")).sendKeys("password");
        await driver.findElement(By.xpath("//button[contains(text(),'Register')]")).click();    
        await driver.wait(until.urlContains("datasets"), 20000);
        await driver.findElement(By.xpath("//a[@id='dropdownMenuLink']")).getText().then(textValue => {
            assert.strictEqual('fullname', textValue);
        });      
        await driver.findElement(By.xpath("//a[@id='dropdownMenuLink']")).click();    
        await driver.findElement(By.xpath("//a[contains(text(),'User Settings')]")).click();    
        await driver.wait(until.urlContains("user"), 20000);
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[1]/form[1]/div[1]/input[1]")).sendKeys("password");
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[1]/form[1]/div[2]/input[1]")).sendKeys("pass");
        await driver.findElement(By.xpath("//div[contains(text(),'Minimum length of 5 characters.')]"));
    });

    after(() => driver && driver.quit());
})