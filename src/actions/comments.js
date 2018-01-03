import { FETCH_COMMENTS } from './constants'

export function setComments(comments) {
    return {
        type: FETCH_COMMENTS,
        comments
    }
}
