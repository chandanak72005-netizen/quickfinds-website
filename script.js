const productList = document.getElementById("product-list");
const emptyState = document.getElementById("empty-state");
const searchInput = document.getElementById("product-search");
const categoryButtons = [...document.querySelectorAll(".category-tab")];
let selectedCategory = "All";

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[char]));
}

function safeURL(value) {
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}

function productRow(product) {
  const url = safeURL(product.destinationUrl || "");
  const buttonLabel = product.buttonLabel || "Open product";
  const action = url
    ? `<a class="product-link-button" href="${escapeHTML(url)}" target="_blank" rel="sponsored nofollow noopener noreferrer">${escapeHTML(buttonLabel)} ↗</a>`
    : `<span class="missing-link">Add product URL in products.js</span>`;
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
    return categoryMatch && `${product.title} ${product.category}`.toLowerCase().includes(query);
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
