'use client'
import { Meter } from './types'

const fetchUrl = process.env.NEXT_PUBLIC_API_URL ?? ''
const fetchUrlWithId = (id: string) => `${fetchUrl}/${id}`

const commonHeaders = {
  'Content-Type': 'application/json',
  'API-KEY': process.env.NEXT_PUBLIC_API_KEY ?? ''
}

const fetchData = async (url: string, options: RequestInit) => {
  const response = await fetch(url, options)
  const data = await response.json()
  return data
}

export const getMeters = async () => {
  const options = {
    headers: commonHeaders
  }
  return fetchData(fetchUrl, options)
}

export const postMeter = async (meter: Meter) => {
  const options = {
    method: 'POST',
    headers: commonHeaders,
    body: JSON.stringify(meter)
  }
  return fetchData(fetchUrl, options)
}

export const putMeter = async (meter: Meter) => {
  const options = {
    method: 'PUT',
    headers: commonHeaders,
    body: JSON.stringify(meter)
  }
  return fetchData(fetchUrlWithId(meter.id), options)
}

export const deleteMeter = async (meterId: string) => {
  const options = {
    method: 'DELETE',
    headers: commonHeaders
  }
  return fetchData(fetchUrlWithId(meterId), options)
}
