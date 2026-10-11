/*
  QUICKFINDS FALLBACK PRODUCT LIST
  The live site first loads products from the Google Sheet configured in script.js.
  These products are shown if the sheet cannot be reached.
*/
const products = [
  {
    id: 1,
    category: "Fashion",
    title: "EXOTIC Premium® Unique Shape Texture Design Flap Sling Bag — Beige",
    destinationUrl: "https://amzn.in/d/07b6U44l",
    platform: "Amazon",
    buttonLabel: "Shop on Amazon"
  },
  {
    id: 2,
    category: "Beauty",
    title: "Korean Flower Hair Claw Clips – 4 Pieces (Multicolor)",
    destinationUrl: "https://link.amazon/B07K5gZQJg",
    platform: "Amazon",
    buttonLabel: "Shop on Amazon"
  },
  {
    id: 3,
    category: "Beauty",
    title: "Viral Gloss Stick Lipstick – Glossy Lips, Gorgeous Shades",
    destinationUrl: "https://link.amazon/B06jNhBB8",
    platform: "Amazon",
    buttonLabel: "Shop on Amazon"
  }
];
