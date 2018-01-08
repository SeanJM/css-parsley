class Comment {
  constructor() {
    this.type        = "comment";
    this.declaration = [];
  }

  toString() {
    return "/* " + this.declaration.join("\n") + "*/";
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

  o.index           += 1;
  result.declaration = str.split("\n");
  return result;
}