describe("[TC-21]", () => {
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

  it("[TC-21] - Add review on product", () => {
    cy.visit(mainData.baseURI + "/");

    cy.pageLoadVerification();
    cy.get(".nav.navbar-nav > li > a").contains(" Products").click();
    cy.url().should("eq", mainData.baseURI + "/products");
    cy.get(".title.text-center").should("have.text", "All Products");

    cy.get(".choose > ul > li > a").eq(0).click();

    cy.get(".active > a").should("have.text", "Write Your Review");

    cy.get("#name").type(userData.username);
    cy.get("#email").type(userData.email);
    cy.get("#review").type(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    );

    cy.get("#button-review").click();

    cy.get(".alert-success.alert > span").should(
      "have.text",
      "Thank you for your review."
    );
  });
});
