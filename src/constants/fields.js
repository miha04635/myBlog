export const filedEmail = {
  name: 'email',
  label: 'Email address',
  type: 'email',
  validation: {
    required: 'The email field is required',
    pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Incorrect email address' },
  },
}

export const filedPassword = {
  name: 'password',
  label: 'Password',
  type: 'password',
  validation: {
    required: 'Field password',
    minLength: { value: 6, message: 'Minimum of 6 characters' },
    maxLength: { value: 40, message: 'Maximum of 40 characters' },
  },
}

export const filedUsername = {
  name: 'username',
  label: 'Username',
  type: 'text',
  validation: {
    required: 'Write username',
    pattern: { value: /^[a-zA-Z0-9]{3,20}$/, message: 'Only Latin letters and numbers. Up to 20 characters' },
  },
}

export const filedRepeatPassword = {
  name: 'passwordRepeat',
  label: 'Repeat Password',
  type: 'password',
  validation: { required: 'Please confirm your password' },
  isPasswordRepeat: true,
}

export const filedTitle = {
  name: 'title',
  label: 'Title',
  type: 'text',
  validation: { required: 'Title is required' },
  placeholder: 'Enter title',
}

export const filedDescription = {
  name: 'description',
  label: 'Short description',
  type: 'text',
  validation: { required: 'Description is required' },
  placeholder: 'Enter short description',
}

export const filedBody = {
  name: 'body',
  label: 'Text',
  type: 'textarea',
  validation: { required: 'Text is required' },
  placeholder: 'Text',
}
