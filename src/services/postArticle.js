const postArticles = async ({ description, body, title }, token, tagList) => {
  console.log('tagList>>>', tagList)
  try {
    const response = await fetch('https://blog-platform.kata.academy/api/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Token ${token}` },
      body: JSON.stringify({
        article: {
          title,
          description,
          body,
          tagList,
        },
      }),
    })

    const data = await response.json()
    console.log(data)

    if (!response.ok) {
      return { success: false, errors: data.errors }
    }

    return { success: true, user: data }
  } catch (err) {
    return { success: false, errors: { general: 'Network error. Please try again.' } }
  }
}

export default postArticles
