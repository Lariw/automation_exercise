describe("[TC-25]", () => {
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

  it('[TC-25] - Verify Scroll Up using "Arrow" button and Scroll Down functionality', () => {
    cy.visit(mainData.baseURI + "/");

    cy.pageLoadVerification();

    cy.get(".footer-bottom").scrollIntoView({ duration: 5000 });

    cy.get("#scrollUp").click();

    cy.get("h2")
      .contains("Full-Fledged practice website for Automation Engineers")
      .should("be.visible");
  });
});
