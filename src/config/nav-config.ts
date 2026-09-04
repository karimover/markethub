import { NavGroup } from '@/types';

export const navGroups: NavGroup[] = [
  {
    label: 'Магазин',
    items: [
      {
        title: 'Обзор',
        url: '/dashboard/overview',
        icon: 'dashboard',
        shortcut: ['d', 'd'],
        isActive: true,
        items: []
      },
      {
        title: 'Заказы',
        url: '/dashboard/orders',
        icon: 'orders',
        shortcut: ['o', 'o'],
        isActive: false,
        items: []
      },
      {
        title: 'Товары',
        url: '/dashboard/product',
        icon: 'product',
        shortcut: ['p', 'p'],
        isActive: false,
        items: []
      },
      {
        title: 'Клиенты',
        url: '/dashboard/users',
        icon: 'teams',
        shortcut: ['c', 'c'],
        isActive: false,
        items: []
      },
      {
        title: 'Задачи',
        url: '/dashboard/kanban',
        icon: 'kanban',
        shortcut: ['k', 'k'],
        isActive: false,
        items: []
      }
    ]
  },
  {
    label: 'Рабочее пространство',
    items: [
      {
        title: 'Уведомления',
        url: '/dashboard/notifications',
        icon: 'notification',
        shortcut: ['n', 'n'],
        isActive: false,
        items: []
      },
    ]
  }
];
