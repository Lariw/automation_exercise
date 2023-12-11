describe("[TC-05]", () => {
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

  it("[TC-05] - Login User with incorrect email and password", () => {
    cy.visit(mainData.baseURI + "/");

    cy.get(".nav.navbar-nav > li > a").contains(" Signup / Login").click();

    cy.url().should("eq", mainData.baseURI + "/login");

    cy.login(userData, "failedLogin");

    cy.get("form > p")
      .contains("Your email or password is incorrect!")
      .should("be.visible");

    cy.url().should("eq", mainData.baseURI + "/login");
  });
});
