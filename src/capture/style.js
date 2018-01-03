import declaration from "./declaration";

export default function style(o) {
  const result = {
    type        : "style",
    selector    : [],
    declaration : []
  };

  let index  = 0;
  let length = o.str.indexOf("{", o.index);
  while (o.index < length) {
    if (typeof result.selector[index] === "undefined") {
      result.selector[index] = "";
    }

    while (o.str[o.index] !== "," && o.index < length) {
      result.selector[index] += o.str[o.index];
      o.index += 1;
    }

    result.selector[index] = result.selector[index].trim();
    index   += 1;
    o.index += 1;
  }

  result.declaration = declaration(o);
  return result;
}