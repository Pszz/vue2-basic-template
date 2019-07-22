import router from './instance.js'
import handler from './handler'

export default function (config) {
  let route = router(config)
  handler(route)
  return route
}
