export function isRangeValid(from: string, to: string): boolean {
  // Função auxiliar para tentar converter e validar um valor numérico
  const parseAndValidate = (
    val: string,
    min: number,
    max: number
  ): number | null => {
    const num = parseInt(val, 10);
    return !isNaN(num) && num >= min && num <= max ? num : null;
  };

  // Validação para intervalos numéricos no intervalo de 100 a 9999
  const fromValue100 = parseAndValidate(from, 100, 9999);
  const toValue100 = parseAndValidate(to, 100, 9999);
  if (fromValue100 !== null && toValue100 !== null) {
    return fromValue100 <= toValue100;
  }

  // Validação para intervalos numéricos no intervalo de 1 a 999999
  const fromValue1 = parseAndValidate(from, 1, 999999);
  const toValue1 = parseAndValidate(to, 1, 999999);
  if (fromValue1 !== null && toValue1 !== null) {
    return fromValue1 <= toValue1;
  }

  // Validação para intervalos no formato "C######"
  const parseSimilar = (val: string): number | null => {
    const isValidFormat = /^C\d{6}$/.test(val);
    return isValidFormat ? parseAndValidate(val.slice(1), 1, 999999) : null;
  };

  const fromSimilar = parseSimilar(from);
  const toSimilar = parseSimilar(to);
  if (fromSimilar !== null && toSimilar !== null) {
    return fromSimilar <= toSimilar;
  }

  return false;
}
