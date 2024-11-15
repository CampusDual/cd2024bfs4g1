import { MenuRootItem } from 'ontimize-web-ngx';

export const MENU_CONFIG: MenuRootItem[] = [
  { id: 'home', name: 'HOME', icon: 'home', route: '/main/home'},
  { id: 'bootcamps', name: 'Bootcamps', icon: 'view_cozy', route: '/main/bootcamps'},
  {
    id: 'admin', name: 'ADMIN', icon: 'admin_panel_settings',
    items: [
      { id: 'roles', name: 'ROLES', route: '/main/admin/roles', icon: 'supervisor_account' },
      { id: 'users', name: 'USERS', route: '/main/admin/users', icon: 'person' },
    ]
  },
  { id: 'students', name: 'Students', route: '/main/students', icon: 'groups' },
  { id: 'tutors', name: 'Mentors', route: '/main/tutors', icon: 'work' },
  { id: 'personalinfo', name: 'Mis Datos', tooltip: 'DATOS', route:'/main/data', icon:'article'},
  {id: 'config', name: 'Config', route: '/main/config', icon: 'tune' },
  { id: 'logout', name: 'LOGOUT', route: '/login', icon: 'power_settings_new', confirm: 'yes' }
];
