'use strict'

/**
 * 
 * @param {string} path 
 * @returns {Array<string>}
 */
const pathToArray = (path) => {
  if (Array.isArray(path)) return path
  return path.split(/\[|\]\.|\]\[|\.|\]/gm).filter((key) => key!== '')
}

/**
 * 
 * @param {any} object 
 * @param {string | Array} path 
 * @param {any} defaults 
 * @returns {any}
 */
const get = (object, path, defaults) => {
  if (typeof object !== 'object') return defaults

  if (typeof path === 'string' && object[path] !== undefined) return object[path]

  /**
   * 
   * @param {any} obj 
   * @param {Array<string>} nextPath 
   * @returns {any}
   */
  const getDeeperProp = (obj, nextPath) => {
    const key = nextPath.shift()
    if (obj[key] !== undefined) {
      if (nextPath.length > 0) return getDeeperProp(obj[key], nextPath)
  
      return obj[key]
    }

    return defaults
  }

  return getDeeperProp(object, pathToArray(path))
}

module.exports = get
