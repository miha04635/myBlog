export const REGISTER_OPTIONS = {
  username: {
    required: 'Username is required',
    pattern: {
      value: /^[a-zA-Z0-9]{0,20}$/,
      message: 'Только латинские буквы, цифры. До 20 символов',
    },
  },
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address',
    },
  },
  password: {
    minLength: {
      value: 6,
      message: 'Minimum 6 characters',
    },
    maxLength: {
      value: 48,
      message: 'Maximum 48 characters',
    },
  },
  image: {
    pattern: {
      value: /^(ftp|http|https):\/\/[^ "]+$/,
      message: 'Please enter a valid URL',
    },
  },
}
