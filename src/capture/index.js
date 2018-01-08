import captureRule from "./captureRule";
import IS_SPACE from "../constants/IS_SPACE";

export default function capture(o) {
  const groups = [];
  let   open   = 0;
  let start    = o.index;

  while (IS_SPACE[o.str[o.index]]) {
    o.index += 1;
  }

  start = o.index;

  if (o.str[start] === "{") {
    start   += 1;
    open    += 1;
    o.index += 1;
    while (open && o.str[start]) {
      if (o.str[start] === "}") {
        open -= 1;
      } else if (o.str[start] === "{") {
        open += 1;
      }
      start += 1;
    }
    o.length = start - 1;
  }

  while (o.index < o.length) {
    if (!IS_SPACE[o.str[o.index]]) {
      groups.push(
        captureRule(o)
      );
    }
    o.index += 1;
  }

  return groups;
}