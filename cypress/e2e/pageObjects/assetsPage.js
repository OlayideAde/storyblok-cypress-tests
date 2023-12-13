export class AssetsPage {
    getUploadButton(){
        return cy.get('button.sb-button').contains("Upload files");
    }

    getAssetNameField(){
        return cy.get('input#asset-name-input-0');
    }

    getPrivacyButton() {
        return cy.get('input#asset-is-private-0');
    }

    getSubmitButton(){
        return cy.get('button.sb-button').contains("Upload");
    }

    getAssetItem(index){
        return cy.get('div.assets-list-item').eq(index)
    }

    getReplaceAssetButton(){
        return cy.get('button[aria-label="Replace asset"]');
    }
}