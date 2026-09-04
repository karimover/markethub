import type { InfobarContent } from '@/components/ui/infobar';

export const usersInfoContent: InfobarContent = {
  title: 'Рабочее пространство клиентов',
  sections: [
    { title: 'Обзор', description: 'Ищите и сегментируйте клиентов с помощью фильтров таблицы и кеша React Query.', links: [] },
    { title: 'Сегменты', description: 'Клиентов можно распределять по сегментам: розница, опт и VIP.', links: [] },
    { title: 'Слой данных', description: 'Демо использует локальный mock-сервис, поэтому фронтенд запускается независимо от backend.', links: [] }
  ]
};
