import { Inject, Injectable } from "@nestjs/common";
import { ProductsRepository, ProductsRepositorySymbol } from "../domain/products.repository";
import { FileSecureUrlAdapter } from '../../common/file-storage/infrastructure/file-secure-url.adapter';

@Injectable()
export class FindProductByIdUseCase {
    constructor(
        @Inject(ProductsRepositorySymbol)
        private readonly repository: ProductsRepository,
        private readonly fileSecureUrlAdapter: FileSecureUrlAdapter
    ) { }
    async execute(id: string){
        let securedUrl: string;
        const product = await this.repository.findProductById(id);
        if (product.getProps().picture) {
            securedUrl = this.fileSecureUrlAdapter.generateUrl(product.getProps().picture);
          }
    
        return {...product.getProps(),picture:securedUrl};
    }
}