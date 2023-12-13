import { faker } from "@faker-js/faker";
import { LoginPage } from "../pageObjects/loginPage";
import { DashboardPage } from "../pageObjects/dashboardPage";
import { AssetsPage } from "../pageObjects/assetsPage";

let loginPage;
let dashboardPage;
let assetsPage;
let assetName;
const email = Cypress.env("email");
const password = Cypress.env("password");


describe("Manage Assets tab e2e tests", () => {
    before(() => {
        loginPage = new LoginPage();
        dashboardPage = new DashboardPage();
        assetsPage = new AssetsPage();

        //login to dashboard
        cy.visit("/");
        loginPage.fillLoginForm(email, password);
        loginPage.getLoginButton().click();
        dashboardPage.getSpace().click();
    })

    describe("Positve tests", () => {
        beforeEach(() => {
            dashboardPage.getAssetsTab().click();
        })

        it("should verify that user can register a public asset", () => {
            //upload file
            assetsPage.getUploadButton().click();
            //cy.upload_file('downloadcat.jpeg', 'image/jpeg', 'input#file');
            cy.get('input#file').selectFile('cypress/fixtures/downloadcat.jpeg')
            //name asset
            assetName = faker.random.word();
            assetsPage.getAssetNameField().type(assetName);
            //check that privacy is toggled to public
            assetsPage.getPrivacyButton().its('value').should('eq', 'false')
            //click upload
            assetsPage.getSubmitButton().click()
            //verify asset is visible on dashboard
            assetsPage.getAssetItem(0).should("be.visible").within(() => {
                //verify name
                cy.get('span[data-testid="asset-name"]').should('eq', assetName)
                //verify asset has an image
                cy.get('div.asset-list-item-preview__image').within(() => {
                    cy.get('img').should('have.attr', "src")
                })
            })
        })

        it("should verify that user can register a private asset", () => {
            //upload file
            assetsPage.getUploadButton().click();
            //cy.upload_file('downloadcat.jpeg', 'image/jpeg', 'input#file');
            cy.get('input#file').selectFile('cypress/fixtures/downloadcat.jpeg')
            //name asset
            assetName = faker.random.word();
            assetsPage.getAssetNameField().type(assetName);
            //check that privacy is toggled to private
            assetsPage.getPrivacyButton().click();
            assetsPage.getPrivacyButton().its('value').should('eq', 'true')
            //click upload
            assetsPage.getSubmitButton().click()
            //verify asset is visible on dashboard
            assetsPage.getAssetItem(0).should("be.visible").within(() => {
                //verify name
                cy.get('span[data-testid="asset-name"]').should('eq', assetName)
                //verify privacy setting
                cy.get('div.asset-private-preview').within(() => {
                    cy.get('p').should('have.text', "Private Asset")
                })
            })
        })

        it("should verify that user can replace an asset", () => {
            //select asset
            assetsPage.getAssetItem(1).click();
            //click replace button 
            assetsPage.getReplaceAssetButton().click();
            //upload replacement
            cy.upload_file('downloaddog.jpeg', 'image/jpeg', 'input#replacefile');


        })
    })
})