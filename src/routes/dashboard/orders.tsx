import { createFileRoute } from '@tanstack/react-router';
import PageContainer from '@/components/layout/page-container';
import OrdersPage from '@/features/orders/components/orders-page';

export const Route = createFileRoute('/dashboard/orders')({
  head: () => ({ meta: [{ title: 'MarketHub: Заказы' }] }),
  component: OrdersRoute
});

function OrdersRoute() {
  return (
    <PageContainer
      pageTitle='Заказы'
      pageDescription='Контролируйте выполнение заказов, статусы оплаты и объём продаж в одном месте.'
    >
      <OrdersPage />
    </PageContainer>
  );
}
