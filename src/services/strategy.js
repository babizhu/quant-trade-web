import { request, config } from '../utils';

const { api } = config;
const { strategyQuery, strategySave, strategyDelete } = api;

export async function query(params) {
  return request({
    url: strategyQuery,
    method: 'get',
    data: params,
  });
}

export async function create(params) {
  return request({
    url: strategySave,
    method: 'post',
    data: params,
  });
}

export async function remove(params) {
  return request({
    url: strategyDelete,
    method: 'post',
    data: params,
  });
}
