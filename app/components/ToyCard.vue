<template>
  <v-card
    elevation="2"
    hover
    rounded="xl"
    class="d-flex flex-column h-100 bg-surface"
  >
    <!-- Toy Image Container with Badge -->
    <div class="position-relative">
      <v-img
        :src="toy.image"
        :alt="toy.name"
        height="220"
        cover
        class="rounded-t-xl bg-grey-lighten-3"
      >
        <template #placeholder>
          <div class="d-flex align-center justify-center fill-height">
            <v-progress-circular indeterminate color="primary" />
          </div>
        </template>
        <template #error>
          <div class="d-flex flex-column align-center justify-center fill-height bg-grey-lighten-2 text-grey-darken-1">
            <v-icon icon="mdi-toy-brick" size="48" />
            <span class="text-caption mt-1">Toy Preview</span>
          </div>
        </template>
      </v-img>

      <!-- Badge (Bestseller, Hot, etc.) -->
      <v-chip
        v-if="toy.badge"
        color="secondary"
        variant="flat"
        size="small"
        class="position-absolute font-weight-bold text-uppercase top-0 right-0 ma-3 elevation-2"
      >
        {{ toy.badge }}
      </v-chip>
    </div>

    <!-- Card Content -->
    <v-card-text class="d-flex flex-column flex-grow-1 pa-4 ga-2">
      <!-- Category ID & Name Chip -->
      <div class="d-flex align-center justify-space-between flex-wrap ga-1">
        <v-chip
          size="x-small"
          color="primary"
          variant="tonal"
          class="font-weight-medium"
        >
          <v-icon icon="mdi-tag-outline" start size="14" />
          {{ toy.categoryId }} • {{ toy.category }}
        </v-chip>

        <span class="text-caption text-success font-weight-bold d-flex align-center">
          <v-icon icon="mdi-check-circle" size="14" class="mr-1" />
          In Stock
        </span>
      </div>

      <!-- Toy Name -->
      <h3 class="text-subtitle-1 font-weight-bold text-truncate-2 mt-1">
        {{ toy.name }}
      </h3>

      <!-- Toy Description -->
      <p class="text-caption text-medium-emphasis text-truncate-2 mb-1 flex-grow-1">
        {{ toy.description }}
      </p>

      <!-- Rating and Reviews -->
      <div class="d-flex align-center ga-1">
        <v-rating
          :model-value="toy.rating"
          readonly
          density="compact"
          size="small"
          color="amber-darken-2"
          half-increments
        />
        <span class="text-caption font-weight-bold text-grey-darken-2">
          {{ toy.rating }}
        </span>
        <span class="text-caption text-medium-emphasis">
          ({{ toy.reviews }})
        </span>
      </div>

      <!-- Pricing Block -->
      <div class="d-flex align-baseline ga-2 mt-1">
        <span class="text-h6 font-weight-black text-primary">
          ${{ toy.price.toFixed(2) }}
        </span>
        <span
          v-if="toy.originalPrice"
          class="text-caption text-medium-emphasis text-decoration-line-through"
        >
          ${{ toy.originalPrice.toFixed(2) }}
        </span>
        <v-chip
          v-if="toy.originalPrice"
          size="x-small"
          color="success"
          variant="flat"
          class="font-weight-bold"
        >
          Save {{ Math.round(((toy.originalPrice - toy.price) / toy.originalPrice) * 100) }}%
        </v-chip>
      </div>
    </v-card-text>

    <!-- Card Actions (Add to Cart & Order Now) -->
    <v-divider />
    <v-card-actions class="pa-3 ga-2">
      <!-- Add to Cart Button -->
      <v-btn
        color="primary"
        variant="tonal"
        size="small"
        rounded="lg"
        class="flex-grow-1 font-weight-bold"
        prepend-icon="mdi-cart-plus"
        @click="cartStore.addToCart(toy)"
      >
        Add to Cart
      </v-btn>

      <!-- Order Now (WhatsApp) Button -->
      <v-btn
        color="success"
        variant="flat"
        size="small"
        rounded="lg"
        class="flex-grow-1 font-weight-bold"
        prepend-icon="mdi-whatsapp"
        @click="orderStore.openOrderForToy(toy)"
      >
        Order Now
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import type { Toy } from '~/types/toy'
import { useCartStore } from '~/stores/cart'
import { useOrderStore } from '~/stores/order'

defineProps<{
  toy: Toy
}>()

const cartStore = useCartStore()
const orderStore = useOrderStore()
</script>
