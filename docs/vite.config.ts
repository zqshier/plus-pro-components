import { fileURLToPath, URL } from 'url'
import Inspect from 'vite-plugin-inspect'
import type { PluginOption, AliasOptions } from 'vite'
import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import viteCompression from 'vite-plugin-compression'

// 生产环境判断
const isEnvProduction = process.env.NODE_ENV === 'production'

const pathResolve = (dir: string): string => fileURLToPath(new URL(dir, import.meta.url))

const isWrite = process.env.PLUS_WRITE === 'true'
const isDebug = process.env.PLUS_DEBUG === 'true'

const alias: AliasOptions = isWrite
  ? {
      'plus-pro-components-main': pathResolve('../dist/plus-pro-components'),
      'plus-pro-components-css': pathResolve('../dist/plus-pro-components/theme-chalk/index.css')
    }
  : isDebug
  ? {
      'plus-pro-components-main': pathResolve('../packages/plus-pro-components/index'),
      'plus-pro-components/es/locale/lang/zh-cn': pathResolve('../packages/locale/lang/zh-cn'),
      'plus-pro-components/es/locale/lang/en': pathResolve('../packages/locale/lang/en'),
      'plus-pro-components-css': pathResolve('../packages/theme-chalk/src/index.scss')
    }
  : {
      'plus-pro-components-main': pathResolve('./node_modules/plus-pro-components'),
      'plus-pro-components-css': pathResolve(
        './node_modules/plus-pro-components/theme-chalk/index.css'
      )
    }

export default defineConfig(() => {
  return {
    server: {
      host: true,
      port: 3001
    },
    resolve: {
      alias: alias
    },
    plugins: [
      Inspect() as PluginOption,
      vueJsx() as PluginOption,
      isEnvProduction
        ? (viteCompression({
            filter: /\.(js|css)$/i,
            // algorithm: 'brotliCompress',
            threshold: 10 * 1024 // 10kb
          }) as PluginOption)
        : undefined
    ]
  }
})
