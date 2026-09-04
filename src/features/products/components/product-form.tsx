import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FieldGroup } from '@/components/ui/field';
import { useAppForm } from '@/lib/form';
import { categoryOptions } from '@/features/products/constants/product-options';
import { productSchema, type ProductFormValues } from '@/features/products/schemas/product';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import { toast } from 'sonner';
import { createProductMutation, updateProductMutation } from '../api/mutations';
import type { Product } from '../api/types';

export default function ProductForm({ initialData, pageTitle }: { initialData: Product | null; pageTitle: string }) {
  const router = useRouter();
  const isEdit = !!initialData;

  const createMutation = useMutation({
    ...createProductMutation,
    onSuccess: () => {
      toast.success('Товар создан');
      router.navigate({ to: '/dashboard/product' });
    },
    onError: () => toast.error('Не удалось создать товар')
  });

  const updateMutation = useMutation({
    ...updateProductMutation,
    onSuccess: () => {
      toast.success('Товар обновлён');
      router.navigate({ to: '/dashboard/product' });
    },
    onError: () => toast.error('Не удалось обновить товар')
  });

  const form = useAppForm({
    defaultValues: {
      image: undefined,
      name: initialData?.name ?? '',
      category: initialData?.category ?? '',
      price: initialData?.price,
      description: initialData?.description ?? ''
    } as ProductFormValues,
    validators: { onSubmit: productSchema },
    onSubmit: ({ value }) => {
      const payload = {
        name: value.name,
        category: value.category,
        price: value.price!,
        description: value.description
      };
      isEdit ? updateMutation.mutate({ id: initialData!.id, values: payload }) : createMutation.mutate(payload);
    }
  });

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle className='text-xl'>{pageTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <form className='space-y-8' onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }}>
          <FieldGroup>
            <form.AppField name='image' children={(field) => (
              <field.FileUploadField label='Изображение товара' description='До 4 изображений. Загрузка имитируется для демо-проекта.' maxSize={5 * 1024 * 1024} maxFiles={4} />
            )} />
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <form.AppField name='name' children={(field) => <field.TextField label='Название товара' required placeholder='например, беспроводные наушники' />} />
              <form.AppField name='category' children={(field) => <field.SelectField label='Категория' required options={categoryOptions} placeholder='Выберите категорию' />} />
              <form.AppField name='price' children={(field) => <field.TextField label='Цена' required type='number' min={0} step={0.01} placeholder='0.00' />} />
            </div>
            <form.AppField name='description' children={(field) => <field.TextareaField label='Описание' required placeholder='Опишите товар и его основные характеристики.' maxLength={500} rows={4} />} />
          </FieldGroup>
          <div className='flex justify-end gap-2'>
            <Button type='button' variant='outline' onClick={() => router.history.back()}>Отмена</Button>
            <Button type='submit' disabled={isPending}>{isEdit ? 'Сохранить изменения' : 'Создать товар'}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
