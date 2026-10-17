<template>
  <v-container class="py-6">
    <!-- Hero Banner Section -->
    <v-card
      color="primary"
      rounded="xl"
      elevation="4"
      class="pa-6 pa-md-10 mb-8 overflow-hidden position-relative"
    >
      <v-row align="center">
        <v-col cols="12" md="7" class="text-white">
          <!-- Playful Badge -->
          <v-chip
            color="accent"
            variant="flat"
            size="small"
            class="font-weight-bold text-uppercase mb-3"
          >
            <v-icon icon="mdi-sparkles" start size="16" />
            Top Rated Kids Toy Wonderland
          </v-chip>

          <!-- Main Headline -->
          <h1 class="text-h4 text-sm-h3 text-md-h2 font-weight-black mb-3 leading-tight">
            Dream, Play & Explore with Fun Toys!
          </h1>

          <!-- Subtitle -->
          <p class="text-body-1 text-grey-lighten-3 mb-6">
            Discover 15 handpicked favorite toys below with easy pagination, or click to explore our full catalog. Order instantly with our seamless WhatsApp checkout!
          </p>

          <!-- CTA Buttons -->
          <div class="d-flex align-center flex-wrap ga-3">
            <v-btn
              color="white"
              variant="flat"
              rounded="pill"
              size="large"
              class="font-weight-bold text-primary elevation-2"
              prepend-icon="mdi-arrow-down"
              href="#featured-toys"
            >
              Browse 15 Featured Toys
            </v-btn>

            <!-- Point 1 -> Point 5 Link -->
            <v-btn
              to="/toys"
              color="accent"
              variant="flat"
              rounded="pill"
              size="large"
              class="font-weight-bold text-black elevation-2"
              append-icon="mdi-arrow-right"
            >
              More Toys (Point 5 Catalog)
            </v-btn>
          </div>
        </v-col>

        <!-- Hero Visual Illustration -->
        <v-col cols="12" md="5" class="d-flex justify-center">
          <v-card
            rounded="xl"
            elevation="6"
            class="pa-4 bg-white text-center w-100 max-width-380"
          >
            <v-img
              src="https://images.unsplash.com/photo-1546776310-eef45dd6d63c?auto=format&fit=crop&w=600&q=80"
              height="200"
              cover
              class="rounded-lg mb-3"
            />
            <div class="text-subtitle-1 font-weight-bold text-primary">
              ⚡ Instant WhatsApp Checkout
            </div>
            <div class="text-caption text-medium-emphasis">
              Pick your toy, enter delivery info, and order directly on WhatsApp!
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-card>

    <!-- Value Propositions / Perks -->
    <v-row class="mb-8">
      <v-col cols="12" sm="6" md="3">
        <v-card rounded="xl" elevation="1" class="pa-4 d-flex align-center ga-3 bg-surface">
          <v-avatar color="primary" variant="tonal" rounded="lg" size="48">
            <v-icon icon="mdi-truck-fast" color="primary" size="24" />
          </v-avatar>
          <div>
            <div class="text-subtitle-2 font-weight-bold">Free Fast Shipping</div>
            <div class="text-caption text-medium-emphasis">On orders over $50</div>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card rounded="xl" elevation="1" class="pa-4 d-flex align-center ga-3 bg-surface">
          <v-avatar color="success" variant="tonal" rounded="lg" size="48">
            <v-icon icon="mdi-whatsapp" color="success" size="24" />
          </v-avatar>
          <div>
            <div class="text-subtitle-2 font-weight-bold">WhatsApp Ordering</div>
            <div class="text-caption text-medium-emphasis">Category ID pre-attached</div>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card rounded="xl" elevation="1" class="pa-4 d-flex align-center ga-3 bg-surface">
          <v-avatar color="secondary" variant="tonal" rounded="lg" size="48">
            <v-icon icon="mdi-shield-check" color="secondary" size="24" />
          </v-avatar>
          <div>
            <div class="text-subtitle-2 font-weight-bold">100% Kid-Safe</div>
            <div class="text-caption text-medium-emphasis">Non-toxic certified</div>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card rounded="xl" elevation="1" class="pa-4 d-flex align-center ga-3 bg-surface">
          <v-avatar color="accent" variant="tonal" rounded="lg" size="48">
            <v-icon icon="mdi-tag-percent" color="accent" size="24" />
          </v-avatar>
          <div>
            <div class="text-subtitle-2 font-weight-bold">Best Price Promise</div>
            <div class="text-caption text-medium-emphasis">Discounts on top brands</div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Requirement 1: 15 Toy Listing Section Anchor -->
    <div id="featured-toys" class="mb-4">
      <div class="d-flex align-center justify-space-between flex-wrap ga-3 mb-4">
        <div>
          <div class="d-flex align-center ga-2">
            <v-icon icon="mdi-star-shooting" color="accent" size="28" />
            <h2 class="text-h5 font-weight-black">
              Featured 15 Toys Collection
            </h2>
          </div>
          <p class="text-body-2 text-medium-emphasis mt-1">
            Top 15 toys on our landing page with pagination. Search by name or category above!
          </p>
        </div>

        <!-- Point 1 -> Point 5 "Click to More" Button -->
        <v-btn
          to="/toys"
          color="primary"
          variant="tonal"
          rounded="pill"
          append-icon="mdi-open-in-new"
          class="font-weight-bold"
        >
          View Full Catalog (Point 5)
        </v-btn>
      </div>

      <!-- Category Filter Chips -->
      <div class="d-flex align-center flex-wrap ga-2 mb-6">
        <v-chip
          :variant="toysStore.selectedCategory === 'ALL' ? 'flat' : 'outlined'"
          :color="toysStore.selectedCategory === 'ALL' ? 'primary' : undefined"
          rounded="pill"
          class="font-weight-bold"
          @click="toysStore.setSelectedCategory('ALL')"
        >
          All Categories (15 Toys)
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

      <!-- Active Search/Filter Alert indicator -->
      <v-alert
        v-if="toysStore.searchQuery || toysStore.selectedCategory !== 'ALL'"
        color="info"
        variant="tonal"
        rounded="lg"
        density="comfortable"
        class="mb-6"
      >
        <div class="d-flex align-center justify-space-between flex-wrap ga-2">
          <span>
            Filtering by:
            <strong v-if="toysStore.searchQuery">"{{ toysStore.searchQuery }}"</strong>
            <strong v-if="toysStore.selectedCategory !== 'ALL'">
              in [{{ toysStore.selectedCategory }}]
            </strong>
            — Found {{ toysStore.filteredLandingToys.length }} toys on landing page.
          </span>
          <v-btn
            size="small"
            variant="text"
            color="info"
            prepend-icon="mdi-refresh"
            @click="toysStore.resetFilters()"
          >
            Reset Filters
          </v-btn>
        </div>
      </v-alert>
    </div>

    <!-- 15 Toy Listing Grid with Pagination -->
    <v-row v-if="toysStore.landingPaginatedToys.length > 0" class="mb-6">
      <v-col
        v-for="toy in toysStore.landingPaginatedToys"
        :key="toy.id"
        cols="12"
        sm="6"
        md="4"
      >
        <ToyCard :toy="toy" />
      </v-col>
    </v-row>

    <!-- Empty State if no toys match filter -->
    <v-card
      v-else
      rounded="xl"
      elevation="1"
      class="pa-8 text-center bg-surface mb-6"
    >
      <v-avatar color="grey-lighten-3" size="72" class="mb-3">
        <v-icon icon="mdi-magnify-remove-outline" size="36" color="grey-darken-1" />
      </v-avatar>
      <h3 class="text-h6 font-weight-bold mb-1">No Toys Found</h3>
      <p class="text-body-2 text-medium-emphasis mb-4">
        We couldn't find any toys matching your current search or category filter on the landing page.
      </p>
      <v-btn
        color="primary"
        variant="tonal"
        rounded="pill"
        prepend-icon="mdi-refresh"
        @click="toysStore.resetFilters()"
      >
        Clear Filters
      </v-btn>
    </v-card>

    <!-- Requirement 1: Pagination for 15 Toy Listing -->
    <div
      v-if="toysStore.landingTotalPages > 1"
      class="d-flex flex-column flex-sm-row align-center justify-space-between ga-3 mb-10 pa-4 bg-surface rounded-xl elevation-1"
    >
      <span class="text-caption text-medium-emphasis">
        Showing Page {{ toysStore.landingPage }} of {{ toysStore.landingTotalPages }}
        ({{ toysStore.filteredLandingToys.length }} toys total)
      </span>

      <v-pagination
        v-model="toysStore.landingPage"
        :length="toysStore.landingTotalPages"
        rounded="circle"
        density="comfortable"
        color="primary"
      />

      <div class="d-flex align-center ga-2">
        <span class="text-caption text-medium-emphasis">Per Page:</span>
        <v-btn-toggle
          v-model="toysStore.landingItemsPerPage"
          mandatory
          density="compact"
          color="primary"
          rounded="pill"
        >
          <v-btn :value="6" size="small">6</v-btn>
          <v-btn :value="9" size="small">9</v-btn>
          <v-btn :value="15" size="small">15</v-btn>
        </v-btn-toggle>
      </div>
    </div>

    <!-- Requirement 1: "Click to More Button to Click Point No. 5" Callout Banner -->
    <v-card
      color="secondary"
      rounded="xl"
      elevation="4"
      class="pa-6 pa-md-8 text-white mt-8"
    >
      <v-row align="center">
        <v-col cols="12" md="8">
          <div class="d-flex align-center ga-2 mb-2">
            <v-chip color="white" variant="flat" size="small" class="text-secondary font-weight-black">
              POINT NO. 5
            </v-chip>
            <span class="text-caption font-weight-bold text-uppercase text-grey-lighten-3">
              Full Toy Collection
            </span>
          </div>

          <h2 class="text-h4 font-weight-black mb-2">
            Want to See All 30+ Toys?
          </h2>

          <p class="text-body-1 text-grey-lighten-2 mb-0">
            Visit our separate All Toys Catalog page (Point 5). Browse our entire collection with global search, category filtering, multi-item cart, and direct WhatsApp ordering.
          </p>
        </v-col>

        <v-col cols="12" md="4" class="text-md-right text-left">
          <!-- The explicit "Click to More" button linking to Point 5 -->
          <v-btn
            to="/toys"
            color="white"
            variant="flat"
            size="x-large"
            rounded="pill"
            class="text-secondary font-weight-black elevation-3"
            append-icon="mdi-arrow-right-bold"
          >
            Click for More Toys
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { useToysStore } from '~/stores/toys'

const toysStore = useToysStore()

useHead({
  title: 'ToyJoy - Online Toy Shop | 15 Featured Toys',
  meta: [
    {
      name: 'description',
      content: 'Shop top 15 kids toys with instant WhatsApp ordering, global search, and free delivery on ToyJoy.',
    },
  ],
})
</script>
