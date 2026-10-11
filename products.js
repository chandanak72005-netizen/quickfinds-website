/*
  QUICKFINDS PRODUCT LIST
  Add one object for each product.
  - title: the name visitors see
  - category: Fashion, Beauty, Lifestyle, or Gadgets
  - destinationUrl: the URL that opens when they tap "Open product"
  - buttonLabel: optional label for the button
  Use your actual affiliate URL when your affiliate program permits you to use it.
*/
const products = [
  {
    id: 1,
    category: "Fashion",
    title: "EXOTIC Premium® Unique Shape Texture Design Flap Sling Bag — Beige",
    destinationUrl: "https://amzn.in/d/07b6U44l",
    buttonLabel: "View on Amazon"
  },
   {
    id: 2,
    category: "Beauty",
    title: "Korean Flower Hair Claw Clips – 4 Pieces (Multicolor)",
    destinationUrl: "https://link.amazon/B07K5gJZq",
    buttonLabel: "Shop on Amazon"
  },
];


/*
  TO ADD ANOTHER PRODUCT:
  Copy the object above, add a comma after the previous object, and change its id,
  category, title and destinationUrl. Example:
  {
    id: 2,
    category: "Beauty",
    title: "Your product title",
    destinationUrl: "PASTE_THE_PRODUCT_OR_AFFILIATE_URL_HERE",
    buttonLabel: "View product"
  }
*/
