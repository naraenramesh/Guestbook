import { browser, by, element, logging } from 'protractor';

describe('Chain locators demo', () => {


  it('Open Angular js website',async ()=> {
    await browser.get(browser.baseUrl);
    //repeater ,  chain locators, And css for identical tags
    await element(by.id("email")).sendKeys("Adminuser@admin.com");
    await element(by.id("password")).sendKeys("Adminuser");
    await element(by.id("submit")).click();
    await browser.sleep(10000);
    
    
    
    
    })
    
  
});
