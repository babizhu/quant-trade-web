import { request, config } from '../utils';

const { api } = config;
const { userQuery, userSave, userDelete } = api;

export async function query(params) {
  return request({
    url: userQuery,
    method: 'get',
    data: params,
  });
}

export async function create(params) {
  return request({
    url: userSave,
    method: 'post',
    data: params,
  });
}

export async function remove(params) {
  return request({
    url: userDelete,
    method: 'post',
    data: params,
  });
}
