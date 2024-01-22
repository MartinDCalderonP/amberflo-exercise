type MeterType = 'sum' | 'max' | 'unique_count'

export interface Meter {
  id: string
  api_name: string
  display_name: string
  active: boolean
  used_for_billing: boolean
  type: MeterType
  updated_time: string
  created_time: string
}

export type SortDirection = 'asc' | 'desc'
