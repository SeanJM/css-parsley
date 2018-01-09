import IS_SPACE     from "../constants/IS_SPACE";
import captureBlock from "./captureBlock";

class Media {
  constructor() {
    this.type     = "media";
    this.selector = [];
    this.value    = [];
  }

  toString(depth) {
    const d   = depth || 0;
    const tab = new Array(d + 1).join("  ");
    return tab + "@media\n" + this.selector.map(a => tab + "  " + a).join(",\n") + " {\n" +
      this.value.map(element => element.toString(d + 1)) +
    tab + "}\n";
  }
}

export default function captureMedia(o) {
  const result = new Media();

  let length   = o.str.indexOf("{", o.index);
  let selector = "";

  o.index += 6;
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
  result.value = captureBlock(o);
  return result;
}