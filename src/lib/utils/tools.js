export const each = (obj, cb) => {
    let keys
    if (obj instanceof Array) {
      return obj.forEach(cb)
    } else if (typeof obj === 'object') {
      keys = Object.keys(obj)
      return keys.forEach((k) => {
        cb(obj[k], k)
      })
    }
    return null
}