// QuickFinds reads the live product list from Google Sheets.
// Edit the sheet to add products; the website files do not need editing each time.
const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/1FikQrQYk14est9N5yeyoC5-KydBCWZTO4yYHjIex5u4/gviz/tq?tqx=out:csv&sheet=Sheet1";

const productList = document.getElementById("product-list");
const emptyState = document.getElementById("empty-state");
const searchInput = document.getElementById("product-search");
const categoryButtons = [...document.querySelectorAll(".category-tab")];
let selectedCategory = "All";

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[char]));
}

function safeURL(value) {
  try {
    const url = new URL(String(value || "").trim());
    return ["https:", "http:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}

// Parse CSV while respecting commas and newlines inside quoted cells.
function parseCSV(text) {
  const rows = [];
  let row = [], cell = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '"') {
      if (quoted && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else {
        quoted = !quoted;
      }
    } else if (ch === "," && !quoted) {
      row.push(cell);
      cell = "";
    } else if ((ch === "\n" || ch === "\r") && !quoted) {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(cell);
      if (row.some(value => value.trim() !== "")) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += ch;
    }
  }
  if (cell.length || row.length) {
    row.push(cell);
    if (row.some(value => value.trim() !== "")) rows.push(row);
  }
  return rows;
}

function productsFromCSV(csvText) {
  const rows = parseCSV(csvText);
  const headerIndex = rows.findIndex(row => {
    const headers = row.map(value => value.trim().toLowerCase());
    return headers.includes("id") && headers.includes("category") && headers.includes("title");
  });
  if (headerIndex < 0) throw new Error("Could not find the product headings in the sheet.");

  const headers = rows[headerIndex].map(value => value.trim().toLowerCase());
  const indexOf = (...names) => headers.findIndex(header => names.includes(header));
  const idIndex = indexOf("id");
  const categoryIndex = indexOf("category");
  const titleIndex = indexOf("title");
  const linkIndex = indexOf("product_link", "amazon_link", "destinationurl", "destination_url");
  const platformIndex = indexOf("platform");

  if (linkIndex < 0) throw new Error("Add a product_link column to the sheet.");

  return rows.slice(headerIndex + 1)
    .filter(row => row.some(value => value.trim() !== ""))
    .map((row, index) => {
      const platform = platformIndex >= 0 ? (row[platformIndex] || "").trim() : "";
      const category = (row[categoryIndex] || "").trim();
      const title = (row[titleIndex] || "").trim();
      const destinationUrl = (row[linkIndex] || "").trim();
      return {
        id: idIndex >= 0 && row[idIndex] ? row[idIndex].trim() : String(index + 1),
        category,
        title,
        destinationUrl,
        platform,
        buttonLabel: platform ? `Shop on ${platform}` : "Shop now"
      };
    })
    .filter(product => product.title && product.category && safeURL(product.destinationUrl));
}

function productRow(product) {
  const url = safeURL(product.destinationUrl || product.product_link || "");
  const buttonLabel = product.buttonLabel || (product.platform ? `Shop on ${product.platform}` : "Open product");
  const action = url
    ? `<a class="product-link-button" href="${escapeHTML(url)}" target="_blank" rel="sponsored nofollow noopener noreferrer">${escapeHTML(buttonLabel)} ↗</a>`
    : `<span class="missing-link">Add a valid product URL in your Google Sheet</span>`;
  return `
    <article class="product-row">
      <div class="product-symbol" aria-hidden="true">${product.category === "Fashion" ? "👗" : product.category === "Beauty" ? "🧴" : product.category === "Gadgets" ? "🎧" : "🌷"}</div>
      <div class="product-text">
        <span class="product-category">${escapeHTML(product.category || "Find")}</span>
        <h3>${escapeHTML(product.title)}</h3>
      </div>
      <div class="product-action">${action}</div>
    </article>`;
}

function renderProducts() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = products.filter(product => {
    const categoryMatch = selectedCategory === "All" || product.category === selectedCategory;
    return categoryMatch && `${product.title} ${product.category} ${product.platform || ""}`.toLowerCase().includes(query);
  });
  productList.innerHTML = filtered.map(productRow).join("");
  emptyState.hidden = filtered.length !== 0;
}

categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    selectedCategory = button.dataset.category;
    categoryButtons.forEach(item => item.classList.toggle("active", item === button));
    renderProducts();
  });
});
searchInput.addEventListener("input", renderProducts);
document.getElementById("year").textContent = new Date().getFullYear();
renderProducts();

// Fetch current rows from the public Google Sheet. Fallback products remain visible
// if Google is temporarily unavailable or the sheet's sharing settings block access.
async function loadProductsFromSheet() {
  try {
    const response = await fetch(SHEET_CSV_URL, { cache: "no-store" });
    if (!response.ok) throw new Error(`Google Sheets returned ${response.status}`);
    const csv = await response.text();
    const sheetProducts = productsFromCSV(csv);
    if (sheetProducts.length) {
      products.splice(0, products.length, ...sheetProducts);
      renderProducts();
    }
  } catch (error) {
    console.warn("QuickFinds could not refresh products from Google Sheets; showing saved fallback products.", error);
  }
}
loadProductsFromSheet();
