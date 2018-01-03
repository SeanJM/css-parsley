import style   from "./style";
import comment from "./comment";

export default function capture(o) {
  if (o.str.substring(o.index, o.index + 2) === "/*") {
    return comment(o);
  } else {
    return style(o);
  }
}