import { Meter } from './types'

export const defaultMeter: Meter = {
  id: '',
  api_name: '',
  display_name: '',
  active: false,
  used_for_billing: false,
  type: 'sum',
  updated_time: '',
  created_time: ''
}

export const showedMeterProperties = Object.keys(defaultMeter).filter(
  (key) => key !== 'id' && key !== 'updated_time' && key !== 'created_time'
)

export const slugToTitle = (slug: string) => {
  const wordConnector = slug.includes('-') ? '-' : '_'

  const words = slug.split(wordConnector)

  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
