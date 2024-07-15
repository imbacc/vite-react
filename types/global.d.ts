import type { METHOD_DTYPE } from 'imba-request/dist/types/imba-request'

declare global {
  export type keyof_CONVERT<T> = keyof T
  export type key_valueof_CONVERT<T> = { [key in keyof_CONVERT<T>]: key extends keyof_CONVERT<T> ? T[key] : never }
  export type API_DTYPE = Record<string, string | [string, METHOD_DTYPE] | [string, METHOD_DTYPE, number]>

  export const __APP_INFO__: {
    pkg: {
      name: string
      version: string
      dependencies: Record<string, any>
      devDependencies: Record<string, any>
    }
    lastBuildTime: string
  }

  export interface ViteEnv_DTYPE {
    /**
     * HOST
     */
    VITE_HOST: string
    /**
     * APP标题
     */
    VITE_GLOB_APP_TITLE: string
    /**
     * mock
     */
    VITE_USE_MOCK: boolean
    /**
     * gzip
     */
    VITE_BUILD_GZIP: boolean
    /**
     * 接口地址
     */
    VITE_GLOB_API_URL: string
    /**
     * 上传地址
     */
    VITE_GLOB_UPLOAD_URL: string
    /**
     * 启动端口
     */
    VITE_PORT: number
    /**
     * 公共路径
     */
    VITE_PUBLIC_PATH: string
    /**
     * 代理数组
     */
    VITE_PROXY: Record<string, any>
    /**
     * 删除console
     */
    VITE_DROP_CONSOLE: boolean
    /**
     * 兼容老版本浏览器
     */
    VITE_LEGACY: boolean
    /**
     * 是否启用gzip压缩或brotli压缩
     * 可选: gzip | brotli | none
     * 如果你需要多种形式，你可以用','来分隔
     */
    VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none'
    /**
     * 使用压缩时是否删除原始文件，默认为false
     */
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean
  }
}
