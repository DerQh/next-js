function formatCurrency(amount) {
    let parts = amount.toString().split("."); // Convert the number to a string and split it into an array of characters
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas for thousands separator
    return "KES" + " " + parts.join(".");
  }
  
  export default formatCurrency;
  