
export interface Product {
    _id: string;
    name: string;
    material: string;
    img?: File | string; // Thay đổi kiểu tùy theo cách bạn sử dụng
    price: number;
    view: number;
    bestseller: boolean;
    quantity: number;
    slug: string;
    category: {
      categoryId: string;
      categoryName: string;
    };


}


export interface pagination{
  countPro: number,
  countPage: number,
  currentPage: number,
  limit: number
}

