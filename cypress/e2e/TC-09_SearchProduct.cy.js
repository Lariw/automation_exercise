describe("[TC-09]", () => {
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

  it("[TC-09] - Search Product", () => {
    cy.visit(mainData.baseURI + "/");
    cy.url().should("eq", mainData.baseURI + "/");

    cy.pageLoadVerification();

    cy.get(".nav.navbar-nav > li > a").contains(" Products").click();
    cy.url().should("eq", mainData.baseURI + "/products");

    cy.get("#search_product").type("Top");
    cy.get("#submit_search").click();

    cy.url().should("eq", mainData.baseURI + "/products?search=Top");

    cy.get(".features_items > .title.text-center").should("be.visible");
    cy.get(".features_items > .title.text-center").should(
      "have.text",
      "Searched Products"
    );

    cy.get(".productinfo.text-center > p").each((element) => {
      const elementDesc = element.text();
      expect(elementDesc).to.include("Top");
    });
  });
});
