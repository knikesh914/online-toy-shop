import { defineStore } from 'pinia'
import type { Toy, CartItem, OrderFormData, OrderItemSummary } from '~/types/toy'
import { useCartStore } from './cart'

export interface ConfirmedOrder {
  orderId: string
  customer: OrderFormData
  items: OrderItemSummary[]
  total: number
  date: string
  whatsAppUrl: string
}

export const useOrderStore = defineStore('order', {
  state: () => ({
    isOrderDialogOpen: false,
    isConfirmationDialogOpen: false,
    activeOrderItems: [] as OrderItemSummary[],
    isCartOrder: false,
    storeWhatsAppNumber: '+1234567890', // Default store recipient whatsapp number

    formData: {
      name: '',
      address: '',
      email: '',
      phone: '',
      whatsappNumber: '+1234567890',
    } as OrderFormData,

    lastConfirmedOrder: null as ConfirmedOrder | null,
  }),

  getters: {
    orderTotal: (state): number => {
      return Number(
        state.activeOrderItems
          .reduce((sum, item) => sum + item.price * item.quantity, 0)
          .toFixed(2)
      )
    },

    orderItemsCount: (state): number => {
      return state.activeOrderItems.reduce((sum, item) => sum + item.quantity, 0)
    },
  },

  actions: {
    // Open order form directly for a single toy (from "Order Now" button on any toy card)
    openOrderForToy(toy: Toy, quantity = 1) {
      this.isCartOrder = false
      this.activeOrderItems = [
        {
          categoryId: toy.categoryId,
          category: toy.category,
          toyName: toy.name,
          price: toy.price,
          quantity,
        },
      ]
      this.isOrderDialogOpen = true
    },

    // Open order form for all cart items (from Cart "Checkout" button)
    openOrderForCart(cartItems: CartItem[]) {
      if (!cartItems.length) return
      this.isCartOrder = true
      this.activeOrderItems = cartItems.map((ci) => ({
        categoryId: ci.toy.categoryId,
        category: ci.toy.category,
        toyName: ci.toy.name,
        price: ci.toy.price,
        quantity: ci.quantity,
      }))
      this.isOrderDialogOpen = true
    },

    closeOrderDialog() {
      this.isOrderDialogOpen = false
    },

    closeConfirmationDialog() {
      this.isConfirmationDialogOpen = false
    },

    // Generates formatted WhatsApp text with category ID, category name, toy name, customer info
    formatWhatsAppMessage(orderId: string, form: OrderFormData, items: OrderItemSummary[], total: number): string {
      const now = new Date().toLocaleString()
      let msg = `🛍️ *NEW TOY STORE ORDER #${orderId}*\n`
      msg += `📅 Date: ${now}\n`
      msg += `━━━━━━━━━━━━━━━━━━━━━\n`
      msg += `👤 *CUSTOMER DETAILS*\n`
      msg += `• Name: ${form.name.trim()}\n`
      msg += `• Phone: ${form.phone.trim()}\n`
      msg += `• Email: ${form.email.trim()}\n`
      msg += `• Address: ${form.address.trim()}\n`
      msg += `━━━━━━━━━━━━━━━━━━━━━\n`
      msg += `🧸 *ORDERED TOYS*\n`

      items.forEach((item, index) => {
        const lineTotal = (item.price * item.quantity).toFixed(2)
        msg += `${index + 1}. *Toy Name:* ${item.toyName}\n`
        msg += `   📂 *Category ID:* ${item.categoryId}\n`
        msg += `   🏷️ *Category:* ${item.category}\n`
        msg += `   💲 *Price:* $${item.price.toFixed(2)} x ${item.quantity} = $${lineTotal}\n`
      })

      msg += `━━━━━━━━━━━━━━━━━━━━━\n`
      msg += `💰 *TOTAL AMOUNT: $${total.toFixed(2)}*\n`
      msg += `━━━━━━━━━━━━━━━━━━━━━\n`
      msg += `🚀 Please confirm my order and share delivery details! Thank you!`

      return msg
    },

    submitOrder(form: OrderFormData) {
      const orderId = 'TOY-' + Math.floor(100000 + Math.random() * 900000)
      const total = this.orderTotal
      const targetPhone = (form.whatsappNumber || this.storeWhatsAppNumber).replace(/[^0-9]/g, '')

      const rawMessage = this.formatWhatsAppMessage(orderId, form, this.activeOrderItems, total)
      const encodedMessage = encodeURIComponent(rawMessage)
      const whatsAppUrl = `https://wa.me/${targetPhone}?text=${encodedMessage}`

      // Trigger WhatsApp in a new tab
      if (import.meta.client) {
        window.open(whatsAppUrl, '_blank')
      }

      // Record confirmed order details
      this.lastConfirmedOrder = {
        orderId,
        customer: { ...form },
        items: [...this.activeOrderItems],
        total,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        whatsAppUrl,
      }

      // If this was a cart order, empty the cart
      if (this.isCartOrder) {
        const cartStore = useCartStore()
        cartStore.clearCart()
        cartStore.closeDrawer()
      }

      // Close order dialog and open confirmation dialog
      this.isOrderDialogOpen = false
      this.isConfirmationDialogOpen = true

      // Reset form
      this.formData = {
        name: '',
        address: '',
        email: '',
        phone: '',
        whatsappNumber: this.storeWhatsAppNumber,
      }
    },
  },
})
