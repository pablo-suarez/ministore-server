export class OrderResponseDTO {
    public id: string;
    public clientName: string;
    public productList: ProductList[];
    public total: number;
    public createdAt: Date;
    public updatedAt: Date;
}

export class ProductList {
    productId: string;
    quantity: number;
    unitPrice?: number;
}
