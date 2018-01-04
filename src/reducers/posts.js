import { FETCH_POSTS, SORT_POSTS } from '../actions/types'
  
export default function posts (state = [], action) {
  switch (action.type) {
    case FETCH_POSTS :
      return {
        ...state,
        posts: action.posts
      }
    case SORT_POSTS :
      return {
        ...state,
        posts: (action.sort === 'date') ? 
          state.posts.sort((a, b) => a.timestamp - b.timestamp) :
          state.posts.sort((a, b) => b.voteScore - a.voteScore)
      }
    default :
      return state
  }
}
