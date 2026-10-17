export interface Toy {
  id: number
  name: string
  categoryId: string
  category: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  description: string
  image: string
  inStock: boolean
  badge?: string
  isLanding?: boolean
}

export interface Category {
  id: string
  name: string
  icon: string
  color: string
}

export interface CartItem {
  toy: Toy
  quantity: number
}

export interface OrderFormData {
  name: string
  address: string
  email: string
  phone: string
  whatsappNumber: string
}

export interface OrderItemSummary {
  categoryId: string
  category: string
  toyName: string
  price: number
  quantity: number
}
