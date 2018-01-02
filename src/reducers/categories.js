import { FETCH_CATEGORIES } from '../actions/constants'
  
export default function categories (state = [], action) {
  if (action.type === FETCH_CATEGORIES) {
    return {
      ...state,
      categories: action.categories
    }
  }
  return state
}
  