import { useLocation } from '@tanstack/react-router';
import { useMemo } from 'react';

type BreadcrumbItem = { title: string; link: string };

const routeMapping: Record<string, BreadcrumbItem[]> = {
  '/dashboard': [{ title: 'Рабочее пространство', link: '/dashboard' }],
  '/dashboard/overview': [
    { title: 'Магазин', link: '/dashboard/overview' },
    { title: 'Обзор', link: '/dashboard/overview' }
  ],
  '/dashboard/orders': [
    { title: 'Магазин', link: '/dashboard/overview' },
    { title: 'Заказы', link: '/dashboard/orders' }
  ],
  '/dashboard/product': [
    { title: 'Магазин', link: '/dashboard/overview' },
    { title: 'Товары', link: '/dashboard/product' }
  ],
  '/dashboard/users': [
    { title: 'Магазин', link: '/dashboard/overview' },
    { title: 'Клиенты', link: '/dashboard/users' }
  ],
  '/dashboard/kanban': [
    { title: 'Рабочее пространство', link: '/dashboard/overview' },
    { title: 'Задачи', link: '/dashboard/kanban' }
  ],
  '/dashboard/notifications': [
    { title: 'Рабочее пространство', link: '/dashboard/overview' },
    { title: 'Уведомления', link: '/dashboard/notifications' }
  ]
};

const fallbackLabels: Record<string, string> = {
  dashboard: 'Рабочее пространство',
  product: 'Товары',
  users: 'Клиенты',
  orders: 'Заказы',
  kanban: 'Задачи',
  notifications: 'Уведомления'
};

export function useBreadcrumbs() {
  const { pathname } = useLocation();

  return useMemo(() => {
    if (routeMapping[pathname]) return routeMapping[pathname];

    const segments = pathname.split('/').filter(Boolean);
    return segments.map((segment, index) => ({
      title: fallbackLabels[segment] ?? segment.charAt(0).toUpperCase() + segment.slice(1),
      link: `/${segments.slice(0, index + 1).join('/')}`
    }));
  }, [pathname]);
}
