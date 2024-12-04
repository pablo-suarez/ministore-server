import { Injectable } from "@nestjs/common";

@Injectable()
export class GetTotalService {
    constructor() { }

    validateProductIds(productList: { productId: string; quantity: number, unitPrice: number }[]) {
        const total = productList.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
        return total;
    }
}