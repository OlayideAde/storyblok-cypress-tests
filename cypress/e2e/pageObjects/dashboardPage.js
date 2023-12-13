export class DashboardPage {
    getSpace() {
        return cy.get('div[data-testid="column-space-item"]').eq(0);
    }

    getAssetsTab() {
       return cy.get('#app-Assets');
    }
}