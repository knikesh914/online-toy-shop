<template>
  <v-app class="bg-background">
    <!-- Global Navigation Header with Global Search and Cart Badge -->
    <AppNavbar />

    <!-- Main Content Routed Views (Landing page & Point 5 All Toys) -->
    <v-main class="pb-10">
      <NuxtPage />
    </v-main>

    <!-- Global Cart Slide-over Drawer (Requirement 3) -->
    <CartDrawer />

    <!-- Global WhatsApp Direct Order Dialog (Requirement 4) -->
    <OrderDialog />

    <!-- Global Order Confirmation Dialog (Requirement 4) -->
    <ConfirmationDialog />

    <!-- Global Toast / Snackbar for Cart Actions -->
    <v-snackbar
      v-model="cartStore.snackbar.show"
      :color="cartStore.snackbar.color"
      location="bottom right"
      rounded="pill"
      elevation="6"
      :timeout="3000"
    >
      <div class="d-flex align-center ga-2">
        <v-icon :icon="cartStore.snackbar.icon" />
        <span class="font-weight-medium">{{ cartStore.snackbar.message }}</span>
      </div>
      <template #actions>
        <v-btn
          variant="text"
          color="white"
          size="small"
          @click="cartStore.snackbar.show = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <!-- Footer -->
    <v-footer class="bg-surface border-t pa-6 text-center d-flex flex-column ga-3">
      <div class="d-flex align-center justify-center ga-3 flex-wrap">
        <NuxtLink to="/" class="text-decoration-none text-body-2 text-primary font-weight-bold">
          Landing Page (15 Toys)
        </NuxtLink>
        <span class="text-medium-emphasis">•</span>
        <NuxtLink to="/toys" class="text-decoration-none text-body-2 text-primary font-weight-bold">
          All Toys Catalog (Point 5)
        </NuxtLink>
      </div>

      <div class="text-caption text-medium-emphasis">
        🧸 <strong>TOYJOY</strong> — Demo Online Toy Shop built with Nuxt 4, Vue 3, Pinia & Vuetify.
      </div>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()

onMounted(() => {
  cartStore.initCart()
})
</script>
