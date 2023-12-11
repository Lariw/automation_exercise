describe("[TC-02]", () => {
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

  it("[TC-02] - Register User with existing email", () => {
    cy.visit(mainData.baseURI + "/");

    cy.pageLoadVerification();
    cy.get(".nav.navbar-nav > li > a").contains(" Signup / Login").click();
    cy.get(".signup-form > h2").should("have.text", "New User Signup!");

    cy.get('[data-qa="signup-name"]').type(userData.username);
    cy.get('[data-qa="signup-email"]').type(userData.email);
    cy.get('[data-qa="signup-button"]').click();

    cy.get("form > p")
      .eq(0)
      .should("have.text", "Email Address already exist!");
  });
});
