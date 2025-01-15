import { format } from 'date-fns'

const formatDate = el => {
  return format(new Date(el), 'LLLL d, y')
}

export default formatDate
