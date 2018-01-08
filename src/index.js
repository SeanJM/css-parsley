import capture from "./capture/";

export default function parser(str) {
  let o = {
    str    : str,
    index  : 0,
    length : str.length
  };

  return capture(o);
}