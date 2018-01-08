class Comment {
  constructor() {
    this.type  = "comment";
    this.value = [];
  }

  toString(depth) {
    const d   = depth || 0;
    const tab = new Array(d + 1).join("  ");
    if (this.value.length > 1) {
      return (
        tab + "/*\n" +
        this.value
          .map(str => tab + "  " + str)
          .join("\n") +
        tab + "\n*/\n"
      );
    } else {
      return (
        tab + "/* " +
        this.value.join("\n") +
        " */\n"
      );
    }
  }
}

export default function captureComment(o) {
  const result = new Comment();

  let length   = o.str.indexOf("*/", o.index);
  let str      = "";

  o.index += 2;

  while (o.index < length) {
    str += o.str[o.index];
    o.index += 1;
  }

  o.index     += 1;
  result.value = str.trim().split("\n").map(a => a.trim());
  return result;
}