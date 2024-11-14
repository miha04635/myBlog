const registerUsers = async (username, password, email) => {
  console.log(username)

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

    if (response.ok) {
      console.log('User registered:', data)
    } else {
      console.error('Error:', data) // Вывод ошибки с сервера
    }
  } catch (err) {
    console.error('Network error:', err)
  }
}

export default registerUsers
