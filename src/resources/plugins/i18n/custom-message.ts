import { bindable, inlineView } from "aurelia-framework";

@inlineView(`
  <template>
    <div>\${message}</div>
  </template>
`)
export class CustomMessage {
  @bindable message: string;
}
