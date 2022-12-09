export const parseWord = (word: string) => {
  return word
    .normalize("NFD")
    .replace(/\p{Diacritic}(?<!\u{0303})/gu, "")
    .normalize("NFC")
}