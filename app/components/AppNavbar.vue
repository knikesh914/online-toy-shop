<template>
  <v-app-bar
    flat
    elevation="1"
    class="bg-surface border-b px-2"
    height="72"
  >
    <v-container class="pa-0 fill-height d-flex align-center justify-space-between" fluid>
      <!-- Brand Logo -->
      <NuxtLink to="/" class="text-decoration-none d-flex align-center ga-2 mr-4">
        <v-avatar color="primary" size="44" rounded="lg">
          <v-icon icon="mdi-toy-brick" color="white" size="26" />
        </v-avatar>
        <div class="d-none d-sm-block">
          <div class="text-h6 font-weight-black text-primary leading-tight">
            TOY<span class="text-secondary">JOY</span>
          </div>
          <div class="text-caption text-medium-emphasis">
            Online Toy Shop
          </div>
        </div>
      </NuxtLink>

      <!-- Navigation Links -->
      <div class="d-none d-md-flex align-center ga-1 mr-4">
        <v-btn
          to="/"
          variant="text"
          rounded="pill"
          color="primary"
          prepend-icon="mdi-home"
          class="font-weight-medium"
        >
          Landing Page
        </v-btn>

        <v-btn
          to="/toys"
          variant="text"
          rounded="pill"
          color="primary"
          prepend-icon="mdi-grid"
          class="font-weight-medium"
        >
          All Toys (Catalog)
        </v-btn>
      </div>

      <!-- Requirement 2: Global Search with Name and Categories -->
      <div class="d-flex align-center flex-grow-1 max-width-600 ga-2 mx-2">
        <!-- Search by Name -->
        <v-text-field
          v-model="toysStore.searchQuery"
          density="compact"
          variant="outlined"
          rounded="pill"
          hide-details
          placeholder="Search toys by name or category..."
          prepend-inner-icon="mdi-magnify"
          clearable
          color="primary"
          class="flex-grow-1 bg-grey-lighten-4 rounded-pill"
          @click:clear="toysStore.setSearchQuery('')"
        />

        <!-- Category Dropdown Filter -->
        <v-select
          v-model="toysStore.selectedCategory"
          :items="categorySelectItems"
          item-title="name"
          item-value="id"
          density="compact"
          variant="outlined"
          rounded="pill"
          hide-details
          color="primary"
          prepend-inner-icon="mdi-shape"
          class="d-none d-sm-flex max-width-180 bg-grey-lighten-4 rounded-pill"
        />
      </div>

      <!-- Right Header Actions (Cart & Quick WhatsApp) -->
      <div class="d-flex align-center ga-2 ml-2">
        <!-- Requirement 3: Add to Cart Drawer Trigger -->
        <v-btn
          color="primary"
          variant="flat"
          rounded="pill"
          class="font-weight-bold"
          @click="cartStore.toggleDrawer()"
        >
          <v-badge
            :content="cartStore.totalCount"
            :model-value="cartStore.totalCount > 0"
            color="secondary"
            floating
            class="mr-2"
          >
            <v-icon icon="mdi-cart" />
          </v-badge>
          <span class="d-none d-sm-inline">Cart</span>
          <span v-if="cartStore.totalCount > 0" class="d-none d-md-inline ml-1">
            (${{ cartStore.subtotal.toFixed(2) }})
          </span>
        </v-btn>
      </div>
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useToysStore } from '~/stores/toys'
import { useCartStore } from '~/stores/cart'

const toysStore = useToysStore()
const cartStore = useCartStore()

const categorySelectItems = computed(() => [
  { id: 'ALL', name: 'All Categories' },
  ...toysStore.categories.map((c) => ({
    id: c.id,
    name: `${c.id} - ${c.name}`,
  })),
])
</script>
