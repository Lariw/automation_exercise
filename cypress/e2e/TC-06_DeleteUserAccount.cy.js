describe("[TC-06]", () => {
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

  it("[TC-06] - Delete user account", () => {
    cy.visit(mainData.baseURI + "/");

    cy.get(".nav.navbar-nav > li > a").contains(" Signup / Login").click();

    cy.url().should("eq", mainData.baseURI + "/login");

    cy.login(userData);

    cy.url().should("eq", mainData.baseURI + "/");

    cy.get(".nav.navbar-nav > li > a")
      .contains(` Logged in as ${userData.username}`)
      .should("be.visible");

    cy.visit(mainData.baseURI + "/");

    cy.url().should("eq", mainData.baseURI + "/");

    cy.get(".nav.navbar-nav > li > a")
      .contains(` Logged in as ${userData.username}`)
      .should("be.visible");

    cy.deleteAccount(mainData);
  });
});
