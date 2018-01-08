import IS_SPACE   from "../constants/IS_SPACE";
import block      from "./block";

export default function captureStyle(o) {
  const result = {
    type     : "style",
    selector : [],
    value    : []
  };

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
  result.value    = block(o);
  return result;
}