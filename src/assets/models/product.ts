export default class Product {
  title: string = "";
  image_url: string = "";
  price: number = 0;
  compare_at: number | null = null;
  product_url: string = "";
  constructor(product?: any) {
    if (product) {
      const { title, image_url, price, compare_at, product_url } = product;
      this.title = title;
      this.image_url = image_url;
      this.price = price;
      this.compare_at = compare_at;
      this.product_url = product_url;
    }
  }
}
