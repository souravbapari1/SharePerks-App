export function validateMobileNumber(number: string): boolean {
  // Regular expression for validating a mobile number with exactly 10 digits
  const mobileNumberPattern = /^(\+?\d{1,4}[ -]?)?(\d{10})$/;

  // Test the number against the pattern
  return mobileNumberPattern.test(number);
}
