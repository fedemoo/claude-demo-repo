/**
 * Pricing utilities for MOO products.
 */

export interface Product {
  id: string;
  name: string;
  basePrice: number; // in pence
  quantity: number;
}

export interface Discount {
  type: "percentage" | "fixed";
  value: number;
}

/**
 * Applies a discount to a base price and returns the discounted price in pence.
 */
export function applyDiscount(basePrice: number, discount: Discount): number {
  if (discount.type === "percentage") {
    return Math.round(basePrice * (1 - discount.value / 100));
  }
  return Math.max(0, basePrice - discount.value);
}

/**
 * Calculates the total price for a list of products, with an optional discount.
 */
export function calculateTotal(
  products: Product[],
  discount?: Discount
): number {
  const subtotal = products.reduce(
    (sum, product) => sum + product.basePrice * product.quantity,
    0
  );
  if (!discount) return subtotal;
  return applyDiscount(subtotal, discount);
}

/**
 * Formats a price in pence to a human-readable GBP string.
 * e.g. 1099 → "£10.99"
 *
 * TODO: implement this function
 */
export function formatPrice(pence: number): string {
  throw new Error("Not implemented");
}
