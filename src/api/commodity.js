import request from '@/utils/request'

const prefix = '/commodity'

const getAllCommodity = (page, limit) => {
  const api = `${prefix}?page=${page}&limit=${limit}`
  return request({
    url: api,
    method: 'get'
  })
}

const getCommodityById = (id) => {
  const api = `${prefix}/${id}`
  return request({
    method: 'get',
    url: api
  })
}

const updateCommodity = (commodity) => {
  const api = `${prefix}`
  return request({
    url: api,
    method: 'put',
    data: commodity
  })
}

const saveCommodity = (commodity) => {
  const api = `${prefix}`
  return request({
    url: api,
    method: 'post',
    data: commodity
  })
}

const delCommodity = (id) => {
  const api = `${prefix}/${id}`
  return request({
    url: api,
    method: 'delete'
  })
}

export {
  getAllCommodity,
  getCommodityById,
  updateCommodity,
  saveCommodity,
  delCommodity
}
