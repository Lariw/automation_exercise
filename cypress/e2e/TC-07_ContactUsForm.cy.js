describe("[TC-07]", () => {
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

  it("[TC-07] - Contact Us Form", () => {
    cy.visit(mainData.baseURI + "/");

    cy.pageLoadVerification();

    cy.get(".nav.navbar-nav > li > a").contains(" Contact us").click();

    cy.url().should("eq", mainData.baseURI + "/contact_us");
    cy.get(".title.text-center").contains("Get In Touch").should("be.visible");

    cy.get('[data-qa="name"]').type(userData.username);
    cy.get('[data-qa="email"]').type(userData.email);
    cy.get('[data-qa="subject"]').type("Lorem Ipsum");
    cy.get('[data-qa="message"]').type(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tincidunt augue ex, sed pretium lectus ornare a. Duis efficitur elit at massa dictum, in scelerisque urna sodales. Maecenas vitae imperdiet erat. Ut condimentum blandit mauris non bibendum."
    );
    cy.get('[name="upload_file"]').selectFile(fileInput);

    cy.get('[data-qa="submit-button"]').click();

    cy.get(".status.alert.alert-success").should(
      "have.text",
      "Success! Your details have been submitted successfully."
    );

    cy.get("#form-section > a").should("have.text", " Home").click();

    cy.url().should("eq", mainData.baseURI + "/");
  });
});
