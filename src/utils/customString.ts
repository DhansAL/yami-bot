/**
 * Determines if a string is longer than the given length, and if so
 * substrings it and appends an ellipsis('...').
 *
 * @param {string} str The string to shorten.
 * @param {number} len The maximum allowed length for the string.
 * @returns {string} The potentially shortened string.
 */
export const customSubString = (str: string, strlength: number): string => {
  return str.length > strlength ? str.substring(0, strlength - 3) + "..." : str;
};
