class Product {
  constructor(ownerId, id, categoryId, title, imageUrl, description, price) {
    this.id = id;
    this.ownerId = ownerId;
    this.categoryId = categoryId;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
}

export default Product;
