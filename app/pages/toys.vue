<template>
  <v-container class="py-6">
    <!-- Page Header / Breadcrumb -->
    <div class="mb-6">
      <div class="d-flex align-center ga-2 mb-1">
        <NuxtLink to="/" class="text-decoration-none text-caption text-primary font-weight-bold d-flex align-center">
          <v-icon icon="mdi-arrow-left" size="14" class="mr-1" />
          Back to Landing Page
        </NuxtLink>
        <span class="text-caption text-medium-emphasis">•</span>
        <v-chip size="x-small" color="secondary" variant="flat" class="font-weight-black">
          POINT NO. 5
        </v-chip>
      </div>

      <div class="d-flex align-center justify-space-between flex-wrap ga-3">
        <div>
          <h1 class="text-h4 font-weight-black text-high-emphasis">
            All Toys Catalog (Point 5)
          </h1>
          <p class="text-body-2 text-medium-emphasis mt-1">
            Browse our complete 30+ toys collection with global search, category filtering, pagination, and instant WhatsApp ordering.
          </p>
        </div>

        <v-chip color="primary" variant="tonal" size="large" class="font-weight-bold">
          <v-icon icon="mdi-toy-brick" start />
          {{ toysStore.filteredAllToys.length }} Toys Available
        </v-chip>
      </div>
    </div>

    <!-- Filter & Search Controls Bar -->
    <v-card rounded="xl" elevation="1" class="pa-4 mb-6 bg-surface">
      <v-row align="center">
        <!-- Global Search Input -->
        <v-col cols="12" md="4">
          <v-text-field
            v-model="toysStore.searchQuery"
            density="compact"
            variant="outlined"
            rounded="pill"
            hide-details
            placeholder="Search all toys by name or category..."
            prepend-inner-icon="mdi-magnify"
            clearable
            color="primary"
            @click:clear="toysStore.setSearchQuery('')"
          />
        </v-col>

        <!-- Category Dropdown -->
        <v-col cols="12" sm="6" md="3">
          <v-select
            v-model="toysStore.selectedCategory"
            :items="categoryOptions"
            item-title="name"
            item-value="id"
            density="compact"
            variant="outlined"
            rounded="pill"
            hide-details
            color="primary"
            prepend-inner-icon="mdi-shape"
            label="Category"
          />
        </v-col>

        <!-- Sort By Dropdown -->
        <v-col cols="12" sm="6" md="3">
          <v-select
            v-model="toysStore.sortBy"
            :items="sortOptions"
            item-title="label"
            item-value="value"
            density="compact"
            variant="outlined"
            rounded="pill"
            hide-details
            color="primary"
            prepend-inner-icon="mdi-sort-variant"
            label="Sort By"
          />
        </v-col>

        <!-- Reset Button -->
        <v-col cols="12" md="2" class="d-flex justify-end">
          <v-btn
            variant="tonal"
            color="grey-darken-2"
            rounded="pill"
            block
            prepend-icon="mdi-refresh"
            @click="toysStore.resetFilters()"
          >
            Reset
          </v-btn>
        </v-col>
      </v-row>
    </v-card>

    <!-- Category Pill Quick Selector -->
    <div class="d-flex align-center flex-wrap ga-2 mb-6">
      <v-chip
        :variant="toysStore.selectedCategory === 'ALL' ? 'flat' : 'outlined'"
        :color="toysStore.selectedCategory === 'ALL' ? 'primary' : undefined"
        rounded="pill"
        class="font-weight-bold"
        @click="toysStore.setSelectedCategory('ALL')"
      >
        All Categories ({{ toysStore.allToys.length }})
      </v-chip>

      <v-chip
        v-for="cat in toysStore.categories"
        :key="cat.id"
        :variant="toysStore.selectedCategory === cat.id ? 'flat' : 'outlined'"
        :color="toysStore.selectedCategory === cat.id ? 'primary' : undefined"
        rounded="pill"
        class="font-weight-medium"
        @click="toysStore.setSelectedCategory(cat.id)"
      >
        <v-icon :icon="cat.icon" start size="16" />
        {{ cat.id }} • {{ cat.name }}
      </v-chip>
    </div>

    <!-- Active Search/Filter Status Alert -->
    <v-alert
      v-if="toysStore.searchQuery || toysStore.selectedCategory !== 'ALL'"
      color="info"
      variant="tonal"
      rounded="lg"
      density="compact"
      class="mb-6"
    >
      <div class="d-flex align-center justify-space-between flex-wrap ga-2">
        <span>
          Showing results for:
          <strong v-if="toysStore.searchQuery">"{{ toysStore.searchQuery }}"</strong>
          <strong v-if="toysStore.selectedCategory !== 'ALL'">
            in [{{ toysStore.selectedCategory }}]
          </strong>
          — Found {{ toysStore.filteredAllToys.length }} matching toys.
        </span>
        <v-btn
          size="x-small"
          variant="text"
          color="info"
          prepend-icon="mdi-close"
          @click="toysStore.resetFilters()"
        >
          Clear
        </v-btn>
      </div>
    </v-alert>

    <!-- Point 5: Toys Grid with Add to Cart and Order Now -->
    <v-row v-if="toysStore.allToysPaginated.length > 0" class="mb-6">
      <v-col
        v-for="toy in toysStore.allToysPaginated"
        :key="toy.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <ToyCard :toy="toy" />
      </v-col>
    </v-row>

    <!-- Empty State -->
    <v-card
      v-else
      rounded="xl"
      elevation="1"
      class="pa-10 text-center bg-surface mb-6"
    >
      <v-avatar color="grey-lighten-3" size="80" class="mb-3">
        <v-icon icon="mdi-magnify-remove-outline" size="44" color="grey-darken-1" />
      </v-avatar>
      <h3 class="text-h6 font-weight-bold mb-1">No Matching Toys Found</h3>
      <p class="text-body-2 text-medium-emphasis mb-4">
        Try modifying your search term or selecting another category.
      </p>
      <v-btn
        color="primary"
        variant="tonal"
        rounded="pill"
        prepend-icon="mdi-refresh"
        @click="toysStore.resetFilters()"
      >
        Reset Filters
      </v-btn>
    </v-card>

    <!-- Point 5: Pagination Controls -->
    <div
      v-if="toysStore.allToysTotalPages > 1"
      class="d-flex flex-column flex-sm-row align-center justify-space-between ga-3 mb-8 pa-4 bg-surface rounded-xl elevation-1"
    >
      <span class="text-caption text-medium-emphasis">
        Showing Page {{ toysStore.allToysPage }} of {{ toysStore.allToysTotalPages }}
        ({{ toysStore.filteredAllToys.length }} toys total)
      </span>

      <v-pagination
        v-model="toysStore.allToysPage"
        :length="toysStore.allToysTotalPages"
        rounded="circle"
        density="comfortable"
        color="primary"
      />

      <div class="d-flex align-center ga-2">
        <span class="text-caption text-medium-emphasis">Per Page:</span>
        <v-btn-toggle
          v-model="toysStore.allToysItemsPerPage"
          mandatory
          density="compact"
          color="primary"
          rounded="pill"
        >
          <v-btn :value="8" size="small">8</v-btn>
          <v-btn :value="12" size="small">12</v-btn>
          <v-btn :value="16" size="small">16</v-btn>
        </v-btn-toggle>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useToysStore } from '~/stores/toys'

const toysStore = useToysStore()

const categoryOptions = computed(() => [
  { id: 'ALL', name: 'All Categories' },
  ...toysStore.categories.map((c) => ({
    id: c.id,
    name: `${c.id} - ${c.name}`,
  })),
])

const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Highest Rated', value: 'rating' },
  { label: 'Toy Name (A-Z)', value: 'name' },
]

useHead({
  title: 'All Toys Catalog (Point 5) | ToyJoy Online Shop',
  meta: [
    {
      name: 'description',
      content: 'Browse complete catalog of 30+ toys with global search, category filtering, cart, and WhatsApp ordering.',
    },
  ],
})
</script>
