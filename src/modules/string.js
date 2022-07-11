export function ellipsis(str, n = 4) {
  if (str) {
    return `0x${str.slice(2, n + 2)}...${str.slice(str.length - n)}`;
  }
  return "";
}

export function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1, str.length);
}

export function slugify(str) {
  return `${str}`
    .toString()
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^0-9a-z-]/g, "");
}

export function parseMoney(val) {
  const amount = isNaN(parseFloat(val)) ? 0 : parseFloat(val).toFixed(2);

  return "$" + amount;
}
