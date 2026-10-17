import { defineStore } from 'pinia'
import type { CartItem, Toy } from '~/types/toy'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
    isDrawerOpen: false,
    snackbar: {
      show: false,
      message: '',
      color: 'success',
      icon: 'mdi-check-circle',
    },
  }),

  getters: {
    totalCount: (state): number => {
      return state.items.reduce((sum, item) => sum + item.quantity, 0)
    },

    subtotal: (state): number => {
      return Number(
        state.items.reduce((sum, item) => sum + item.toy.price * item.quantity, 0).toFixed(2)
      )
    },

    savings: (state): number => {
      const orig = state.items.reduce((sum, item) => {
        const op = item.toy.originalPrice || item.toy.price
        return sum + op * item.quantity
      }, 0)
      return Number(Math.max(0, orig - state.items.reduce((s, i) => s + i.toy.price * i.quantity, 0)).toFixed(2))
    },

    isEmpty: (state): boolean => {
      return state.items.length === 0
    },
  },

  actions: {
    addToCart(toy: Toy, quantity = 1) {
      const existing = this.items.find((item) => item.toy.id === toy.id)
      if (existing) {
        existing.quantity += quantity
      } else {
        this.items.push({ toy, quantity })
      }

      this.showToast(`"${toy.name}" added to cart!`, 'success', 'mdi-cart-plus')
      this.persist()
    },

    removeFromCart(toyId: number) {
      const idx = this.items.findIndex((item) => item.toy.id === toyId)
      if (idx !== -1) {
        const removed = this.items[idx].toy.name
        this.items.splice(idx, 1)
        this.showToast(`"${removed}" removed from cart`, 'info', 'mdi-delete-outline')
        this.persist()
      }
    },

    updateQuantity(toyId: number, delta: number) {
      const item = this.items.find((i) => i.toy.id === toyId)
      if (!item) return

      const newQty = item.quantity + delta
      if (newQty <= 0) {
        this.removeFromCart(toyId)
      } else {
        item.quantity = newQty
        this.persist()
      }
    },

    clearCart() {
      this.items = []
      this.persist()
    },

    openDrawer() {
      this.isDrawerOpen = true
    },

    closeDrawer() {
      this.isDrawerOpen = false
    },

    toggleDrawer() {
      this.isDrawerOpen = !this.isDrawerOpen
    },

    showToast(message: string, color = 'success', icon = 'mdi-check-circle') {
      this.snackbar.message = message
      this.snackbar.color = color
      this.snackbar.icon = icon
      this.snackbar.show = true
    },

    persist() {
      if (import.meta.client) {
        try {
          localStorage.setItem('toy_shop_cart', JSON.stringify(this.items))
        } catch (e) {
          console.error('Failed to save cart to localStorage', e)
        }
      }
    },

    initCart() {
      if (import.meta.client) {
        try {
          const saved = localStorage.getItem('toy_shop_cart')
          if (saved) {
            this.items = JSON.parse(saved)
          }
        } catch (e) {
          console.error('Failed to load cart from localStorage', e)
        }
      }
    },
  },
})
