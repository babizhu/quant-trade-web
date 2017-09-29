/**
 * Created by liukun on 16/4/17.
 * 错误提示文本
 * 序号1000以下请保留系统使用
 */

const errors = {
  1: {
    text: '输入参数错误。',
  },
  2: {
    text: '服务器内部错误：%s，请联系管理员解决。',
  },

  101: {
    text: '用户尚未登录，请重新登录。',
  },
  102: {
    text: '用户已经存在。',
  },
  103: {
    text: '缺乏操作必须的参数：%s',
  },
  104: {
    text: '用户权限不足。',
  },
  200: {
    text: '远程网络无法连接,超时退出。',
  },
  201: {
    text: '访问的远程地址 %s 拒绝连接。',
  },
  202: {
    text: '此目录下已经存在同名文件 : %s ，请删除后再试）。',
  },
  203: {
    text: '此目录下不为空 ，请删除后再试，或者打开递归删除开关。',
  },

  404: {
    text: '访问的远程地址没找到。',
  },

  500: {
    text: '后端出现未知逻辑错误，请联系管理员解决。',
  },
  501: {
        // text: 'hadoop文件%s没找到,this is a test for%s'
    text: '您无权访问 %s 文件（夹）',
  },
  504: {
    text: '网络错误 : %s',
  },
  600: {
        // text: 'hadoop文件%s没找到,this is a test for%s'
    text: '您无法访问远程网络',
  },
  601: {
        // text: 'hadoop文件%s没找到,this is a test for%s'
    text: '您无权访问 %s 文件（夹）',
  },
  998: {
        // text: 'hadoop文件%s没找到,this is a test for%s'
    text: '数据库错误：%s',
  },
  999: {
    text: '系统错误：%s',
  },
  1004: {
    text: '登录失败，用户名或密码错误。',
  },

  5000: {
    text: '指定的交易ID不存在:%s',
  },
};

/**
 * 通过错误id来获取错误描述文本
 * @param errId 错误id
 * @param args  错误的相关参数
 * @param url   发生错误的url
 * @returns {*}
 */
export function getErrMsg(errId, args, url) {
  const err = errors[errId];
  if (!err) {
    return {
      url,
      msg: `未知错误：errId=${errId},args=${args}`,
    };
  }
  let msg = err.text;
  if (!msg) {
    return {
      url,
      msg: `未知错误：errId=${errId},args=${args}`,
    };
  }
  if (!args) {
    args = '';
  }
    // alert(args);
    // console.log(args);

  if (args.split) {
    for (const arg of args.split('^')) {
      msg = msg.replace('%s', arg);
    }
  }

  return {
    url,
    msg,
    errId,
  };
    // return 'url: ' + url + '\n' + msg;
}
