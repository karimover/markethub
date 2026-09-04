import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import type { Product } from '../../api/types';
import { Column, ColumnDef } from '@tanstack/react-table';
import { Icons } from '@/components/icons';
import { CellAction } from './cell-action';
import { CATEGORY_OPTIONS } from './options';

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'photo_url',
    header: 'ТОВАР',
    cell: ({ row }) => (
      <div className='flex min-w-[260px] items-center gap-3'>
        <img
          src={row.original.photo_url}
          alt=''
          className='size-11 rounded-md border object-cover'
        />
        <div className='min-w-0'>
          <div className='truncate font-medium'>{row.original.name}</div>
          <div className='text-muted-foreground truncate text-xs'>{row.original.sku}</div>
        </div>
      </div>
    )
  },
  {
    id: 'category',
    accessorKey: 'category',
    enableSorting: false,
    header: ({ column }: { column: Column<Product, unknown> }) => (
      <DataTableColumnHeader column={column} title='Категория' />
    ),
    cell: ({ cell }) => <Badge variant='outline'>{({ Electronics: 'Электроника', Home: 'Для дома', Accessories: 'Аксессуары', Apparel: 'Одежда', Footwear: 'Обувь' } as Record<string, string>)[cell.getValue<Product['category']>()] ?? cell.getValue<Product['category']>()}</Badge>,
    enableColumnFilter: true,
    meta: { label: 'Категории', variant: 'multiSelect', options: CATEGORY_OPTIONS }
  },
  {
    accessorKey: 'price',
    header: 'ЦЕНА',
    cell: ({ row }) => <span className='tabular-nums'>{new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(row.original.price * 100)}</span>
  },
  {
    accessorKey: 'stock',
    header: 'ОСТАТОК',
    cell: ({ row }) => (
      <span className={row.original.stock < 15 ? 'font-medium text-amber-700 dark:text-amber-300' : 'tabular-nums'}>
        {row.original.stock}
      </span>
    )
  },
  {
    accessorKey: 'status',
    header: 'СТАТУС',
    cell: ({ row }) => {
      const variant = row.original.status === 'Active' ? 'default' : row.original.status === 'Low stock' ? 'outline' : 'secondary';
      return (
        <Badge variant={variant} className='gap-1'>
          {row.original.status === 'Active' ? <Icons.circleCheck /> : row.original.status === 'Low stock' ? <Icons.warning /> : <Icons.clock />}
          {({ Active: 'В продаже', 'Low stock': 'Мало', Draft: 'Черновик' } as Record<string, string>)[row.original.status]}
        </Badge>
      );
    }
  },
  { id: 'actions', cell: ({ row }) => <CellAction data={row.original} /> }
];
