import { likeArticle, deleteLikeArticle } from '../actions/actions'

import setFavorited from './setFavorited'
import setDeleteFavorited from './deleteLikeArticle'

export const setLiked = async (e, slug, favorited, token, dispatch) => {
  e.stopPropagation()

  if (!favorited) {
    const { data } = await setFavorited(slug, token)

    dispatch(likeArticle(data.article))
  }
  if (favorited) {
    const { data } = await setDeleteFavorited(slug, token)
    dispatch(deleteLikeArticle(data.article))
  }
}
