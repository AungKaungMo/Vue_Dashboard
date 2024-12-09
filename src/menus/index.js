/***************************************************
           MENU FOR SIDEBAR TITLES AND ICONS
**************************************************/
import { Person, Dashboard, Location } from '@/assets/icons'
const SideNavbar = [
  /***************************************************
           DASHBOARD SIDEBAR 
**************************************************/
  {
    title: 'Dashboard',
    path: '/dashboard',
    roles: ['developer'],
    icon: Dashboard
  },
  /***************************************************
            MASTER DATA GROUP
**************************************************/
  {
    groupTitle: 'Master Data',
    roles: ['developer'],
    menuList: [
      {
        title: 'Location',
        icon: Location,
        path: '/master-data/locations',
        roles: ['developer']
      },
    ]
  },

  /***************************************************
           USER MANAGEMENT GROUP
**************************************************/
  {
    groupTitle: 'Admin',
    roles: ['developer'],
    menuList: [
      {
        title: 'Setting',
        icon: Person,
        path: 'user-management',
        roles: ['developer'],
        submenu: true,
        submenuItems: [
          {
            title: 'Admin',
            path: '/user-management/user',
            roles: ['developer']
          },
          {
            title: 'Role',
            path: '/user-management/role',
            roles: ['developer']
          },
          
          {
            title: 'Permission',
            path: '/user-management/permission',
            roles: ['developer']
          }
        ]
      }
    ]
  },

]

export default SideNavbar
