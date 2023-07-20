import axiosClient from "../config/axios"

export function httpGet(endpoint, headers) {
  return axiosClient.get(endpoint, { headers })
}

export function httpPost(endpoint, body, headers) {
  return axiosClient.post(endpoint, body, { headers })
}

export function httpPut(endpoint, body, headers) {
  return axiosClient.put(endpoint, body, { headers })
}

export function httpDelete(endpoint, headers) {
  return axiosClient.delete(endpoint, { headers })
}