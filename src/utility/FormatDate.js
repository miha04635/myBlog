import { format } from 'date-fns'

export const formatDate = el => {
  return format(new Date(el), 'LLLL d, y')
}
