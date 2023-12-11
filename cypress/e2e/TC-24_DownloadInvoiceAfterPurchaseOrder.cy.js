describe("[TC-24]", () => {
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

  it("[TC-24] - Download Invoice after purchase order", () => {
    cy.visit(mainData.baseURI + "/");

    cy.pageLoadVerification();

    cy.get(".nav.navbar-nav > li > a").contains(" Signup / Login").click();

    cy.url().should("eq", mainData.baseURI + "/login");

    cy.userRegistration(userData, mainData);

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

    cy.get(".productinfo.text-center > a").contains("Add to cart").click();

    cy.get("a > u").contains("View Cart").click();

    cy.url().should("eq", mainData.baseURI + "/view_cart");

    cy.then(() => {
      cy.get(".cart_description > h4 > a").eq(0).should("have.text", names[0]);
      cy.get(".cart_price > p").eq(0).should("have.text", prices[0]);
    });

    cy.checkoutVerification(userData, mainData);

    cy.get('[name="message"]').type(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tincidunt augue ex, sed pretium lectus ornare a. Duis efficitur elit at massa dictum, in scelerisque urna sodales. Maecenas vitae imperdiet erat. Ut condimentum blandit mauris non bibendum."
    );

    cy.userPayments(userData, mainData);

    cy.get("div > a").contains("Download Invoice").click();

    cy.wait(2000);

    cy.readFile("cypress\\Downloads\\invoice.txt");

    cy.get(".pull-right > a").contains("Continue").click();

    cy.deleteAccount(mainData);
  });
});
