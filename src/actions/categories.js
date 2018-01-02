import { FETCH_CATEGORIES } from './constants'

export function setCategories(categories) {
  return {
    type: FETCH_CATEGORIES,
    categories
    }
}
