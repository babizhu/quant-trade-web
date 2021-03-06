import { request, config } from '../utils';

const { api } = config;
const { tradeQuery, tradeSave, tradeDelete, tradeDetail, tradeStart, tradeGetLogs } = api;

export async function query(params) {
  return request({
    url: tradeQuery,
    method: 'get',
    data: params,
  });
}
export async function detail(params) {
  return request({
    url: tradeDetail,
    method: 'get',
    data: params,
  });
}

export async function start(params) {
  return request({
    url: tradeStart,
    method: 'post',
    data: params,
  });
}
export async function getLogs(params) {
  return request({
    url: tradeGetLogs,
    method: 'get',
    data: params,
  });
}
export async function save(params) {
  return request({
    url: tradeSave,
    method: 'post',
    data: params,
  });
}

export async function remove(params) {
  return request({
    url: tradeDelete,
    method: 'post',
    data: params,
  });
}
