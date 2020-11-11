export const IsPalindrome = (text: string) => {
  if (!text) {
    return false;
  }
  const textNormalize = text.replace(/\s/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  return textNormalize.split('').reverse().join('').toUpperCase() === textNormalize.replace(/\s/g, '').toUpperCase()
}
