class Declaration {
  constructor() {
    this.type = "declaration";
  }

  toString(depth) {
    const d   = depth || 0;
    const tab = new Array(d + 1).join("  ");
    return tab + this.property + ": " + this.value + ";\n";
  }
}

export default function captureDeclaration(o) {
  const element = new Declaration();

  let property  = "";
  let value     = "";
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