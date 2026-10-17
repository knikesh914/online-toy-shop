import { defineStore } from 'pinia'
import { toysList, categories } from '~/data/toysData'
import type { Toy, Category } from '~/types/toy'

export const useToysStore = defineStore('toys', {
  state: () => ({
    allToys: [...toysList] as Toy[],
    categories: [...categories] as Category[],
    searchQuery: '',
    selectedCategory: 'ALL',
    sortBy: 'featured', // 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'name'
    landingPage: 1,
    landingItemsPerPage: 6,
    allToysPage: 1,
    allToysItemsPerPage: 8,
  }),

  getters: {
    // 15 toys curated for landing page
    rawLandingToys: (state) => {
      return state.allToys.filter((toy) => toy.isLanding)
    },

    // Filtered landing toys (15 items filtered by search and category)
    filteredLandingToys: (state) => {
      let result = state.allToys.filter((toy) => toy.isLanding)

      // Search by name or category name
      if (state.searchQuery.trim()) {
        const q = state.searchQuery.toLowerCase().trim()
        result = result.filter(
          (t) =>
            t.name.toLowerCase().includes(q) ||
            t.category.toLowerCase().includes(q) ||
            t.categoryId.toLowerCase().includes(q)
        )
      }

      // Filter by category
      if (state.selectedCategory !== 'ALL') {
        result = result.filter((t) => t.categoryId === state.selectedCategory)
      }

      // Sorting
      return sortToys(result, state.sortBy)
    },

    landingPaginatedToys(): Toy[] {
      const start = (this.landingPage - 1) * this.landingItemsPerPage
      return this.filteredLandingToys.slice(start, start + this.landingItemsPerPage)
    },

    landingTotalPages(): number {
      return Math.max(1, Math.ceil(this.filteredLandingToys.length / this.landingItemsPerPage))
    },

    // All toys for separate listing page (Point 5)
    filteredAllToys: (state) => {
      let result = [...state.allToys]

      // Search by name or category name or ID
      if (state.searchQuery.trim()) {
        const q = state.searchQuery.toLowerCase().trim()
        result = result.filter(
          (t) =>
            t.name.toLowerCase().includes(q) ||
            t.category.toLowerCase().includes(q) ||
            t.categoryId.toLowerCase().includes(q)
        )
      }

      // Filter by category
      if (state.selectedCategory !== 'ALL') {
        result = result.filter((t) => t.categoryId === state.selectedCategory)
      }

      // Sorting
      return sortToys(result, state.sortBy)
    },

    allToysPaginated(): Toy[] {
      const start = (this.allToysPage - 1) * this.allToysItemsPerPage
      return this.filteredAllToys.slice(start, start + this.allToysItemsPerPage)
    },

    allToysTotalPages(): number {
      return Math.max(1, Math.ceil(this.filteredAllToys.length / this.allToysItemsPerPage))
    },

    getCategoryById: (state) => (id: string) => {
      return state.categories.find((c) => c.id === id)
    },
  },

  actions: {
    setSearchQuery(q: string) {
      this.searchQuery = q
      this.landingPage = 1
      this.allToysPage = 1
    },

    setSelectedCategory(catId: string) {
      this.selectedCategory = catId
      this.landingPage = 1
      this.allToysPage = 1
    },

    setSortBy(sort: string) {
      this.sortBy = sort
    },

    setLandingPage(page: number) {
      this.landingPage = page
    },

    setAllToysPage(page: number) {
      this.allToysPage = page
    },

    resetFilters() {
      this.searchQuery = ''
      this.selectedCategory = 'ALL'
      this.sortBy = 'featured'
      this.landingPage = 1
      this.allToysPage = 1
    },
  },
})

function sortToys(items: Toy[], sortBy: string): Toy[] {
  const cloned = [...items]
  switch (sortBy) {
    case 'price-asc':
      return cloned.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return cloned.sort((a, b) => b.price - a.price)
    case 'rating':
      return cloned.sort((a, b) => b.rating - a.rating)
    case 'name':
      return cloned.sort((a, b) => a.name.localeCompare(b.name))
    default:
      return cloned
  }
}
