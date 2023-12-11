describe("[TC-22]", () => {
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

  it("[TC-22] - Add to cart from Recommended items", () => {
    cy.visit(mainData.baseURI + "/");

    cy.pageLoadVerification();

    cy.get("#recommended-item-carousel").scrollIntoView();

    let prices = [];
    let names = [];

    cy.get(
      "#recommended-item-carousel >.carousel-inner > .item.active > div > div > div > div"
    )
      .eq(0)
      .then((element) => {
        const price = Cypress.$(element).find("h2").text();
        const name = Cypress.$(element).find("p").text();

        prices.push(price);
        names.push(name);
      });

    cy.get(
      "#recommended-item-carousel >.carousel-inner > .item.active > div > div > div > div > a"
    )
      .eq(0)
      .click();

    cy.get("a > u").contains("View Cart").click();

    cy.then(() => {
      cy.get(".cart_description > h4 > a").eq(0).should("have.text", names[0]);
      cy.get(".cart_price > p").eq(0).should("have.text", prices[0]);
    });
  });
});
