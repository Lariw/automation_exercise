describe("[TC-19]", () => {
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

  it("[TC-19] - View & Cart Brand Products", () => {
    cy.visit(mainData.baseURI + "/");

    cy.pageLoadVerification();

    cy.get(".nav.navbar-nav > li > a").contains(" Products").click();

    cy.url().should("eq", mainData.baseURI + "/products");

    cy.get(".left-sidebar > .brands_products > h2")
      .contains("Brands")
      .should("be.visible");

    cy.get(".brands-name > ul > li > a").contains("Polo").click();

    cy.get(".title.text-center").should("have.text", "Brand - Polo Products");

    cy.get(".brands-name > ul > li > a").contains("Allen Solly Junior").click();

    cy.get(".title.text-center").should(
      "have.text",
      "Brand - Allen Solly Junior Products"
    );
  });
});
