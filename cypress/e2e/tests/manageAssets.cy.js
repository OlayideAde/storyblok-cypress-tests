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
  });

  describe("Positve tests", () => {
    beforeEach(() => {
      //login to dashboard
      cy.visit("/");
      loginPage.fillLoginForm(email, password);
      loginPage.getLoginButton().click();

      //open assets tab
      dashboardPage.getSpace().click();
      dashboardPage.getAssetsTab().click();
    });

    it.skip("should verify that user can register a public asset", () => {
      //upload file
      assetsPage.getUploadButton().click();
      cy.get("input#file").selectFile("cypress/fixtures/downloadcat.jpeg", {
        force: true,
      });

      //name asset
      assetName = faker.random.word();
      assetsPage.getAssetNameField().clear().type(assetName);

      //click upload
      assetsPage.getSubmitButton().click();

      //verify asset is visible on dashboard
      cy.wait(7000);

      assetsPage
        .getAssetItem(0)
        .should("be.visible")
        .within(() => {
          //verify name
          cy.contains(assetName.toLowerCase());

          //verify asset has an image
          cy.get("div.assets-list-item-preview__image")
            .find("img")
            .should("have.attr", "src");
        });
    });

    it("should verify that user can register a private asset", () => {
      //upload file
      assetsPage.getUploadButton().click();
      cy.get("input#file").selectFile("cypress/fixtures/downloaddog.jpeg", {
        force: true,
      });
      //name asset
      assetName = faker.random.word();
      assetsPage.getAssetNameField().clear().type(assetName);

      //toggle privacy settings to private
      assetsPage.getPrivacyButton().click();

      //click upload
      assetsPage.getSubmitButton().click();

      //verify asset is visible on dashboard
      cy.wait(7000);
      assetsPage
        .getAssetItem(0)
        .should("be.visible")
        .within(() => {
          //verify name of asset
          cy.contains(assetName.toLowerCase());
          //verify text is shown for private asset
          cy.contains("Private Asset");
        });

        //verify no image preview
        assetsPage.getAssetItem(0).find('img').should('not.exist')
    });

    it("should verify that user can delete an asset", () => {
      //select asset
      assetsPage.getAssetItem(1).click();
      //click delete icon
      assetsPage.getDeleteAssetButton().click();
      //verify delete modal is visibe
      assetsPage.getDeleteModal().should("be.visible");
      //click confirm delete button
      assetsPage.getConfirmDeleteButton().click();
      //verify that notifcation is displayed
      assetsPage
        .getNotification()
        .should("be.visble")
        .and("contain", "Success");
    });
  });
});
