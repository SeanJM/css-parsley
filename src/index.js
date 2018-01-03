import capture from "./capture";

export default function parser(str) {
  const groups = [];
  let o = {
    str    : str,
    index  : 0,
    length : str.length
  };

  while (o.index < o.length) {
    if (!/\s/.test(str[o.index])) {
      groups.push(
        capture(o)
      );
    }
    o.index += 1;
  }

  return groups;
};