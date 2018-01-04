import { FETCH_COMMENTS } from './types'

export function setComments(comments) {
    return {
        type: FETCH_COMMENTS,
        comments
    }
}
