import { FETCH_POSTS, SORT_POSTS } from './types'

export function setPosts(posts) {
    return {
        type: FETCH_POSTS,
        posts
    }
}

export function sortPosts(sort) {
    return {
        type: SORT_POSTS,
        sort
    }
}

