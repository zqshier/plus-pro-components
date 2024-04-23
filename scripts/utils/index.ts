import path from 'node:path'
import type { RollupBuild, OutputOptions } from 'rollup'
import { pkgRoot } from './paths'

export function writeBundles(bundle: RollupBuild, options: OutputOptions[]) {
  return Promise.all(options.map(option => bundle.write(option)))
}

export async function writeBundlesFunction(
  getBundle: (option: OutputOptions) => Promise<RollupBuild>,
  options: OutputOptions[]
) {
  const task = []
  for (let index = 0; index < options.length; index++) {
    const option = options[index]
    const bundle = await getBundle(option)
    task.push(bundle.write(option))
  }
  return task
}

export function formatBundleFilename(name: string, minify?: boolean, ext?: string) {
  return `${name}${minify ? '.min' : ''}.${ext}`
}

export const PKG_NAME = 'plus-pro-components'

export const PKG_CAMEL_CASE_NAME = 'PlusProComponents'

export const PKG_PREFIX = '@plus-pro-components'

export const PKG_CAMEL_CASE_LOCAL_NAME = 'PlusProComponentsLocale'

export const target = 'es2018'

const alias = [
  'node_modules/element-plus',
  'node_modules/@vue/shared',
  'node_modules/async-validator'
]

const relative = ['../../../../', '../../../', '../../', '../']
/**
 * 替换 dts 中的别名
 * @param id
 * @returns
 */
export const pathRewriter = (id: string) => {
  /**
   * 解决style/*.ts中导入element-plus外部样式导致打包出现问题。
   */
  id = id.replaceAll(`@external`, `element-plus/es/components`)

  id = id.replaceAll(`${PKG_PREFIX}/theme-chalk`, `${PKG_NAME}/theme-chalk`)
  id = id.replaceAll(`${PKG_PREFIX}/`, `${PKG_NAME}/es/`)
  id = id.replaceAll(`packages/${PKG_NAME}`, `${PKG_NAME}`)
  id = id.replaceAll(`packages/types`, `${PKG_NAME}`)

  alias.forEach(item => {
    relative.forEach(path => {
      if (id.includes(path + item)) {
        id = id.replaceAll(path + item, item.replace('node_modules/', ''))
      }
    })
  })

  return id
}

/**
 * 替换 css dts
 * @param id
 * @returns
 */
export const cssResolver: any = {
  name: 'plus-pro-components-css-resolver',
  supports: (id: string) => id.includes('/style/css.ts') || id.includes('/style/index.ts'),
  transform: ({ id, code }: { id: string; code: string }) => {
    const tempPath = id.replaceAll('/', path.sep)
    const content = pathRewriter(code)
    return [
      {
        path: tempPath.replace(pkgRoot, './types').replace('.ts', '.d.ts'),
        content: JSON.stringify(content)
      }
    ]
  }
}
