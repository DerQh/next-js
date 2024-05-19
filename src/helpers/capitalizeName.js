export default function capitalizeFirstTwoWords(str) {
  const words = typeof str === "string" ? str.split(" ") : null;

  if (words?.length >= 2) {
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    words[1] = words[1].charAt(0).toUpperCase() + words[1].slice(1);
  } else if (words?.length === 1) {
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  }

  return words !== null ? words.join(" ") : null;
}
