import { ProductsRepository } from './../../../product/domain/products.repository';
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ProductsRepositorySymbol } from "src/product/domain/products.repository";

@Injectable()
export class ValidateProductsService {
  constructor(
    @Inject(ProductsRepositorySymbol)
    private readonly productsRepository: ProductsRepository,
  ) { }

  async validateProductIds(productList: { productId: string; quantity: number }[]) {
    const productIds = productList.map(item => item.productId);

    const productsFound = await this.productsRepository.findProductsByIds(productIds);

    const foundProductIds = productsFound.map(product => product.id);
    const missingProductIds = productIds.filter(id => !foundProductIds.includes(id));

    if (missingProductIds.length > 0) {
      throw new NotFoundException(`Products not found: ${missingProductIds.join(", ")}`);
    }

    const orderItems = productList.map(item => {
      const product = productsFound.find(p => p.id === item.productId);
      return {
        productId: product.id,
        quantity: item.quantity,
        unitPrice: product.getProps().price,
      };
    });

    return orderItems;
  }
}
