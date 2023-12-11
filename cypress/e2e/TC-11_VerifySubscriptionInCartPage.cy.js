describe("[TC-11]", () => {
  let userData = null;
  let mainData = null;
  let skipAddingCookies = true;
  let fileInput = "cypress/fixtures/inputFile.txt";

  before(() => {
    cy.fixture("userData.json").then((data) => {
      userData = data;
    });

    cy.fixture("mainData.json").then((data) => {
      mainData = data;
    });
  });

  beforeEach(() => {
    if (!skipAddingCookies) {
      cy.setCookies();
    }
  });

  it("[TC-11] - Verify Subscription in Cart page", () => {
    cy.visit(mainData.baseURI + "/");
    cy.url().should("eq", mainData.baseURI + "/");

    cy.pageLoadVerification();

    cy.get(".nav.navbar-nav > li > a").contains(" Cart").click();
    cy.url().should("eq", mainData.baseURI + "/view_cart");

    cy.get(".single-widget > h2").should("be.visible");

    cy.get("#susbscribe_email").type(userData.email);
    cy.get("#subscribe").click();

    cy.get(".alert-success.alert").should("be.visible");
    cy.get(".alert-success.alert").should(
      "have.text",
      "You have been successfully subscribed!"
    );
  });
});
