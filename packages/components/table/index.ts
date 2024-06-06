import type { PlusTableProps } from './src/index.vue'
import { default as _Table } from './src/index.vue'

export type PlusTableInstance = InstanceType<typeof _Table>
export * from './src/type'
export type { PlusTableProps }

export const PlusTable = _Table
