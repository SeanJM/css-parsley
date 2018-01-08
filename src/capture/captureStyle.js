import IS_SPACE     from "../constants/IS_SPACE";
import captureBlock from "./captureBlock";

class Style {
  constructor() {
    this.type     = "style";
    this.selector = [];
    this.value    = [];
  }

  toString(depth) {
    const d   = depth || 0;
    const tab = new Array(d + 1).join("  ");
    return tab + this.selector.join(",") + " {\n" +
    this.value.map(element => element.toString(d + 1))
    + tab + "}\n";
  }
}

export default function captureStyle(o) {
  const result = new Style();

  let length   = o.str.indexOf("{", o.index);
  let selector = "";

  while (IS_SPACE[o.str[o.index]] && o.str[o.index]) {
    o.index += 1;
  }

  while (o.index < length) {
    selector += o.str[o.index];
    o.index  += 1;
  }

  result.selector = selector
    .replace(/\s+/g, " ")
    .replace(/\n/g, "")
    .split(",")
    .map(a => a.trim());
  result.value    = captureBlock(o);
  return result;
}