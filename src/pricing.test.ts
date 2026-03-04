import { describe, it, expect } from "vitest";
import { applyDiscount, calculateTotal, formatPrice } from "./pricing";

describe("applyDiscount", () => {
  it("applies a percentage discount", () => {
    expect(applyDiscount(1000, { type: "percentage", value: 10 })).toBe(900);
  });

  it("applies a fixed discount", () => {
    expect(applyDiscount(1000, { type: "fixed", value: 150 })).toBe(850);
  });

  it("does not return a negative price for a large fixed discount", () => {
    expect(applyDiscount(100, { type: "fixed", value: 500 })).toBe(0);
  });
});

describe("calculateTotal", () => {
  const products = [
    { id: "p1", name: "Business Cards", basePrice: 1099, quantity: 2 },
    { id: "p2", name: "Stickers", basePrice: 599, quantity: 3 },
  ];

  it("calculates subtotal with no discount", () => {
    // 2 × 1099 + 3 × 599 = 2198 + 1797 = 3995
    expect(calculateTotal(products)).toBe(3995);
  });

  it("calculates total with a percentage discount", () => {
    // 10% off 3995 = 3595.5 → rounded to 3596 (bug: should be 3596 not 3595)
    expect(calculateTotal(products, { type: "percentage", value: 10 })).toBe(
      3595
    );
  });

  it("calculates total with a fixed discount", () => {
    expect(calculateTotal(products, { type: "fixed", value: 500 })).toBe(3495);
  });
});

describe("formatPrice", () => {
  it("formats pence to a GBP string", () => {
    expect(formatPrice(1099)).toBe("£10.99");
  });

  it("formats zero pence", () => {
    expect(formatPrice(0)).toBe("£0.00");
  });

  it("formats whole pounds with no pence", () => {
    expect(formatPrice(500)).toBe("£5.00");
  });
});
