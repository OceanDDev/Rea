export interface Order {
    _id: string;
    user_id?: string;
    order_status: number; // Không thể là undefined
    total_amount?: number;
    type_payment: number; // Không thể là undefined
    email: string;
    name: string;
    phone: string;
    address: string;
  }
  
  

export interface orderItem {
    order_id: string,
    product_id: string,
    quantity: number,
    unit_price: number,
    total_price: number
}