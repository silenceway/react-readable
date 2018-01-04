import { FETCH_CATEGORIES } from './types'

export function setCategories(categories) {
  return {
    type: FETCH_CATEGORIES,
    categories
    }
}
