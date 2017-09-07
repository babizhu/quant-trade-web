import { request, config } from '../utils';

const { api } = config;
const { userQuery,userSave } = api;

export async function query (params) {
  return request({
    url: userQuery,
    method: 'get',
    data: params,
  })
}

export async function create (params) {
  return request({
    url: userSave,
    method: 'post',
    data: params,
  })
}

export async function remove (params) {
  return request({
    url: user,
    method: 'delete',
    data: params,
  })
}

export async function update (params) {
  return request({
    url: user,
    method: 'patch',
    data: params,
  })
}
