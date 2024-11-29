export function isRangeValid(from: string, to: string): boolean {
  const isNumericRange = (val: string, min: number, max: number) => {
    const numVal = parseInt(val, 10);
    return !isNaN(numVal) && numVal >= min && numVal <= max;
  };

  if (isNumericRange(from, 100, 9999) && isNumericRange(to, 100, 9999)) {
    return parseInt(from, 10) <= parseInt(to, 10);
  }

  if (isNumericRange(from, 1, 999999) && isNumericRange(to, 1, 999999)) {
    return parseInt(from, 10) <= parseInt(to, 10);
  }

  const isSimilarRange = (val: string) =>
    /^C\d{6}$/.test(val) && isNumericRange(val.slice(1), 1, 999999);

  if (isSimilarRange(from) && isSimilarRange(to)) {
    return parseInt(from.slice(1), 10) <= parseInt(to.slice(1), 10);
  }

  return false;
}
