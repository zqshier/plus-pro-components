import type { RecordType, RenderTypes } from '@plus-pro-components/types'

export interface PlusHeaderSelfProps {
  logo?: string
  fixed?: boolean
  title?: string
  logoutText?: string
  trigger?: 'click' | 'hover'
  userInfo?: {
    [index: string | number | symbol]: unknown
    username?: string
    avatar?: string
  }
  hasUserInfo?: boolean
  dropdownList?: {
    label: string
    value: string
  }[]
  // eslint-disable-next-line vue/require-default-prop
  renderHeaderLeft?: (info: { logo: string; title: string }) => RenderTypes
  // eslint-disable-next-line vue/require-default-prop
  renderHeaderRight?: (info: {
    userInfo: Record<string | number | symbol, unknown>
    title: string
  }) => RenderTypes
}

export type PlusHeaderProps = PlusHeaderSelfProps & RecordType

export interface PlusHeaderEmits {
  (e: 'clickDropdownItem', item: { label: string; value: string }): void
}
