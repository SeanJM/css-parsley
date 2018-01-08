export default function captureDeclaration(o) {
  let property = "";
  let value    = "";

  const element = {
    type : "declaration"
  };

  let capture = true;

  while (o.str[o.index] !== ":" && o.index < o.length) {
    property += o.str[o.index];
    o.index  += 1;
  }

  o.index += 1;

  while (capture && o.index < o.length) {
    if (o.str.substring(o.index, o.index + 2) === "#{") {
      while (o.str[o.index] !== "}") {
        value   += o.str[o.index];
        o.index += 1;
      }
    } else if (o.str[o.index] === ";" || o.str[o.index] === "}") {
      capture = false;
    } else {
      value   += o.str[o.index];
      o.index += 1;
    }
  }

  element.property = property.trim();
  element.value    = value.trim();
  return element;
}