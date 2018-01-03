export default function declaration(o) {
  const result = [];
  let length   = o.str.indexOf("}", o.index);
  let index    = 0;

  while (o.index < length) {
    while (/\s/.test(o.str[o.index])) {
      o.index += 1;
    }

    if (typeof result[index] === "undefined" && o.index < length) {
      result[index] = {
        property : "",
        value    : ""
      };

      while (o.str[o.index] !== ":" && o.index < length) {
        result[index].property += o.str[o.index];
        o.index += 1;
      }
      result[index].property = result[index].property.trim();
      o.index += 1;

      while (o.str[o.index] !== ";" && o.index < length) {
        result[index].value += o.str[o.index];
        o.index += 1;
      }
      result[index].value = result[index].value.trim();
    }

    index   += 1;
    o.index += 1;
  }

  return result;
}