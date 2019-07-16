import { Aurelia, PLATFORM } from 'aurelia-framework'
import { TCustomAttribute, AureliaEnhancedOptions } from "aurelia-i18n";
import intervalPlural = require("i18next-intervalplural-postprocessor");
import environment from './environment';
import * as en from "./locales/en/translations.json";
import * as de from "./locales/de/translations.json";

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('resources')
    .plugin("aurelia-i18n", (instance) => {
      instance.i18next.use(intervalPlural);
      let aliases = ['t', 'i18n'];
      TCustomAttribute.configureAliases(aliases);

      return instance.setup({
        attributes: aliases,
        lng: 'en',
        debug: true,
        resources: {
          en: { translation: en },
          de: { translation: de }
        },
        skipTranslationOnMissingKey: !!new URL(location.href).searchParams.get("skipkey")
      } as AureliaEnhancedOptions);
    });

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  return aurelia.start().then(() => aurelia.setRoot());
}
