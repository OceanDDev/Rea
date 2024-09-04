export interface Order{
    _id?: string
    user_id?: string 
    name: string
    email: string
    address: string
    phone: string,
    order_date: Date
    total_amount?: number
    type_payment?: number
    order_status?: number

    
}

export interface orderItem {
    order_id: string,
    product_id: string,
    quantity: number,
    unit_price: number,
    total_price: number
}