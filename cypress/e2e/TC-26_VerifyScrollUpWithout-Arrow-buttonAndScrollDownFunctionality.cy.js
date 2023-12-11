describe("[TC-26]", () => {
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

  it('[TC-26] - Verify Scroll Up without "Arrow" button and Scroll Down functionality', () => {
    cy.visit(mainData.baseURI + "/");

    cy.pageLoadVerification();

    cy.get(".footer-bottom").scrollIntoView({ duration: 1000 });

    cy.get(".single-widget > h2").contains("Subscription").should("be.visible");

    cy.get("#header").scrollIntoView({ duration: 1000 });

    cy.get("h2")
      .contains("Full-Fledged practice website for Automation Engineers")
      .should("be.visible");
  });
});
