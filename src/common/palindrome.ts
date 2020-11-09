export const IsPalindrome = (text: string) => {
  return text.split('').reverse().join('').toUpperCase() === text.toUpperCase()
}
