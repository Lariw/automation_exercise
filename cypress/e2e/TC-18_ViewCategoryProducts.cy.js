describe("[TC-18]", () => {
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

  it("[TC-18] - View Category Products", () => {
    cy.visit(mainData.baseURI + "/");

    cy.pageLoadVerification();

    cy.get(".left-sidebar > h2").contains("Category").should("be.visible");

    cy.get(".panel-title > a").contains("Women").click();

    cy.get(".panel-body > ul > li ").contains("Dress").click();

    cy.get(".title.text-center")
      .contains("Women - Dress Products")
      .should("exist");

    cy.get(".left-sidebar > h2").contains("Category").should("be.visible");

    cy.get(".panel-title > a").contains("Men").click();

    cy.get(".panel-body > ul > li ").contains("Tshirts").click();

    cy.get(".title.text-center")
      .contains("Men - Tshirts Products")
      .should("exist");
  });
});
