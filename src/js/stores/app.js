import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    loading: true,
    hiddenMenu: false,
    showMenuItems: false,
    menuColor: false,
    scrollTop: 0,
    renderers: []
  }),
  actions: {
    setLoading(value) {
      this.loading = value
    },
    setHiddenMenu(value) {
      this.hiddenMenu = value
    },
    setShowMenuItems(value) {
      this.showMenuItems = value
    },
    setMenuColor(value) {
      this.menuColor = value
    },
    setScrollTop(value) {
      this.scrollTop = value
    },
    addRenderer(renderer) {
      this.renderers.push(renderer)
    },
    clearRenderers() {
      this.renderers = []
    }
  }
})