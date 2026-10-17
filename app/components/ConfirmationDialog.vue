<template>
  <v-dialog
    v-model="orderStore.isConfirmationDialogOpen"
    max-width="580"
  >
    <v-card rounded="xl" elevation="12" class="overflow-hidden">
      <!-- Header Banner -->
      <div class="pa-6 bg-success text-white text-center">
        <v-avatar color="white" size="64" class="mb-3 elevation-4">
          <v-icon icon="mdi-check-circle" color="success" size="48" />
        </v-avatar>
        <h2 class="text-h5 font-weight-bold mb-1">Order Confirmed!</h2>
        <p class="text-body-2 text-grey-lighten-4">
          Your order has been formatted and submitted via WhatsApp.
        </p>
      </div>

      <v-card-text class="pa-5">
        <div v-if="orderStore.lastConfirmedOrder" class="d-flex flex-column ga-4">
          <!-- Order Reference & Date -->
          <div class="d-flex align-center justify-space-between flex-wrap ga-2 bg-grey-lighten-4 pa-3 rounded-lg">
            <div>
              <span class="text-caption text-medium-emphasis">Order ID</span>
              <div class="text-subtitle-1 font-weight-black text-primary">
                #{{ orderStore.lastConfirmedOrder.orderId }}
              </div>
            </div>
            <div class="text-right">
              <span class="text-caption text-medium-emphasis">Placed On</span>
              <div class="text-caption font-weight-bold">
                {{ orderStore.lastConfirmedOrder.date }}
              </div>
            </div>
          </div>

          <!-- Customer Details -->
          <div>
            <h3 class="text-subtitle-2 font-weight-bold text-uppercase text-medium-emphasis mb-2">
              <v-icon icon="mdi-account-check" start size="18" />
              Customer Information
            </h3>
            <v-card variant="outlined" rounded="lg" class="pa-3">
              <div class="d-flex flex-column ga-1 text-body-2">
                <div><strong>Name:</strong> {{ orderStore.lastConfirmedOrder.customer.name }}</div>
                <div><strong>Phone:</strong> {{ orderStore.lastConfirmedOrder.customer.phone }}</div>
                <div><strong>Email:</strong> {{ orderStore.lastConfirmedOrder.customer.email }}</div>
                <div><strong>Delivery Address:</strong> {{ orderStore.lastConfirmedOrder.customer.address }}</div>
              </div>
            </v-card>
          </div>

          <!-- Items Ordered (Category ID, Category, Toy Name) -->
          <div>
            <h3 class="text-subtitle-2 font-weight-bold text-uppercase text-medium-emphasis mb-2">
              <v-icon icon="mdi-toy-brick" start size="18" />
              Ordered Items Summary
            </h3>
            <v-card variant="outlined" rounded="lg" class="pa-3">
              <div
                v-for="(item, idx) in orderStore.lastConfirmedOrder.items"
                :key="idx"
                class="py-2"
                :class="{ 'border-b': idx < orderStore.lastConfirmedOrder.items.length - 1 }"
              >
                <div class="d-flex align-center justify-space-between mb-1">
                  <span class="font-weight-bold text-body-2">
                    {{ item.toyName }}
                  </span>
                  <span class="font-weight-bold text-primary text-body-2">
                    ${{ (item.price * item.quantity).toFixed(2) }}
                  </span>
                </div>
                <div class="d-flex align-center ga-2 text-caption text-medium-emphasis">
                  <v-chip size="x-small" color="primary" variant="tonal">
                    {{ item.categoryId }}
                  </v-chip>
                  <span>{{ item.category }}</span>
                  <span>• Qty: {{ item.quantity }}</span>
                </div>
              </div>

              <v-divider class="my-2" />
              <div class="d-flex align-center justify-space-between pt-1">
                <span class="font-weight-bold text-subtitle-1">Grand Total:</span>
                <span class="font-weight-black text-h6 text-success">
                  ${{ orderStore.lastConfirmedOrder.total.toFixed(2) }}
                </span>
              </div>
            </v-card>
          </div>

          <!-- Quick Tip Alert -->
          <v-alert
            color="info"
            variant="tonal"
            rounded="lg"
            density="compact"
            icon="mdi-information"
            class="text-caption"
          >
            A WhatsApp chat window was opened with your complete order breakdown. If the tab did not open, you can reopen it below.
          </v-alert>
        </div>
      </v-card-text>

      <v-divider />

      <v-card-actions class="pa-4 ga-2 justify-end">
        <v-btn
          v-if="orderStore.lastConfirmedOrder?.whatsAppUrl"
          :href="orderStore.lastConfirmedOrder.whatsAppUrl"
          target="_blank"
          color="success"
          variant="tonal"
          rounded="lg"
          prepend-icon="mdi-whatsapp"
          class="font-weight-bold"
        >
          Reopen WhatsApp
        </v-btn>

        <v-btn
          color="primary"
          variant="flat"
          rounded="lg"
          prepend-icon="mdi-shopping"
          class="font-weight-bold px-4"
          @click="orderStore.closeConfirmationDialog()"
        >
          Continue Shopping
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useOrderStore } from '~/stores/order'

const orderStore = useOrderStore()
</script>
