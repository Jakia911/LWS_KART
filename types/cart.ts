

export interface UpdateCartQuantityRequest {
 userName:string,
  productId:string,
   name:string,
  price: number;
  image: string;
  quantity:number
}
export interface CartRequestBody{
  userName:string,
  productId:string,
   name:string,
  price: number;
  image: string;
  quantity:number
}
 
export interface CartItem {
 userName?: string | null | undefined;
 productId : string | undefined;
  name: string;
  price: number | undefined;
  image: string | undefined;
  quantity: number;
} 