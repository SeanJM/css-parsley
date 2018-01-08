import captureDeclaration from "./captureDeclaration";
import captureStyle from "./captureStyle";
import IS_SPACE from "../constants/IS_SPACE";

export default function captureBlock(o) {
  const children = [];
  let capture    = true;
  let open       = 0;
  let s          = "";

  while (capture && o.str[o.index]) {
    while (IS_SPACE[o.str[o.index]]) {
      o.index += 1;
    }

    s = o.str.substring(o.index);
    if (o.str[o.index] === "{") {
      open += 1;
    } else if (o.str[o.index] === "}") {
      open -= 1;
    } else if (/^[a-z-]+(\s+|):/.test(s)) {
      children.push(
        captureDeclaration(o)
      );
    } else {
      children.push(
        captureStyle(o)
      );
    }

    if (open === 0) {
      capture = false;
    }

    o.index += 1;
  }

  return children;
}