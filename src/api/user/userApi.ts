import http from '@/api/request'

export const API: API_DTYPE = {
  getUserinfo: ['/api/user', 'GET'],
}

export const getUser = () => http.request(API.getUserinfo, {})
