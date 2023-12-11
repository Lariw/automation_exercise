describe("[TC-01]", () => {
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

  it("[TC-01] - Register User", () => {
    cy.visit(mainData.baseURI + "/");

    cy.pageLoadVerification();

    cy.get(".nav.navbar-nav > li > a").contains(" Signup / Login").click();

    cy.url().should("eq", mainData.baseURI + "/login");

    cy.userRegistration(userData, mainData);
  });
});
