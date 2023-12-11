describe("[TC-13]", () => {
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

  it("[TC-13] - Verify Product quantity in Cart", () => {
    cy.visit(mainData.baseURI + "/");
    cy.url().should("eq", mainData.baseURI + "/");

    cy.pageLoadVerification();

    cy.get('.productinfo.text-center >[data-product-id="7"]').scrollIntoView();
    cy.get('li > [href="/product_details/7"]').click();
    cy.get("#quantity").clear().type("4");
    cy.get("button").contains("Add to cart").click();

    cy.get("p > a > u").click();

    cy.url().should("eq", mainData.baseURI + "/view_cart");

    cy.get(".cart_quantity > button").should("have.text", "4");
  });
});
