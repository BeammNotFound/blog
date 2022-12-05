import { defineStore } from 'pinia'
import { i18n } from '@/locales/index'

export const useMetaStore = defineStore('metaStore', {
  state: () => {
    return {
      title: 'BeamStark'
    }
  },
  actions: {
    setTitle(title: string): void {
      this.title = i18n.global.te(`menu.${title}`) ? i18n.global.t(`menu.${title}`) : title
    }
  }
})
