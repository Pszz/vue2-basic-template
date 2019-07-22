export default {
  ruleMaps: {
    // 邮箱验证
    email: /^[a-z0-9_.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z0-9]{2,6}$/i,
    // 密码验证[字母+数字+长度6-30]
    // password: /^[a-z0-9]{6,30}$/i
    password: /.{6,30}/
  },
  /**
   * 表单校验
   * @param {*} data 需要验证的数据
   * @param {*} rules  验证的规则
   */
  validate (data = '', rules) {
    rules = Array.isArray(rules) ? rules : rules.split('|')
    return rules.some(v => {
      let rp = this.ruleMaps[v]
      if (rp) {
        return rp.test(data) === true
      } else {
        console.error('rules not find:', v)
        return false
      }
    })
  },
  /**
   * 扩展验证规则
   * @param {*} name 验证名称
   * @param {*} rule 验证规则
   */
  extends (name, rule) {
    this.ruleMaps[name] = rule
  }
}
