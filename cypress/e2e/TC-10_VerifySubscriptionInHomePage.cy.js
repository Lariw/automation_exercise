describe("[TC-10]", () => {
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

  it("[TC-10] - Verify Subscription in home page", () => {
    cy.visit(mainData.baseURI + "/");
    cy.url().should("eq", mainData.baseURI + "/");

    cy.pageLoadVerification();

    cy.get("#susbscribe_email").scrollIntoView();

    cy.get("#susbscribe_email").type(userData.email);
    cy.get("#subscribe").click();

    cy.get(".alert-success.alert").should("be.visible");
    cy.get(".alert-success.alert").should(
      "have.text",
      "You have been successfully subscribed!"
    );
  });
});
