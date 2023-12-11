describe("[TC-20]", () => {
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

  it("[TC-20] - Search Products and Verify Cart After Login", () => {
    cy.visit(mainData.baseURI + "/");

    cy.pageLoadVerification();
    cy.get(".nav.navbar-nav > li > a").contains(" Products").click();
    cy.url().should("eq", mainData.baseURI + "/products");
    cy.get(".title.text-center").should("have.text", "All Products");

    cy.get("#search_product").type("Sleeveless Dress");
    cy.get("#submit_search").click();

    cy.url().should(
      "eq",
      mainData.baseURI + "/products?search=Sleeveless%20Dress"
    );

    cy.get(".features_items").should("be.visible");

    cy.get(
      ".features_items > .col-sm-4 > .product-image-wrapper > .single-products > .productinfo.text-center > p"
    ).should("have.text", "Sleeveless Dress");

    cy.get(".btn.btn-default.add-to-cart").eq(0).click({ force: true });

    cy.get("a > u").contains("View Cart").click();

    cy.url().should("eq", mainData.baseURI + "/view_cart");

    cy.get(".cart_description > h4 > a").should(
      "have.text",
      "Sleeveless Dress"
    );

    cy.get(".btn.btn-default.check_out").click();

    cy.get("a > u").contains("Register / Login").click();

    cy.url().should("eq", mainData.baseURI + "/login");

    cy.login(userData);

    cy.url().should("eq", mainData.baseURI + "/");

    cy.get(".nav.navbar-nav > li > a")
      .contains(` Logged in as ${userData.username}`)
      .should("be.visible");

    cy.get(".nav.navbar-nav > li > a").contains(" Cart").click();

    cy.url().should("eq", mainData.baseURI + "/view_cart");

    cy.get(".cart_description > h4 > a").should(
      "have.text",
      "Sleeveless Dress"
    );

    cy.deleteAccount(mainData);
  });
});
