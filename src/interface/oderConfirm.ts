export interface Order{
    _id: string;
    user_id?: string 
    name: string
    email: string
    address: string
    phone: string
    total_amount?: number
    type_payment?: number
    order_status?: number
    order_date: Date

    
}