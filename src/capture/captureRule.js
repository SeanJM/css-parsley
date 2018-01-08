import captureStyle   from "./captureStyle";
import captureComment from "./captureComment";
import captureMedia   from "./captureMedia";

export default function captureRule(o) {
  let s = o.str.substring(o.index);
  if (s.substring(0, 2) === "/*") {
    return captureComment(o);
  } else if (s.substring(0, 6) === "@media") {
    return captureMedia(o);
  } else {
    return captureStyle(o);
  }
}