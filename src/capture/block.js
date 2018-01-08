import captureDeclaration from "./captureDeclaration";

export default function block(o) {
  const children = [];
  let capture    = true;
  let open       = 0;
  let s          = "";

  while (capture && o.str[o.index]) {
    s = o.str.substring(o.index);

    if (o.str[o.index] === "{") {
      open += 1;
    } else if (o.str[o.index] === "}") {
      open -= 1;
    } else if (/^[a-z-]+(\s+|):/.test(s)) {
      children.push(
        captureDeclaration(o)
      );
    }

    if (open === 0) {
      capture = false;
    }

    o.index += 1;
  }

  return children;
}