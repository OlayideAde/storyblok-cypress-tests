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
            cy.get('input#file').selectFile('cypress/fixtures/downloadcat.jpeg', { force:true });
            
            //name asset
            assetName = faker.random.word();
            assetsPage.getAssetNameField().clear().type(assetName);
            
            //check that privacy is toggled to public
           // assetsPage.getPrivacyButton().within(() => {
            //    cy.get('input#asset-is-private-0').its('value').should('eq', "false")
            //})

            //click upload
            assetsPage.getSubmitButton().click()
            
            //verify asset is visible on dashboard
            assetsPage.getAssetItem(0).should("be.visible").within(() => {
                //verify name
                cy.get('span[data-testid="asset-name"]').should('contain', assetName)
                //verify asset has an image
                cy.get('div.asset-list-item-preview__image').within(() => {
                    cy.get('img').should('have.attr', "src")
                })
            })
        })

        it("should verify that user can register a private asset", () => {
            //upload file
            assetsPage.getUploadButton().click();
            cy.get('input#file').selectFile('cypress/fixtures/downloaddog.jpeg', { force:true })
            //name asset
            assetName = faker.random.word();
            assetsPage.getAssetNameField().clear().type(assetName);
            //check that privacy is toggled to private
            assetsPage.getPrivacyButton().click();
            
            //click upload
            assetsPage.getSubmitButton().click()
            //verify asset is visible on dashboard
            assetsPage.getAssetItem(0).should("be.visible").within(() => {
                //verify name
                cy.get('span[data-testid="asset-name"]').should('contain', assetName)
                //verify privacy 
                cy.get('div.asset-private-preview').within(() => {
                    cy.get('p').should('have.text', "Private Asset")
                })
            })
        })

        it("should verify that user can delete an asset", () => {
            //select asset
            assetsPage.getAssetItem(1).click();
            //click delete icon
            assetsPage.getDeleteAssetButton().click();
            //verify delete modal is visibe
            assetsPage.getDeleteModal().should('be.visible')
            //click confirm delete button
            assetsPage.getConfirmDeleteButton().click()
            //verify that notifcation is displayed
            assetsPage.getNotification().should('be.visble').and('contain', "Success")
        })
    })
})