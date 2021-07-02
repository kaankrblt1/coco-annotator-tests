const assert = require('assert');
const {Builder, Key, By, until} = require('selenium-webdriver');
const delay = require('delay');

describe('Coco annotator login page tests', function () {
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

    it('Should be login and redirect to datasets page when username and password are correct', async function() {
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/form[1]/div[1]/input[1]")).sendKeys("test123");
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/form[1]/div[2]/input[1]")).sendKeys("test123");
        await driver.findElement(By.xpath("//button[contains(text(),'Login')]")).click();       
        await driver.wait(until.urlContains("datasets"), 20000);
        await driver.findElement(By.xpath("//a[@id='dropdownMenuLink']")).click();   
        await driver.findElement(By.xpath("//a[contains(text(),'Logout')]")).click();   
    });
    
    it('Should be nothing when the fields are not filled', async function() {
        await delay(200);     
        await driver.findElement(By.xpath("//button[contains(text(),'Login')]")).click();  
        await driver.wait(until.urlIs("http://localhost:5000/#/auth"));
    });

    it('Should be nothing when only username is filled', async function() {
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/form[1]/div[1]/input[1]")).sendKeys("test123");
        await driver.findElement(By.xpath("//button[contains(text(),'Login')]")).click();       
        await driver.wait(until.urlIs("http://localhost:5000/#/auth"));
    });

    it('Should be nothing when only password is filled', async function() {
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/form[1]/div[2]/input[1]")).sendKeys("test123");
        await driver.findElement(By.xpath("//button[contains(text(),'Login')]")).click();       
        await driver.wait(until.urlIs("http://localhost:5000/#/auth"));
    });
   
    it('Should give errror message when username and password are wrong', async function() {
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/form[1]/div[1]/input[1]")).sendKeys("test123");
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/form[1]/div[2]/input[1]")).sendKeys("test1234");
        await driver.findElement(By.xpath("//button[contains(text(),'Login')]")).click();   
        await driver.findElement(By.xpath("//body/div[@id='toast-container']/div[1]")).getText().then(textValue => {
            assert.strictEqual('User Login\nCould not authenticate user', textValue);
        });
    });

    it('Should redirect to github page when click github link', async function(){
        await driver.findElement(By.xpath("//a[contains(text(),'Github')]")).click();
        await driver.wait(until.urlContains("coco-annotator"));
    });

    after(() => driver && driver.quit());
})