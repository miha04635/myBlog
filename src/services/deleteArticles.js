const deleteArticles = async (slug, token) => {
  try {
    const response = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: `Token ${token}` },
    })

    if (!response.ok) {
      const data = await response.json()
      return { success: false, errors: data.errors }
    }

    return { success: true }
  } catch {
    return { success: false, errors: { general: 'Network error. Please try again.' } }
  }
}

export default deleteArticles
