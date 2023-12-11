describe("[TC-12]", () => {
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

  it("[TC-12] - Add Products in Cart", () => {
    cy.visit(mainData.baseURI + "/");
    cy.url().should("eq", mainData.baseURI + "/");

    cy.pageLoadVerification();

    cy.get(".nav.navbar-nav > li > a").contains(" Products").click();
    cy.url().should("eq", mainData.baseURI + "/products");

    let prices = [];
    let names = [];

    cy.get(".productinfo.text-center")
      .eq(0)
      .then((element) => {
        const price = Cypress.$(element).find("h2").text();
        const name = Cypress.$(element).find("p").text();

        prices.push(price);
        names.push(name);
      });

    cy.get(".productinfo.text-center > .add-to-cart").eq(0).click();

    cy.get('[data-dismiss="modal"]').click();

    cy.get(".productinfo.text-center")
      .eq(1)
      .then((element) => {
        const price = Cypress.$(element).find("h2").text();
        const name = Cypress.$(element).find("p").text();

        prices.push(price);
        names.push(name);
      });

    cy.get(".productinfo.text-center > .add-to-cart").eq(1).click();

    cy.get("a > u").click();

    cy.url().should("eq", mainData.baseURI + "/view_cart");

    cy.then(() => {
      cy.get(".cart_description > h4 > a").eq(0).should("have.text", names[0]);
      cy.get(".cart_description > h4 > a").eq(1).should("have.text", names[1]);
    });

    cy.then(() => {
      cy.get(".cart_price > p").eq(0).should("have.text", prices[0]);
      cy.get(".cart_price > p").eq(1).should("have.text", prices[1]);
    });
  });
});
