export class AssetsPage {
    getUploadButton(){
        return cy.get('button.sb-button').contains("Upload files");
    }

    getAssetNameField(){
        return cy.get('input#asset-name-input-0');
    }

    getPrivacyButton() {
        return cy.get('.sb-toggle__label');
    }

    getSubmitButton(){
        return cy.get('button[type="submit"]').should('have.text', "Upload");
    }

    getAssetItem(index){
        return cy.get('div.assets-list-item').eq(index)
    }

    getDeleteAssetButton(){
        return cy.get('button[aria-label="Delete asset"]');
    }

    getDeleteModal(){
        return cy.get('.modal-delete-caution-confirm')
    }

    getConfirmDeleteButton() {
        return cy.get('.sb-button--danger')
    }

    getNotification(){
        return cy.get('.custom_notification')
    }
}