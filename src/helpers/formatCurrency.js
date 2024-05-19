function formatCurrencyKES(amount) {
  let parts = amount.toString().split("."); // Convert the number to a string and split it into an array of characters
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas for thousands separator
  return "KES" + " " + parts.join(".");
}

function formatCurrency(amount) {
  // Remove non-numeric characters except for decimal point
  const cleanValue = amount.replace(/[^\d.]/g, "");

  // Remove leading zeros
  const cleanValueWithoutLeadingZeros = cleanValue.replace(/^0+/, "");

  // Split the value into integer and decimal parts
  const [integerPart, decimalPart] = cleanValueWithoutLeadingZeros.split(".");

  // Format the integer part with commas
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );

  // Combine integer and decimal parts (if present)
  let formattedValue = decimalPart
    ? `${formattedIntegerPart}.${decimalPart}`
    : formattedIntegerPart;

  // Remove trailing decimal point if no decimal part
  formattedValue = formattedValue.replace(/\.$/, "");

  return formattedValue;
}

export function formatMoney(number) {
  const formatter = new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
  });

  return formatter.format(number);
}
export default formatCurrency;
