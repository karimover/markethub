import { createFileRoute } from '@tanstack/react-router';
import { seo } from '@/lib/seo';

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: seo({
      title: 'О MarketHub',
      description: 'О панели управления маркетплейсом MarketHub.',
      path: '/about'
    })
  }),
  component: AboutPage
});

function AboutPage() {
  return (
    <div className='min-h-screen px-4 py-12 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-3xl space-y-8'>
        <div><h1 className='text-3xl font-bold tracking-tight'>MarketHub</h1><p className='text-muted-foreground mt-2'>Рабочее пространство для управления магазином.</p></div>
        <section className='bg-card rounded-xl border p-8 shadow-sm'>
          <h2 className='mb-3 text-xl font-semibold'>Что решает MarketHub</h2>
          <p className='text-muted-foreground leading-relaxed'>MarketHub объединяет управление каталогом, заказами, клиентами и аналитикой магазина в одном рабочем пространстве продавца.</p>
        </section>
        <section className='bg-card rounded-xl border p-8 shadow-sm'>
          <h2 className='mb-3 text-xl font-semibold'>Frontend-архитектура</h2>
          <p className='text-muted-foreground leading-relaxed'>Приложение построено по принципу frontend-first. Локальный mock-сервис имитирует границу API, а React Query, TanStack Router и типизированные feature-модули разделяют загрузку данных и состояние интерфейса.</p>
        </section>
        <section className='bg-card rounded-xl border p-8 shadow-sm'>
          <h2 className='mb-3 text-xl font-semibold'>Дизайн и интерфейс</h2>
          <p className='text-muted-foreground leading-relaxed'>Интерфейс использует визуальный язык commerce-admin, вдохновлённый Shopify Polaris: нейтральные поверхности, компактная плотность информации, понятные статусы и зелёный основной акцент.</p>
        </section>
      </div>
    </div>
  );
}
