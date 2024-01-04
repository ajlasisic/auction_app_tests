import RegisterPage from "../pageObjects/RegisterPage.js";
import { invalidEmail, invalidPassword, loginUser } from "../data/login.js";
import { existingUser, registerUser } from "../data/register.js"
import LoginPage from "../pageObjects/LoginPage.js";
import HomePage from "../pageObjects/HomePage.js";
import ProductPage from "../pageObjects/ProductPage.js";
import { footerLinks, socialMedia } from "../data/urls.js";

describe("Regression test", () => {
  beforeEach(function () {
        browser.url('/');
  });
  it("Login with incorrect email", async () => {
    await LoginPage.login(invalidEmail.email, loginUser.password);
    await LoginPage.verifyErrorMsgText(LoginPage.errorMessage, invalidEmail.errorEmail)
  });
  it("Login with incorrect password", async () => {
    await LoginPage.login(loginUser.email, invalidPassword.password);
    await LoginPage.verifyErrorMsgText(LoginPage.errorMessage, invalidPassword.errorPassword)
  });
  it("Register with existing email", async () => {
    await RegisterPage.register(existingUser.firstName, existingUser.lastName, existingUser.email, existingUser.password)
    await RegisterPage.verifyErrorMsgText(RegisterPage.errorMessage, existingUser.errorMsg)
  });
  it("Register with weak password", async () => {
    await RegisterPage.register(registerUser.firstName, registerUser.lastName, registerUser.email, invalidPassword.password)
    await RegisterPage.verifyErrorMsgText(RegisterPage.errorMessage, invalidPassword.errorPassword)
  });
  it("Check Jewelry section", async () => {
    await HomePage.clickElement(HomePage.jewelryLink)
    await ProductPage.verifyEmptyCategoryMsg()
  });
  it("Check biding functionality - guest user", async () => {
    await HomePage.clickElement(HomePage.bidButtonRandomProduct)
    await ProductPage.verifyBidButtonIsDisabled()
  });
  it("Check header links", async () => {
    await HomePage.verifyLinkUrl(HomePage.fbIcon, socialMedia.fb)
    await HomePage.verifyLinkUrl(HomePage.igIcon, socialMedia.ig)
    await HomePage.verifyLinkUrl(HomePage.xIcon, socialMedia.X)
  });
   it("Check footer links", async () => {
     await $('div > footer').scrollIntoView()
     await HomePage.verifyLinkUrl(HomePage.aboutUsLink, footerLinks.aboutUs)
     await HomePage.verifyLinkUrl(HomePage.termsLink, footerLinks.termsAndConditions)
     await HomePage.verifyLinkUrl(HomePage.policyLink, footerLinks.privacyPolicy)
  });
  it("Check sort by feature - Price Ascending", async () => {
    let sortedArray = []
    await HomePage.clickElement(HomePage.shopLink)  
    await ProductPage.clickElement(ProductPage.sortingDropdownMenu)
    await browser.$('//*[text()="Lowest price first"]').click()
    sortedArray = await ProductPage.getPriceArray()
    await ProductPage.verifyAscendingArray(sortedArray)
  });
  it("Check sort by feature - Price Descending", async () => {
    let sortedArray = []
    await HomePage.clickElement(HomePage.shopLink)  
    await ProductPage.clickElement(ProductPage.sortingDropdownMenu)
    await browser.$('//*[text()="Highest price first"]').click()
    sortedArray = await ProductPage.getPriceArray()
    await ProductPage.verifyDescendingArray(sortedArray)
  });
});