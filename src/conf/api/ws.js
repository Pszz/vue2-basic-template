export default {
  url: '192.168.1.145:60100',
  miner: {
    // 心跳
    heartbeat: 'miner.heartbeat',
    // 配置  获取&设置
    get_config: 'miner.get_config',
    set_config: 'miner.set_config',
    // 获取P盘列表
    get_plist: 'miner.get_plist',
    // 获取挂载状态
    get_status: 'miner.get_status',
    // 获取本机nonce
    get_local_nonce: 'miner.get_local_nonce',
    // 取top100的nonce
    get_top_nonce: 'miner.get_top_nonce',
    get_config_file: 'miner.get_config_file',
    // 自动更新
    autoupdate: 'miner.auto_update',
    // 自动启动
    autostart: 'miner.auto_startup',
    // 获取log
    minerlog: 'miner.get_log'
  }
}
