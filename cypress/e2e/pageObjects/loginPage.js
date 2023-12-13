export class LoginPage {
    getEmailField() {
        return cy.get('input#email');
    }

    getPasswordField() {
        return cy.get('input#password');
    }

    getLoginButton() {
        return cy.get('button[data-testid="submit"]');
    }

    fillLoginForm(email, password){
       this.getEmailField().type(email);
       this.getPasswordField().type(password); 
    }
}