import style   from "./style";
import comment from "./comment";

export default function captureBlock(o) {
  let s = o.str.substring(o.index);
  if (s.substring(0, 2) === "/*") {
    return comment(o);
  } else {
    return style(o);
  }
}