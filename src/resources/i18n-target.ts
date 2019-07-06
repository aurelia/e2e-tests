import { customElement, autoinject } from "aurelia-framework";
import { I18N, RelativeTime } from "aurelia-i18n";

@customElement("i18n-target")
@autoinject
export class I18NTarget {
    dispatchedOn = new Date(2020, 1, 10, 5, 15);
    deliveredOn = new Date(2021, 1, 10, 5, 15);
    myDate: Date;
    locale: string;
    translations: any;
    constructor(private i18n: I18N, relativeTime: RelativeTime) {
        this.locale = this.i18n.getLocale();
        this.myDate = new Date();
        this.myDate.setHours(this.myDate.getHours() - 2);

        relativeTime.addTranslationResource("")

        this.translations = {
            simple: this.i18n.tr("simple.text"),
            context: this.i18n.tr("status", { context: "dispatched", date: this.dispatchedOn }),
            plural: this.i18n.tr("itemWithCount", { count: 10 }),
            interval: this.i18n.tr("itemWithCount_interval", { postProcess: 'interval', count: 10 }),
            num: this.i18n.nf().format(123456789),
            date: this.i18n.df().format(this.deliveredOn),
            rtime: relativeTime.getRelativeTime(this.myDate)
        }
    }

    changeLocale(locale) {
        this.i18n.setLocale(locale);
        this.locale = locale;
    }
}