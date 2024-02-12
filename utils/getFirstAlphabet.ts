export default function getFirstAlphabet(str: string) {
  // Use regular expression to match the first alphabet
  const match = str.match(/[a-zA-Z]/);

  // Check if a match is found
  if (match) {
    return match[0]; // Return the first alphabet
  } else {
    return null; // Return null if no match is found
  }
}
