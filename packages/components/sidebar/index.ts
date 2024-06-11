import Sidebar from './src/index.vue'
import SidebarItem from './src/sidebar-item.vue'

export type PlusSidebarInstance = InstanceType<typeof Sidebar>
export * from './src/type'

export const PlusSidebar = Sidebar
export const PlusSidebarItem = SidebarItem
