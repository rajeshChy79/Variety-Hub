// helpers/displayCurrency.js
/**
 * Formats a price in Indian Rupees (INR) with locale-specific formatting.
 * @param {number} price - The price value to format (in INR).
 * @returns {string} - Formatted price string (e.g., "₹1,234.56").
 */
export const formatPrice = (price) => {
  if (typeof price !== 'number' || isNaN(price)) {
    return "₹0.00"; // Fallback for invalid input
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2, // Ensures two decimal places for consistency
    maximumFractionDigits: 2, // Caps decimals at two for clean output
  }).format(price);
};