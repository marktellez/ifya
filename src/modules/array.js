export function arrayStringToSelectOptions(strings) {
  return strings.map((string) => ({
    label: string,
    value: string,
  }));
}
