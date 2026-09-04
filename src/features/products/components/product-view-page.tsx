import PageContainer from '@/components/layout/page-container';
import ProductForm from './product-form';
import { useQuery } from '@tanstack/react-query';
import { productByIdOptions } from '../api/queries';

export default function ProductViewPage({ productId }: { productId: string }) {
  const isNew = productId === 'new';
  const query = useQuery({ ...productByIdOptions(Number(productId)), enabled: !isNew });

  if (isNew) {
    return (
      <PageContainer
        pageTitle='Добавить товар'
        pageDescription='Добавьте новый товар в каталог магазина.'
      >
        <ProductForm initialData={null} pageTitle='Данные товара' />
      </PageContainer>
    );
  }

  if (query.isLoading || !query.data?.product) {
    return <PageContainer isLoading />;
  }

  return (
    <PageContainer
      pageTitle='Редактирование товара'
      pageDescription='Измените информацию о товаре, цене и описании.'
    >
      <ProductForm initialData={query.data.product} pageTitle={query.data.product.name} />
    </PageContainer>
  );
}
