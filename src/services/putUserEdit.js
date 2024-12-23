const putUserEdit = async ({ username, email, password, image }, token) => {
  console.log(username, email, password, image)

  try {
    const response = await fetch('https://blog-platform.kata.academy/api/user', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Token ${token}` },
      body: JSON.stringify({
        user: {
          username,
          email,
          password,
          image,
        },
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return { success: false, errors: data.errors }
    }

    return { success: true, user: data.user }
  } catch (err) {
    console.error('Network error:', err)
    return { success: false, errors: { general: 'Network error. Please try again.' } }
  }
}

export default putUserEdit
