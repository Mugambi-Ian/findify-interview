export async function fetchProducts() {
  try {
    const res = await fetch(
      "https://findify-assets.s3.amazonaws.com/test-task/test_response.json"
    );
    return await res.json();
  } catch (error) {
    return error;
  }
}
export async function fetchColorMappingSchema() {
  try {
    const res = await fetch(
      "https://findify-assets.s3.amazonaws.com/test-task/test_color_mapping.json"
    );
    return await res.json();
  } catch (error) {
    return error;
  }
}
