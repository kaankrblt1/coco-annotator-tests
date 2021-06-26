const assert = require('assert');
const {Builder, Key, By, until} = require('selenium-webdriver');
const delay = require('delay')

describe('Coco annotator homepage page tests', function () {
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

    it('Should redirect datasets page when click datasets link', async function() {
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/form[1]/div[1]/input[1]")).sendKeys("test123");
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/form[1]/div[2]/input[1]")).sendKeys("test123");
        await driver.findElement(By.xpath("//button[contains(text(),'Login')]")).click();       
        await driver.findElement(By.xpath("//a[contains(text(),'Datasets')]")).click();       
        await driver.wait(until.urlContains("datasets"), 20000);
        await driver.findElement(By.xpath("//a[@id='dropdownMenuLink']")).click();   
        await driver.findElement(By.xpath("//a[contains(text(),'Logout')]")).click();   
    });

    it('Should redirect categories page when click categories link', async function() {
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/form[1]/div[1]/input[1]")).sendKeys("test123");
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/form[1]/div[2]/input[1]")).sendKeys("test123");
        await driver.findElement(By.xpath("//button[contains(text(),'Login')]")).click();       
        await driver.findElement(By.xpath("//a[contains(text(),'Categories')]")).click();       
        await driver.wait(until.urlContains("categories"), 20000);
        await driver.findElement(By.xpath("//a[@id='dropdownMenuLink']")).click();   
        await driver.findElement(By.xpath("//a[contains(text(),'Logout')]")).click();   
    });

    it('Should redirect undo page when click undo link', async function() {
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/form[1]/div[1]/input[1]")).sendKeys("test123");
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/form[1]/div[2]/input[1]")).sendKeys("test123");
        await driver.findElement(By.xpath("//button[contains(text(),'Login')]")).click();       
        await driver.findElement(By.xpath("//a[contains(text(),'Undo')]")).click();       
        await driver.wait(until.urlContains("undo"), 20000);
        await driver.findElement(By.xpath("//a[@id='dropdownMenuLink']")).click();   
        await driver.findElement(By.xpath("//a[contains(text(),'Logout')]")).click();   
    });

    it('Should redirect tasks page when click tasks link', async function() {
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/form[1]/div[1]/input[1]")).sendKeys("test123");
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/form[1]/div[2]/input[1]")).sendKeys("test123");
        await driver.findElement(By.xpath("//button[contains(text(),'Login')]")).click();       
        await driver.findElement(By.xpath("//a[contains(text(),'Tasks')]")).click();       
        await driver.wait(until.urlContains("tasks"), 20000);
        await driver.findElement(By.xpath("//a[@id='dropdownMenuLink']")).click();   
        await driver.findElement(By.xpath("//a[contains(text(),'Logout')]")).click();   
    });

    it('Should redirect admin panel page when click admin link', async function() {
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/form[1]/div[1]/input[1]")).sendKeys("test123");
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/form[1]/div[2]/input[1]")).sendKeys("test123");
        await driver.findElement(By.xpath("//button[contains(text(),'Login')]")).click();       
        await driver.findElement(By.xpath("//a[contains(text(),'Admin')]")).click();       
        await driver.wait(until.urlContains("admin/panel"), 20000);
        await driver.findElement(By.xpath("//a[@id='dropdownMenuLink']")).click();   
        await driver.findElement(By.xpath("//a[contains(text(),'Logout')]")).click();   
    });

    it('Should redirect api page when click api link', async function() {
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/form[1]/div[1]/input[1]")).sendKeys("test123");
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/form[1]/div[2]/input[1]")).sendKeys("test123");
        await driver.findElement(By.xpath("//button[contains(text(),'Login')]")).click();       
        await driver.findElement(By.xpath("//a[contains(text(),'API')]")).click();       
        await driver.wait(until.urlContains("/api/"), 20000);
        await driver.get("http://localhost:5000/#/auth",10000);
        await driver.findElement(By.xpath("//a[@id='dropdownMenuLink']")).click();   
        await driver.findElement(By.xpath("//a[contains(text(),'Logout')]")).click();   
    });

    it('Should redirect to github page when click help link', async function() {
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/form[1]/div[1]/input[1]")).sendKeys("test123");
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/form[1]/div[2]/input[1]")).sendKeys("test123");
        await driver.findElement(By.xpath("//button[contains(text(),'Login')]")).click();       
        await driver.findElement(By.xpath("//a[contains(text(),'Help')]")).click();       
        await driver.wait(until.urlContains("jsbroks/coco-annotator/wiki"), 20000);
        await driver.get("http://localhost:5000/#/auth",10000);
        await driver.findElement(By.xpath("//a[@id='dropdownMenuLink']")).click();   
        await driver.findElement(By.xpath("//a[contains(text(),'Logout')]")).click();  
    });

    it('Should redirect to user page when click user settings link', async function() {
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/form[1]/div[1]/input[1]")).sendKeys("test123");
        await driver.findElement(By.xpath("//body/div[@id='app']/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/form[1]/div[2]/input[1]")).sendKeys("test123");
        await driver.findElement(By.xpath("//button[contains(text(),'Login')]")).click();       
        await driver.findElement(By.xpath("//a[@id='dropdownMenuLink']")).click(); 
        await driver.findElement(By.xpath("//a[contains(text(),'User Settings')]")).click();  
        await driver.wait(until.urlContains("/user"), 20000);
        await driver.findElement(By.xpath("//a[@id='dropdownMenuLink']")).click(); 
        await driver.findElement(By.xpath("//a[contains(text(),'Logout')]")).click();  
    });
    
    after(() => driver && driver.quit());
})