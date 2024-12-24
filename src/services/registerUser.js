const registerUsers = async ({ username, password, email }) => {
  try {
    const response = await fetch('https://blog-platform.kata.academy/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username,
          email,
          password,
        },
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return { success: false, errors: data.errors }
    }

    return { success: true, user: data.user }
  } catch (err) {
    return { success: false, errors: { general: 'Network error. Please try again.' } }
  }
}

export default registerUsers
