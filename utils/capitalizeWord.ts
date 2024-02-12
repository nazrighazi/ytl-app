export default function capitalizeFirstWord(inputString: string): string {
  // Check if the inputString is not empty
  if (inputString.length === 0) {
    return inputString;
  }

  // Capitalize the first letter and concatenate the rest of the string
  return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}
