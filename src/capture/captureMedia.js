import IS_SPACE from "../constants/IS_SPACE";
import capture  from "./index";

export default function captureMedia(o) {
  const result = {
    type     : "media",
    selector : [],
    value    : []
  };

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
  result.value = capture(o);
  return result;
}