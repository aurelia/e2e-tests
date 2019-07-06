import * as en from "../../../src/locales/en/translations.json";
import * as de from "../../../src/locales/de/translations.json";

describe('I18N', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  //#region translation via HTML
  it('should work for simple html', () => {
    cy.get(`#i18n-simple[title="${en.simple.attr}"]`).contains(en.simple.text);
  });

  it('should work for context specific translation', () => {
    cy.get(`#i18n-ctx`).contains(en.status);
    cy.get(`#i18n-ctx-dispatched`).contains(en.status_dispatched.replace("{{date}}", new Date(2020, 1, 10, 5, 15).toString()));
    cy.get(`#i18n-ctx-delivered`).contains(en.status_delivered.replace("{{date}}", new Date(2021, 1, 10, 5, 15).toString()));
  });

  it('should work for pluralization', () => {
    cy.get(`#i18n-items-0`).contains(en.itemWithCount_plural.replace("{{count}}", "0"));
    cy.get(`#i18n-items-1`).contains(en.itemWithCount.replace("{{count}}", "1"));
    cy.get(`#i18n-items-10`).contains(en.itemWithCount_plural.replace("{{count}}", "10"));
  });

  it('should work for interval processing and nesting', () => {
    cy.get(`#i18n-interval-0`).should("have.text", "0 items");
    cy.get(`#i18n-interval-1`).should("have.text", "1 item");
    cy.get(`#i18n-interval-2`).should("have.text", "2 items");
    cy.get(`#i18n-interval-3`).should("have.text", "3 items");
    cy.get(`#i18n-interval-6`).should("have.text", "6 items");
    cy.get(`#i18n-interval-7`).should("have.text", "a lot of items");
    cy.get(`#i18n-interval-10`).should("have.text", "a lot of items");
  });

  it('should work with html content', () => {
    cy.get(`#i18n-html`).should("have.html", en.html);
  });

  it('should work with prepend and append', () => {
    cy.get(`#i18n-prepend-append`).should("have.text", "Mr. Blue Sky");
  });

  it('should work with "t" value converter', () => {
    cy.get(`#i18n-t-vc`).contains("10 items");
  });
  it('should work with "t" binding behavior', () => {
    cy.get(`#i18n-t-bb`).contains("100 items");
  });

  it('should work with "nf" value converter', () => {
    cy.get(`#i18n-nf-vc`).contains("123,456,789.12");
  });
  it('should work with "nf" binding behavior', () => {
    cy.get(`#i18n-nf-bb`).contains("123.456.789,12");
  });

  it('should work with "nf" value converter for currency', () => {
    cy.get(`#i18n-nf-vc-cur`).should("have.text", " 123.456.789,12\u{00a0}€ ");
  });
  it('should work with "nf" binding behavior for currency', () => {
    cy.get(`#i18n-nf-bb-cur`).contains("$123,456,789.12");
  });

  it('should work with "df" value converter', () => {
    cy.get(`#i18n-df-vc`).contains("2/10/2020");
  });
  it('should work with "df" binding behavior', () => {
    cy.get(`#i18n-df-bb`).contains("10.2.2020");
  });

  it('should work with "rt" value converter', () => {
    cy.get(`#i18n-rt-vc`).contains("2 hours ago");
  });
  it('should work with "rt" binding behavior', () => {
    cy.get(`#i18n-rt-bb`).contains("2 hours ago");
  });
  //#endregion

  //#region translation via code
  it("facilitates translation via code - simple", () => {
    cy.get("#i18n-code-simple").contains("simple text")
  });
  it("facilitates translation via code - context-based", () => {
    cy.get("#i18n-code-context").contains(`dispatched on ${new Date(2020, 1, 10, 5, 15)}`)
  });
  it("facilitates translation via code - plural", () => {
    cy.get("#i18n-code-plural").contains("10 items")
  });
  it("facilitates translation via code - interval", () => {
    cy.get("#i18n-code-interval").contains("a lot of items")
  });
  it("facilitates translation via code - nf", () => {
    cy.get("#i18n-code-num").contains("123,456,789")
  });
  it("facilitates translation via code - df", () => {
    cy.get("#i18n-code-date").contains("2/10/2021")
  });
  it("facilitates translation via code - relative time", () => {
    cy.get("#i18n-code-rtime").contains("2 hours ago")
  });
  //#endregion

  it("can update translation upon change of locale", () => {
    cy.get("#locale-changer-de").click();

    cy.get(`#i18n-simple[title="${de.simple.attr}"]`).contains(de.simple.text);

    cy.get(`#i18n-ctx`).contains(de.status);
    cy.get(`#i18n-ctx-dispatched`).contains(de.status_dispatched.replace("{{date}}", new Date(2020, 1, 10, 5, 15).toString()));
    cy.get(`#i18n-ctx-delivered`).contains(de.status_delivered.replace("{{date}}", new Date(2021, 1, 10, 5, 15).toString()));

    cy.get(`#i18n-items-0`).contains(de.itemWithCount_plural.replace("{{count}}", "0"));
    cy.get(`#i18n-items-1`).contains(de.itemWithCount.replace("{{count}}", "1"));
    cy.get(`#i18n-items-10`).contains(de.itemWithCount_plural.replace("{{count}}", "10"));

    cy.get(`#i18n-interval-0`).should("have.text", "0 Artikel");
    cy.get(`#i18n-interval-1`).should("have.text", "1 Artikel");
    cy.get(`#i18n-interval-2`).should("have.text", "2 Artikel");
    cy.get(`#i18n-interval-3`).should("have.text", "3 Artikel");
    cy.get(`#i18n-interval-6`).should("have.text", "6 Artikel");
    cy.get(`#i18n-interval-7`).should("have.text", "viele Artikel");
    cy.get(`#i18n-interval-10`).should("have.text", "viele Artikel");

    cy.get(`#i18n-html`).should("have.html", de.html);

    cy.get(`#i18n-prepend-append`).should("have.text", "Herr. Blue Himmel");

    cy.get(`#i18n-t-vc`).contains("10 items"); //<-- t VC is not signalable
    cy.get(`#i18n-t-bb`).contains("100 Artikel");

    cy.get(`#i18n-nf-vc`).contains("123.456.789,12"); //<-- nf is equipped with locale
    cy.get(`#i18n-nf-bb`).contains("123.456.789,12"); //<-- fixed locale, no change is expected

    cy.get(`#i18n-nf-vc-cur`).should("have.text", " 123.456.789,12\u{00a0}€ "); //<-- fixed locale, no change is expected
    cy.get(`#i18n-nf-bb-cur`).contains("123.456.789,12\u{00a0}$");

    cy.get(`#i18n-df-vc`).contains("10.2.2020");
    cy.get(`#i18n-df-bb`).contains("10.2.2020"); //<-- fixed locale, no change is expected

    cy.get(`#i18n-rt-vc`).contains("2 hours ago"); //<-- rt VC is not signalable
    cy.get(`#i18n-rt-bb`).contains("vor 2 Stunden");
  });
});
