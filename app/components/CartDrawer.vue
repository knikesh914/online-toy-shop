<template>
  <v-navigation-drawer
    v-model="cartStore.isDrawerOpen"
    location="right"
    temporary
    width="440"
    class="elevation-16"
  >
    <!-- Drawer Header -->
    <div class="pa-4 bg-primary text-white d-flex align-center justify-space-between">
      <div class="d-flex align-center ga-2">
        <v-icon icon="mdi-cart" size="26" />
        <div>
          <h2 class="text-subtitle-1 font-weight-bold">Your Shopping Cart</h2>
          <span class="text-caption text-grey-lighten-3">
            {{ cartStore.totalCount }} {{ cartStore.totalCount === 1 ? 'item' : 'items' }} selected
          </span>
        </div>
      </div>
      <v-btn
        icon="mdi-close"
        variant="text"
        color="white"
        density="comfortable"
        @click="cartStore.closeDrawer()"
      />
    </div>

    <!-- Empty State -->
    <div
      v-if="cartStore.isEmpty"
      class="d-flex flex-column align-center justify-center fill-height pa-6 text-center"
    >
      <v-avatar color="primary" variant="tonal" size="80" class="mb-4">
        <v-icon icon="mdi-cart-off" size="40" color="primary" />
      </v-avatar>
      <h3 class="text-h6 font-weight-bold mb-1">Your Cart is Empty</h3>
      <p class="text-body-2 text-medium-emphasis mb-6">
        Looks like you haven't added any fun toys yet! Check out our collection.
      </p>
      <v-btn
        color="primary"
        variant="flat"
        rounded="lg"
        prepend-icon="mdi-toy-brick"
        to="/toys"
        @click="cartStore.closeDrawer()"
      >
        Explore All Toys
      </v-btn>
    </div>

    <!-- Cart Items List -->
    <div v-else class="d-flex flex-column fill-height">
      <!-- Items Scroll Container -->
      <v-list class="pa-3 flex-grow-1 overflow-y-auto">
        <v-list-item
          v-for="item in cartStore.items"
          :key="item.toy.id"
          rounded="lg"
          class="pa-3 mb-3 bg-grey-lighten-4 elevation-1"
        >
          <div class="d-flex align-center ga-3 w-100">
            <!-- Thumbnail Image -->
            <v-img
              :src="item.toy.image"
              :alt="item.toy.name"
              width="64"
              height="64"
              cover
              class="rounded-lg flex-shrink-0 bg-white"
            />

            <!-- Item Details -->
            <div class="flex-grow-1 min-width-0">
              <div class="d-flex align-center justify-space-between ga-1">
                <v-chip size="x-small" color="primary" variant="tonal" class="font-weight-medium">
                  {{ item.toy.categoryId }} • {{ item.toy.category }}
                </v-chip>
                <v-btn
                  icon="mdi-delete-outline"
                  variant="text"
                  color="error"
                  density="compact"
                  size="small"
                  @click="cartStore.removeFromCart(item.toy.id)"
                />
              </div>

              <h4 class="text-subtitle-2 font-weight-bold text-truncate mt-1">
                {{ item.toy.name }}
              </h4>

              <div class="d-flex align-center justify-space-between mt-2 flex-wrap ga-2">
                <!-- Price -->
                <span class="text-body-2 font-weight-black text-primary">
                  ${{ (item.toy.price * item.quantity).toFixed(2) }}
                  <span class="text-caption text-medium-emphasis font-weight-regular">
                    (${{ item.toy.price.toFixed(2) }} each)
                  </span>
                </span>

                <!-- Quantity Controller -->
                <div class="d-flex align-center ga-1 bg-white rounded-lg pa-1 elevation-1">
                  <v-btn
                    icon="mdi-minus"
                    size="x-small"
                    variant="text"
                    density="compact"
                    @click="cartStore.updateQuantity(item.toy.id, -1)"
                  />
                  <span class="text-caption font-weight-bold px-2">
                    {{ item.quantity }}
                  </span>
                  <v-btn
                    icon="mdi-plus"
                    size="x-small"
                    variant="text"
                    density="compact"
                    @click="cartStore.updateQuantity(item.toy.id, 1)"
                  />
                </div>
              </div>
            </div>
          </div>
        </v-list-item>
      </v-list>

      <!-- Cart Summary Footer -->
      <v-divider />
      <div class="pa-4 bg-surface elevation-3">
        <!-- Subtotal Row -->
        <div class="d-flex align-center justify-space-between text-body-2 mb-1">
          <span class="text-medium-emphasis">Subtotal</span>
          <span class="font-weight-bold">${{ cartStore.subtotal.toFixed(2) }}</span>
        </div>

        <!-- Savings Row -->
        <div v-if="cartStore.savings > 0" class="d-flex align-center justify-space-between text-caption text-success mb-1">
          <span class="d-flex align-center">
            <v-icon icon="mdi-tag-check" size="14" class="mr-1" />
            Total Discount
          </span>
          <span class="font-weight-bold">-${{ cartStore.savings.toFixed(2) }}</span>
        </div>

        <!-- Shipping Row -->
        <div class="d-flex align-center justify-space-between text-body-2 mb-3">
          <span class="text-medium-emphasis">Standard Shipping</span>
          <v-chip size="x-small" color="success" variant="flat" class="font-weight-bold">
            FREE
          </v-chip>
        </div>

        <v-divider class="my-2" />

        <!-- Total Row -->
        <div class="d-flex align-center justify-space-between mb-4">
          <span class="text-subtitle-1 font-weight-bold">Total Amount</span>
          <span class="text-h6 font-weight-black text-primary">
            ${{ cartStore.subtotal.toFixed(2) }}
          </span>
        </div>

        <!-- Action Buttons -->
        <div class="d-flex flex-column ga-2">
          <!-- WhatsApp Order Checkout Button -->
          <v-btn
            color="success"
            variant="flat"
            size="large"
            block
            rounded="lg"
            prepend-icon="mdi-whatsapp"
            class="font-weight-bold"
            @click="handleCheckout"
          >
            Order via WhatsApp
          </v-btn>

          <!-- Clear Cart -->
          <div class="d-flex justify-center">
            <v-btn
              variant="text"
              color="error"
              size="small"
              prepend-icon="mdi-trash-can-outline"
              @click="cartStore.clearCart()"
            >
              Clear Cart
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'
import { useOrderStore } from '~/stores/order'

const cartStore = useCartStore()
const orderStore = useOrderStore()

function handleCheckout() {
  orderStore.openOrderForCart(cartStore.items)
}
</script>
