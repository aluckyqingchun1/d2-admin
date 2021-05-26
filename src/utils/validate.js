function checkProv (val) {
  const pattern = /^[1-9][0-9]/
  const provs = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江 ',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北 ',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏 ',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '中国台湾',
    81: '中国香港',
    82: '中国澳门'
  }
  if (pattern.test(val)) {
    if (provs[val]) {
      return true
    }
  }
  return false
}

function checkDate (val) {
  const pattern = /^(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)$/
  if (pattern.test(val)) {
    const year = val.substring(0, 4)
    const month = val.substring(4, 6)
    const date = val.substring(6, 8)
    const date2 = new Date(year + '-' + month + '-' + date)
    if (date2 && date2.getMonth() === (parseInt(month) - 1)) {
      return true
    }
  }
  return false
}

function checkCode (val) {
  const p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
  const code = val.substring(17)
  if (p.test(val)) {
    let sum = 0
    for (let i = 0; i < 17; i++) {
      sum += val[i] * factor[i]
    }
    if (String(parity[sum % 11]) === code.toUpperCase()) {
      return true
    }
  }
}

// 身份证校验
/**
   *
   * @param  card
   * @returns {boolean}
   */
export function validateIdCard (val) {
  if (checkCode(val)) {
    var date = val.substring(6, 14)
    if (checkDate(date)) {
      if (checkProv(val.substring(0, 2))) {
        return true
      }
    }
  }
  return false
}

/**
   * @param {string} path
   * @returns {Boolean}
   */
export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
   * @param {string} str
   * @returns {Boolean}
   */
// export function validUsername (str) {
//   const valid_map = ['admin', 'editor']
//   return valid_map.indexOf(str.trim()) >= 0
// }

/**
   * @param {string} url
   * @returns {Boolean}
   */
export function validURL (url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
   * @param {string} str
   * @returns {Boolean}
   */
export function validLowerCase (str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
   * @param {string} str
   * @returns {Boolean}
   */
export function validUpperCase (str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
   * @param {string} str
   * @returns {Boolean}
   */
export function validAlphabets (str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

// /**
//    * @param {string} email
//    * @returns {Boolean}
//    */
// export function validEmail (email) {
//   const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//   return reg.test(email)
// }

/**
   * @param {string} str
   * @returns {Boolean}
   */
export function isString (str) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
   * @param {Array} arg
   * @returns {Boolean}
   */
export function isArray (arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

/**
   *  字母、数字两种及以上组合，6-16个字符
   * @param {String} str
   */
export function password (str) {
  const reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{4,16}$/g
  return reg.test(str)
}

/**
   * 判断11位手机号 1开头10位数字
   * @param {Number} number
   */
export function isTel (number) {
  const reg = /^1\d{10}$/ // 1开头10位数字
  return reg.test(number)
}

/**
   * 座机号码
   * @param {Number} number
   */
export function isPhone (number) {
  const reg = /^((0\d{2,3})-)(\d{7,8})(-(\d{1,4}))?$/
  return reg.test(number)
}

/**
   * 只能输入中文
   * @param {String} str
   */
export function checkChinese (str) {
  const reg = /^[\u4E00-\u9FA5]+$/g
  return reg.test(str)
}

/**
   * 社会信用代码
   * @param {String} str
   */
export function validateCreditCode (str) {
  const reg = /^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g
  return reg.test(str)
}

/**
   * 以英文开头 下划线出现0次或者1次
   * @param {String} str
   */
export function checkEnglish (str) {
  const reg = /^([a-z]+_?)+$/g
  return reg.test(str)
}
