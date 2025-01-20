import { MenuRootItem } from 'ontimize-web-ngx';

export const MENU_CONFIG: MenuRootItem[] = [
  { id: 'home', name: 'HOME', svgIcon: 'ontimize:nodo', route: '/main/home' },
  { id: 'bootcamps', name: 'Bootcamps', icon: 'view_cozy', route: '/main/bootcamps' },
  {
    id: 'admin', name: 'ADMIN', icon: 'admin_panel_settings',
    items: [
      { id: 'roles', name: 'ROLES', route: '/main/admin/roles', icon: 'supervisor_account' },
      { id: 'users', name: 'USERS', route: '/main/admin/users', icon: 'person' },
      { id: 'routes', name: 'ROUTES', route: '/main/admin/routes', icon: 'http' },
      { id: 'menus', name: 'MENUS', route: '/main/admin/menus', icon: 'list' },
    ]
  },
  { id: 'students', name: 'Students', route: '/main/students', icon: 'groups' },
  { id: 'tutors', name: 'Mentors', route: '/main/tutors', icon: 'work' },
  { id: 'commercialsection', name: 'Commercial Section', route:'/main/commercial', icon:'call'},
  { id: 'personalinfo', name: 'Mis Datos', route:'/main/data/student', icon:'article'},
  { id: 'personaltutorinfo', name: 'Mis Datos', route:'/main/data/tutor', icon:'article'},
  {id: 'config', name: 'Config', route: '/main/config', icon: 'tune' },
  { id: 'logout', name: 'LOGOUT', route: '/login', icon: 'power_settings_new', confirm: 'yes' }
];
