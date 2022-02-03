export async function fetchProducts() {
  const res = await fetch(
    "https://findify-assets.s3.amazonaws.com/test-task/test_response.json"
  );
  return await res.json();
}
export async function fetchColorMappingSchema() {
  const res = await fetch(
    "https://findify-assets.s3.amazonaws.com/test-task/test_color_mapping.json"
  );
  return await res.json();
}
