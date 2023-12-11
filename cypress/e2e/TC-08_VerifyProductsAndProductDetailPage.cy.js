describe("[TC-08]", () => {
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

  it("[TC-08] - Verify Products and product detail page", () => {
    cy.visit(mainData.baseURI + "/");
    cy.url().should("eq", mainData.baseURI + "/");

    cy.pageLoadVerification();

    cy.get(".nav.navbar-nav > li > a").contains(" Products").click();

    cy.url().should("eq", mainData.baseURI + "/products");

    cy.get(".features_items").should("be.visible");

    cy.get(".choose").eq(0).click();

    cy.url().should("eq", mainData.baseURI + "/product_details/1");

    cy.get(".product-information > h2").should("be.visible");
    cy.get(".product-information > p")
      .contains("Category")
      .should("be.visible");
    cy.get(".product-information > p")
      .contains("Availability:")
      .should("be.visible");
    cy.get(".product-information > p")
      .contains("Condition:")
      .should("be.visible");
    cy.get(".product-information > p").contains("Brand:").should("be.visible");

    cy.get(".product-information > span > span")
      .contains("Rs.")
      .should("be.visible");
  });
});
