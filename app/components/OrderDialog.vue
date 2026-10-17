<template>
  <v-dialog
    v-model="orderStore.isOrderDialogOpen"
    max-width="640"
    persistent
  >
    <v-card rounded="xl" elevation="10" class="overflow-hidden">
      <!-- WhatsApp Header -->
      <div class="pa-4 bg-success text-white d-flex align-center justify-space-between">
        <div class="d-flex align-center ga-3">
          <v-avatar color="white" size="40">
            <v-icon icon="mdi-whatsapp" color="success" size="28" />
          </v-avatar>
          <div>
            <h2 class="text-h6 font-weight-bold">WhatsApp Direct Order</h2>
            <span class="text-caption text-grey-lighten-3">
              Order directly via WhatsApp with instant confirmation
            </span>
          </div>
        </div>
        <v-btn
          icon="mdi-close"
          variant="text"
          color="white"
          density="comfortable"
          @click="orderStore.closeOrderDialog()"
        />
      </div>

      <v-card-text class="pa-5">
        <!-- Default Pre-attached Order Items Section (Requirement 4: Category ID, Category, Toy Name) -->
        <div class="mb-5">
          <div class="d-flex align-center justify-space-between mb-2">
            <span class="text-subtitle-2 font-weight-bold text-uppercase text-medium-emphasis">
              <v-icon icon="mdi-package-variant-closed" start size="18" />
              Pre-attached Toy Details (Auto-sent)
            </span>
            <v-chip size="x-small" color="primary" variant="flat">
              {{ orderStore.activeOrderItems.length }} {{ orderStore.activeOrderItems.length === 1 ? 'Toy' : 'Toys' }}
            </v-chip>
          </div>

          <v-card
            variant="tonal"
            color="primary"
            rounded="lg"
            class="pa-3"
          >
            <div
              v-for="(item, index) in orderStore.activeOrderItems"
              :key="index"
              class="d-flex flex-column ga-1 py-2"
              :class="{ 'border-b': index < orderStore.activeOrderItems.length - 1 }"
            >
              <div class="d-flex align-center justify-space-between flex-wrap ga-1">
                <!-- Category ID & Name -->
                <v-chip size="x-small" color="primary" variant="flat" class="font-weight-bold">
                  {{ item.categoryId }}
                </v-chip>
                <span class="text-caption text-medium-emphasis font-weight-medium">
                  Category: {{ item.category }}
                </span>
                <span class="text-body-2 font-weight-bold text-primary">
                  ${{ (item.price * item.quantity).toFixed(2) }}
                </span>
              </div>

              <!-- Toy Name -->
              <div class="d-flex align-center justify-space-between">
                <span class="text-body-2 font-weight-bold text-high-emphasis">
                  🧸 {{ item.toyName }}
                </span>
                <span class="text-caption text-medium-emphasis">
                  Qty: {{ item.quantity }} × ${{ item.price.toFixed(2) }}
                </span>
              </div>
            </div>

            <!-- Order Total Preview -->
            <v-divider class="my-2" />
            <div class="d-flex align-center justify-space-between pt-1">
              <span class="text-subtitle-2 font-weight-bold">Order Total:</span>
              <span class="text-subtitle-1 font-weight-black text-primary">
                ${{ orderStore.orderTotal.toFixed(2) }}
              </span>
            </div>
          </v-card>
        </div>

        <!-- Order Customer Form -->
        <v-form ref="formRef" v-model="isFormValid" @submit.prevent="handleOrderSubmit">
          <div class="d-flex flex-column ga-3">
            <!-- Full Name -->
            <v-text-field
              v-model="formData.name"
              label="Full Name *"
              placeholder="e.g. Alex Johnson"
              prepend-inner-icon="mdi-account"
              variant="outlined"
              density="comfortable"
              rounded="lg"
              color="primary"
              :rules="[rules.required]"
            />

            <!-- Phone Number -->
            <v-text-field
              v-model="formData.phone"
              label="Phone Number *"
              placeholder="e.g. +1 234 567 8900"
              prepend-inner-icon="mdi-phone"
              variant="outlined"
              density="comfortable"
              rounded="lg"
              color="primary"
              :rules="[rules.required, rules.phone]"
            />

            <!-- Email Address -->
            <v-text-field
              v-model="formData.email"
              label="Email Address *"
              placeholder="e.g. alex@example.com"
              prepend-inner-icon="mdi-email"
              variant="outlined"
              density="comfortable"
              rounded="lg"
              color="primary"
              :rules="[rules.required, rules.email]"
            />

            <!-- Delivery Address -->
            <v-textarea
              v-model="formData.address"
              label="Delivery Address *"
              placeholder="Enter complete street address, apartment, city, and zip code"
              prepend-inner-icon="mdi-map-marker"
              variant="outlined"
              density="comfortable"
              rows="3"
              rounded="lg"
              color="primary"
              :rules="[rules.required]"
            />

            <!-- Store WhatsApp Recipient Number -->
            <v-text-field
              v-model="formData.whatsappNumber"
              label="Store WhatsApp Number (Recipient)"
              hint="Your order message will be routed to this WhatsApp contact"
              persistent-hint
              prepend-inner-icon="mdi-whatsapp"
              variant="outlined"
              density="compact"
              rounded="lg"
              color="success"
              :rules="[rules.required]"
            />
          </div>

          <!-- Dialog Actions -->
          <div class="d-flex align-center justify-end ga-3 mt-6">
            <v-btn
              variant="text"
              color="grey-darken-1"
              rounded="lg"
              @click="orderStore.closeOrderDialog()"
            >
              Cancel
            </v-btn>

            <v-btn
              type="submit"
              color="success"
              variant="flat"
              rounded="lg"
              size="large"
              prepend-icon="mdi-whatsapp"
              class="font-weight-bold elevation-2"
              :disabled="!isFormValid"
            >
              Send Order via WhatsApp
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useOrderStore } from '~/stores/order'

const orderStore = useOrderStore()
const formRef = ref<any>(null)
const isFormValid = ref(false)

const formData = reactive({
  name: '',
  address: '',
  email: '',
  phone: '',
  whatsappNumber: '+1234567890',
})

const rules = {
  required: (v: string) => !!v?.trim() || 'This field is required',
  email: (v: string) => /.+@.+\..+/.test(v) || 'Must be a valid email address',
  phone: (v: string) => /^[0-9+\s\-()]{7,}$/.test(v) || 'Please enter a valid phone number',
}

async function handleOrderSubmit() {
  const { valid } = await formRef.value.validate()
  if (!valid) return

  orderStore.submitOrder({ ...formData })

  // Reset form inputs
  formData.name = ''
  formData.address = ''
  formData.email = ''
  formData.phone = ''
}
</script>
