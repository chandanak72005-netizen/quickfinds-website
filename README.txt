QuickFinds website — Google Sheets edition

The existing pink QuickFinds layout is preserved.

HOW TO ADD PRODUCTS AFTER THIS UPDATE
1. Open the Google Sheet named "QuickFinds Products".
2. Add a new row under the headings. Keep these columns:
   id | Category | Title | product_link | platform
3. Put the correct product URL in product_link and the store name in platform
   (Amazon, Meesho, Myntra, Flipkart, etc.).
4. The live site reads the sheet when visitors open or refresh the site.
   You do not need to edit products.js for every new product.

IMPORTANT ONE-TIME SETUP
- Deploy these updated website files to the existing Netlify/GitHub site once.
- The Google Sheet must be viewable by anyone with the link, or the CSV endpoint
  may not be readable by visitors. Do not put personal or sensitive information
  in the sheet.
- If new rows do not show after deployment, check the browser console for a
  cross-origin or access error. If Google blocks the direct CSV request, the
  next step is to use a Google Apps Script web app as the sheet feed.
- products.js keeps a fallback list so the page still shows products if the
  sheet cannot be fetched.
- Use valid affiliate links only where you are enrolled and allowed to use them.
  Affiliate links and commissions are subject to each program's terms.
