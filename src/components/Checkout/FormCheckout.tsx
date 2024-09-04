import { useSelector } from "react-redux";
import { cartItemsSelector, cartTotalSelector } from "../../features/Cart/selector";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Order } from "../../interface/order";
import StorageKeys from "../../constants/storage-keys";
import { User } from "../../interface/Users";
import { Link } from "react-router-dom";
import CheckoutItem from "./checkoutItem";

const schema = yup.object({
    email: yup.string().required("Không được bỏ trống email").email("Hãy nhập email hợp lệ"),
    phone: yup.string().required('Nhập số điện thoại').length(10, 'Số điện thoại phải có 10 chữ số'),
    address: yup.string().required('Nhập địa chỉ của bạn'),
    name: yup.string().required('Họ và tên'),
    user_id: yup.string().optional(),
    order_status: yup.number().required(), // Bắt buộc
    total_amount: yup.number().optional(),
    type_payment: yup.number().required() // Bắt buộc
}).required();

interface FormOrderProps {
    onSubmit: (data: Order) => void;
}

const FormCheckout = ({ onSubmit }: FormOrderProps) => {
    const total_amount = useSelector(cartTotalSelector);
    const user = localStorage.getItem(StorageKeys.USER);
    const userData: Partial<User> = user ? JSON.parse(user) : {};

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Order>({
        defaultValues: {
            address: userData.address || "",
            email: userData.email || "",
            name: userData.name || "",
            user_id: userData._id || undefined,
            phone: userData.phone || "",
            order_status: 1,
            total_amount: total_amount,
            type_payment: 1
        },
        resolver: yupResolver(schema),
    });

    const dataOrder: SubmitHandler<Order> = (data) => {
        onSubmit(data);
    };

    const itemCheckouts = useSelector(cartItemsSelector);
    const totalCart = useSelector(cartTotalSelector);

    return (
        <form onSubmit={handleSubmit(dataOrder)} className="pay grid-2 bb">
            <div className="checkout-left">
                <h1>Thông tin người đặt hàng</h1>
                <div className="form-group">
                    <label htmlFor="name">Họ tên</label>
                    <input {...register("name")} id="name" className="input" placeholder="Họ tên" type="text" />
                    <small className="error-message">{errors.name?.message}</small>
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input {...register("email")} id="email" className="input" placeholder="Email" type="email" />
                    <small className="error-message">{errors.email?.message}</small>
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Số điện thoại</label>
                    <input {...register("phone")} id="phone" className="input" placeholder="Số điện thoại" type="tel" />
                    <small className="error-message">{errors.phone?.message}</small>
                </div>

                <div className="form-group">
                    <label htmlFor="address">Địa chỉ</label>
                    <input {...register("address")} id="address" className="input" placeholder="Địa chỉ" type="text" />
                    <small className="error-message">{errors.address?.message}</small>
                </div>
            </div>

            <div className="checkout-right bl mb-5">
                <h1>Giỏ hàng</h1>
                <div id="checkout">
                    {itemCheckouts.map((itemCheckout) => (
                        <CheckoutItem key={itemCheckout._id} itemCheckout={itemCheckout} />
                    ))}
                </div>
                <div className="total grid-2">
                    <span>Tổng</span>
                    <span>{totalCart}</span>
                </div>
                <div className="w-full flex-center">
                    {user ? (
                        <button type="submit" className="add mt-6 btn-primary">
                            Đặt hàng
                        </button>
                    ) : (
                        <Link to="/sign-in" className="add mt-6 btn-primary">
                            Đăng nhập để mua hàng
                        </Link>
                    )}
                </div>
            </div>
        </form>
    );
};

export default FormCheckout;
