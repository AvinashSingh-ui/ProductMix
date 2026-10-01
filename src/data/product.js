export async function fetchProducts() {
  const response = await fetch("https://dummyjson.com/products?limit=0");

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();


  return data.products;
}