import http from '@/api/request'

export const API: API_DTYPE = {
  getTest: ['/api/getTest', 'GET'],
  getTestById: ['/api/get_test/:id', 'GET'],
  getTestThree: ['/api/get_test/three', 'GET'],
}

export const getTest = () => http.request(API.getTest)
export const getTest222 = (id: number) => http.request(API.getTestById, { _id: `${id}` })
export const getTest333 = (param = {}, body = {}) => http.request<{ test: number }>(API.getTestThree, { _param: param, _body: body })
