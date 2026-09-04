import { createFileRoute } from '@tanstack/react-router';
import ProductViewPage from '@/features/products/components/product-view-page';
import { productByIdOptions } from '@/features/products/api/queries';

export const Route = createFileRoute('/dashboard/product/$productId')({
  head: () => ({ meta: [{ title: 'MarketHub: Товар' }] }),
  loader: async ({ context: { queryClient }, params }) => {
    if (params.productId !== 'new') {
      await queryClient.ensureQueryData(productByIdOptions(Number(params.productId)));
    }
  },
  component: ProductDetailPage
});

function ProductDetailPage() {
  const { productId } = Route.useParams();
  return <ProductViewPage productId={productId} />;
}
