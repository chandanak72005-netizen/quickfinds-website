QuickFinds text-only product website

Files:
- index.html: website content
- styles.css: pastel design
- products.js: your product names and destination links
- script.js: search and category filtering
- assets/quickfinds-logo.png: brand logo

Run:
1. Extract this ZIP.
2. Open the extracted folder in VS Code.
3. Open index.html in your browser or use VS Code Live Server.

Add products:
Open products.js and add another object inside the products array. Every object needs a unique id, category, title and destinationUrl. Example:
{
  id: 2,
  category: "Beauty",
  title: "Product title here",
  destinationUrl: "https://example.com/product",
  buttonLabel: "Open product"
}

The existing first item uses the Amazon URL you supplied. It is currently a normal product URL, not necessarily an affiliate link. Replace it with your actual affiliate URL when your affiliate program allows you to generate one. Links open in a new browser tab; on phones, the destination may open in the related app if the app and device support that URL.

Before publishing, review product information, the affiliate disclosure, and the host's current terms.
