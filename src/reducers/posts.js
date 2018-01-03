import { FETCH_POSTS, SORT_POSTS } from '../actions/constants'
  
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
          state.posts.sort((a, b) => b.timestamp - a.timestamp) :
          state.posts.sort((a, b) => a.voteScore - b.voteScore)
      }
    default :
      return state
  }
}
