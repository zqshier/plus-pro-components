import type { PlusRouteRecordRaw, RecordType, RenderTypes } from '@plus-pro-components/types'

export interface PlusBreadcrumbSelfProps {
  routes?: PlusRouteRecordRaw[]
  replace?: boolean
  // eslint-disable-next-line vue/require-default-prop
  renderTitle?: (route: PlusRouteRecordRaw) => RenderTypes
}

export type PlusBreadcrumbProps = PlusBreadcrumbSelfProps & RecordType
