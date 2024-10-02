

export interface UpdateCartQuantityRequest {
  productId: string;
  quantity: number;
  userName: string;
}
export interface CartRequestBody{
  userName:string,
  productId:string,
   name:string,
  price: number;
  image: string;
}

export interface CartItem {
  userName?: string | null | undefined;
  id: string;
  name: string;
  price: number;
  quantity: number;
}