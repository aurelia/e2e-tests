import * as en from "../../../src/locales/en/translations.json";
import * as de from "../../../src/locales/de/translations.json";

describe('I18N', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const dispatchedOn = new Date(2020, 1, 10, 5, 15).toString(), deliveredOn = new Date(2021, 1, 10, 5, 15).toString();

  const tests = [
    {
      name: 'should work for simple html', ignoreForDe: true,
      suts: [{ selector: `#i18n-simple[title="${en.simple.attr}"]`, expected: en.simple.text, expectedDe: undefined }]
    },
    {
      name: 'should work for simple html', ignoreForEn: true,
      suts: [{ selector: `#i18n-simple[title="${de.simple.attr}"]`, expected: undefined, expectedDe: de.simple.text }]
    },
    {
      name: 'should work for context specific translation',
      suts: [
        { selector: `#i18n-ctx`, expected: en.status, expectedDe: de.status },
        {
          selector: `#i18n-ctx-dispatched`,
          expected: en.status_dispatched.replace("{{date}}", dispatchedOn),
          expectedDe: de.status_dispatched.replace("{{date}}", dispatchedOn),
        },
        {
          selector: `#i18n-ctx-delivered`,
          expected: en.status_delivered.replace("{{date}}", deliveredOn),
          expectedDe: de.status_delivered.replace("{{date}}", deliveredOn),
        },
      ]
    },
    {
      name: 'should work for pluralization',
      suts: [
        {
          selector: `#i18n-items-0`,
          expected: en.itemWithCount_plural.replace("{{count}}", "0"),
          expectedDe: de.itemWithCount_plural.replace("{{count}}", "0")
        },
        {
          selector: `#i18n-items-1`,
          expected: en.itemWithCount.replace("{{count}}", "1"),
          expectedDe: de.itemWithCount.replace("{{count}}", "1"),
        },
        {
          selector: `#i18n-items-10`,
          expected: en.itemWithCount_plural.replace("{{count}}", "10"),
          expectedDe: de.itemWithCount_plural.replace("{{count}}", "10"),
        },
      ]
    },
    {
      name: 'should work for interval processing and nesting',
      suts: [
        { selector: `#i18n-interval-0`, expected: "0 items", expectedDe: "0 Artikel" },
        { selector: `#i18n-interval-1`, expected: "1 item", expectedDe: "1 Artikel" },
        { selector: `#i18n-interval-2`, expected: "2 items", expectedDe: "2 Artikel" },
        { selector: `#i18n-interval-3`, expected: "3 items", expectedDe: "3 Artikel" },
        { selector: `#i18n-interval-6`, expected: "6 items", expectedDe: "6 Artikel" },
        { selector: `#i18n-interval-7`, expected: "a lot of items", expectedDe: "viele Artikel" },
        { selector: `#i18n-interval-10`, expected: "a lot of items", expectedDe: "viele Artikel" },
      ]
    },
    {
      name: 'should work with html content', isHtmlContent: true,
      suts: [{ selector: `#i18n-html`, expected: en.html, expectedDe: de.html },]
    },
    {
      name: 'should work with "t" value converter, but does not update the value on locale change as it is non-signalable',
      suts: [{ selector: `#i18n-t-vc`, expected: " 10 items ", expectedDe: " 10 items " },]
    },
    {
      name: 'should work with "t" binding behavior',
      suts: [{ selector: `#i18n-t-bb`, expected: " 100 items ", expectedDe: " 100 Artikel " },]
    },
    {
      name: 'should work with "nf" value converter',
      suts: [{ selector: `#i18n-nf-vc`, expected: " 123,456,789.12 ", expectedDe: " 123.456.789,12 " },]
    },
    {
      name: 'should work with "nf" binding behavior',
      suts: [{ selector: `#i18n-nf-bb`, expected: " 123.456.789,12 ", expectedDe: " 123.456.789,12 " },]
    },
    {
      name: 'should work with "nf" value converter for currency',
      suts: [{ selector: `#i18n-nf-vc-cur`, expected: " 123.456.789,12\u{00a0}€ ", expectedDe: " 123.456.789,12\u{00a0}€ " },]
    },
    {
      name: 'should work with "nf" binding behavior for currency',
      suts: [{ selector: `#i18n-nf-bb-cur`, expected: " $123,456,789.12 ", expectedDe: " 123.456.789,12\u{00a0}$ " },]
    },
    {
      name: 'should work with "df" value converter',
      suts: [{ selector: `#i18n-df-vc`, expected: " 2/10/2020 ", expectedDe: " 10.2.2020 " },]
    },
    {
      name: 'should work with "df" binding behavior',
      suts: [{ selector: `#i18n-df-bb`, expected: " 10.2.2020 ", expectedDe: " 10.2.2020 " },]
    },
    {
      name: 'should work with "rt" value converter',
      suts: [{ selector: `#i18n-rt-vc`, expected: " 2 hours ago ", expectedDe: " 2 hours ago " },]
    },
    {
      name: 'should work with "rt" binding behavior',
      suts: [{ selector: `#i18n-rt-bb`, expected: " 2 hours ago ", expectedDe: " vor 2 Stunden " },]
    },
  ]

  describe("translates via HTML that", () => {
    for (const { name, suts, isHtmlContent, ignoreForEn } of tests) {
      if (!ignoreForEn) {
        it(name, () => {
          for (const sut of suts) {
            assertContent(sut.selector, sut.expected as string, isHtmlContent);
          }
        });
      }
    }
  });


  describe("updates translation on locale change that", () => {

    beforeEach(() => { cy.get("#locale-changer-de").click(); });

    for (const { name, suts, isHtmlContent, ignoreForDe } of tests) {
      if (!ignoreForDe) {
        it(name, () => {
          for (const sut of suts) {
            assertContent(sut.selector, sut.expectedDe as string, isHtmlContent);
          }
        });
      }
    }
  });

  describe("facilitates translation via code - ", () => {
    const tests = [
      {
        name: "simple",
        suts: [{ selector: "#i18n-code-simple", expected: "simple text" }]
      },
      {
        name: "context-based",
        suts: [{ selector: "#i18n-code-context", expected: `dispatched on ${dispatchedOn}` }]
      },
      {
        name: "plural",
        suts: [{ selector: "#i18n-code-plural", expected: "10 items" }]
      },
      {
        name: "interval",
        suts: [{ selector: "#i18n-code-interval", expected: "a lot of items" }]
      },
      {
        name: "nf",
        suts: [{ selector: "#i18n-code-num", expected: "123,456,789" }]
      },
      {
        name: "df",
        suts: [{ selector: "#i18n-code-date", expected: "2/10/2021" }]
      },
      {
        name: "relative time",
        suts: [{ selector: "#i18n-code-rtime", expected: "2 hours ago" }]
      },
    ];
    for (const { name, suts } of tests) {
      it(name, () => {
        for (const sut of suts) {
          assertContent(sut.selector, sut.expected);
        }
      });
    }
  });
});

function assertContent(selector: string, expected: string, isHtmlContent: boolean | undefined = false) {
  cy.get(selector).should(isHtmlContent ? "have.html" : "have.text", expected);
}

