import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import type { User } from '../../api/types';
import { Column, ColumnDef } from '@tanstack/react-table';
import { Icons } from '@/components/icons';
import { CellAction } from './cell-action';
import { ROLE_OPTIONS } from './options';

export const columns: ColumnDef<User>[] = [
  {
    id: 'name',
    accessorFn: (row) => `${row.first_name} ${row.last_name}`,
    header: ({ column }: { column: Column<User, unknown> }) => <DataTableColumnHeader column={column} title='Клиент' />,
    cell: ({ row }) => (
      <div className='flex min-w-[230px] flex-col'>
        <span className='font-medium'>{row.original.first_name} {row.original.last_name}</span>
        <span className='text-muted-foreground text-xs'>{row.original.email}</span>
      </div>
    ),
    meta: { label: 'Клиент', placeholder: 'Поиск клиентов...', variant: 'text' as const, icon: Icons.text },
    enableColumnFilter: true
  },
  { accessorKey: 'phone', header: 'Телефон' },
  {
    id: 'role', accessorKey: 'role', enableSorting: false,
    header: ({ column }: { column: Column<User, unknown> }) => <DataTableColumnHeader column={column} title='Сегмент' />,
    cell: ({ cell }) => <Badge variant='outline'>{({ Retail: 'Розница', Wholesale: 'Опт', VIP: 'VIP' } as Record<string, string>)[cell.getValue<User['role']>()] ?? cell.getValue<User['role']>()}</Badge>,
    enableColumnFilter: true, meta: { label: 'Сегмент', variant: 'multiSelect' as const, options: ROLE_OPTIONS }
  },
  {
    accessorKey: 'status', header: 'СТАТУС',
    cell: ({ cell }) => {
      const status = cell.getValue<User['status']>();
      const variant = status === 'Active' ? 'default' : status === 'Inactive' ? 'secondary' : 'outline';
      return <Badge variant={variant} className='gap-1'>{status === 'Active' ? <Icons.circleCheck /> : <Icons.clock />}{({ Active: 'Активен', Inactive: 'Неактивен', Invited: 'Приглашён' } as Record<string, string>)[status] ?? status}</Badge>;
    }
  },
  { id: 'actions', cell: ({ row }) => <CellAction data={row.original} /> }
];
