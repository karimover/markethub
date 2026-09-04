import { useMemo, useState } from 'react';
import { Icons } from '@/components/icons';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { orders, type Order, type OrderChannel, type OrderStatus } from '../types';
import { cn } from '@/lib/utils';

const statusLabels: Record<OrderStatus, string> = {
  Paid: 'Оплачен',
  Processing: 'В обработке',
  Shipped: 'Отправлен',
  Delivered: 'Доставлен',
  Refunded: 'Возвращён'
};

const channelLabels: Record<OrderChannel, string> = {
  'Online store': 'Интернет-магазин',
  Marketplace: 'Маркетплейс'
};

const statusStyles: Record<OrderStatus, string> = {
  Paid: 'border-sky-200 bg-sky-50 text-sky-800 dark:border-sky-900 dark:bg-sky-950 dark:text-sky-200',
  Processing: 'border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200',
  Shipped: 'border-violet-200 bg-violet-50 text-violet-800 dark:border-violet-900 dark:bg-violet-950 dark:text-violet-200',
  Delivered: 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-200',
  Refunded: 'border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-200'
};

const money = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 });

export default function OrdersPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'All' | OrderStatus>('All');
  const [channel, setChannel] = useState<'All' | OrderChannel>('All');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filtered = useMemo(() => orders.filter((order) => {
    const haystack = [order.id, order.customer, order.email, order.delivery].join(' ').toLowerCase();
    return haystack.includes(query.toLowerCase()) &&
      (status === 'All' || order.status === status) &&
      (channel === 'All' || order.channel === channel);
  }), [query, status, channel]);

  const totals = useMemo(() => ({
    revenue: filtered.reduce((sum, order) => sum + order.total, 0),
    count: filtered.length,
    average: filtered.length ? filtered.reduce((sum, order) => sum + order.total, 0) / filtered.length : 0
  }), [filtered]);

  function exportCsv() {
    const header = ['Заказ', 'Клиент', 'E-mail', 'Канал', 'Товары', 'Сумма', 'Статус', 'Дата', 'Доставка'];
    const rows = filtered.map((order) => [order.id, order.customer, order.email, channelLabels[order.channel], order.items, order.total, statusLabels[order.status], order.date, order.delivery]);
    const csv = [header, ...rows].map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(';')).join('\n');
    const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'markethub-orders.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className='space-y-4'>
      <div className='grid gap-4 sm:grid-cols-3'>
        <Card><CardContent className='p-5'><p className='text-muted-foreground text-sm'>Заказов в выборке</p><p className='mt-2 text-2xl font-semibold'>{totals.count}</p></CardContent></Card>
        <Card><CardContent className='p-5'><p className='text-muted-foreground text-sm'>Оборот</p><p className='mt-2 text-2xl font-semibold tabular-nums'>{money.format(totals.revenue)}</p></CardContent></Card>
        <Card><CardContent className='p-5'><p className='text-muted-foreground text-sm'>Средний чек</p><p className='mt-2 text-2xl font-semibold tabular-nums'>{money.format(totals.average)}</p></CardContent></Card>
      </div>

      <Card>
        <CardHeader className='gap-4 border-b md:flex-row md:items-center md:justify-between'>
          <div><CardTitle className='text-base'>Все заказы</CardTitle><p className='text-muted-foreground mt-1 text-sm'>Поиск, фильтрация и просмотр деталей без перезагрузки страницы.</p></div>
          <div className='flex flex-wrap gap-2'>
            <div className='relative w-full sm:w-72'><Icons.search className='text-muted-foreground absolute top-2.5 left-3 size-4' /><Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Поиск по заказам...' className='pl-9' /></div>
            <Button variant='outline' size='sm' onClick={exportCsv}><Icons.download className='size-4' /> Экспорт CSV</Button>
          </div>
        </CardHeader>

        <div className='flex flex-col gap-3 border-b px-6 py-3 md:flex-row md:items-center md:justify-between'>
          <div className='flex flex-wrap gap-1'>
            {(['All', 'Paid', 'Processing', 'Shipped', 'Delivered', 'Refunded'] as const).map((item) => (
              <Button key={item} variant={status === item ? 'secondary' : 'ghost'} size='sm' onClick={() => setStatus(item)}>
                {item === 'All' ? 'Все статусы' : statusLabels[item]}
              </Button>
            ))}
          </div>
          <div className='flex gap-2'>
            {(['All', 'Online store', 'Marketplace'] as const).map((item) => (
              <Button key={item} variant={channel === item ? 'outline' : 'ghost'} size='sm' onClick={() => setChannel(item)}>
                {item === 'All' ? 'Все каналы' : channelLabels[item]}
              </Button>
            ))}
          </div>
        </div>

        <CardContent className='p-0'>
          <div className='overflow-x-auto'>
            <Table>
              <TableHeader><TableRow><TableHead>Заказ</TableHead><TableHead>Клиент</TableHead><TableHead>Канал</TableHead><TableHead>Товары</TableHead><TableHead>Сумма</TableHead><TableHead>Статус</TableHead><TableHead>Дата</TableHead><TableHead className='w-12'></TableHead></TableRow></TableHeader>
              <TableBody>
                {filtered.map((order) => (
                  <TableRow key={order.id} className='hover:bg-muted/40'>
                    <TableCell className='font-medium'>{order.id}</TableCell>
                    <TableCell><div>{order.customer}</div><div className='text-muted-foreground text-xs'>{order.email}</div></TableCell>
                    <TableCell>{channelLabels[order.channel]}</TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell className='font-medium tabular-nums'>{money.format(order.total)}</TableCell>
                    <TableCell><Badge variant='outline' className={cn('font-medium', statusStyles[order.status])}>{statusLabels[order.status]}</Badge></TableCell>
                    <TableCell className='text-muted-foreground'>{order.date}</TableCell>
                    <TableCell><Button variant='ghost' size='icon-sm' aria-label={`Открыть ${order.id}`} onClick={() => setSelectedOrder(order)}><Icons.eye className='size-4' /></Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {!filtered.length && <div className='text-muted-foreground p-10 text-center text-sm'>По заданным фильтрам заказы не найдены.</div>}
        </CardContent>
      </Card>

      <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
        <DialogContent className='sm:max-w-xl'>
          {selectedOrder && (
            <>
              <DialogHeader><DialogTitle>{selectedOrder.id}</DialogTitle><DialogDescription>{selectedOrder.customer} · {selectedOrder.date}</DialogDescription></DialogHeader>
              <div className='grid gap-3 rounded-lg border p-4 text-sm sm:grid-cols-2'>
                <div><span className='text-muted-foreground'>Статус</span><div className='mt-1'><Badge variant='outline' className={statusStyles[selectedOrder.status]}>{statusLabels[selectedOrder.status]}</Badge></div></div>
                <div><span className='text-muted-foreground'>Канал</span><p className='mt-1 font-medium'>{channelLabels[selectedOrder.channel]}</p></div>
                <div><span className='text-muted-foreground'>Товаров</span><p className='mt-1 font-medium'>{selectedOrder.items}</p></div>
                <div><span className='text-muted-foreground'>Сумма</span><p className='mt-1 font-medium'>{money.format(selectedOrder.total)}</p></div>
                <div className='sm:col-span-2'><span className='text-muted-foreground'>Доставка</span><p className='mt-1 font-medium'>{selectedOrder.delivery}</p></div>
                <div className='sm:col-span-2'><span className='text-muted-foreground'>Контакт</span><p className='mt-1 font-medium'>{selectedOrder.email}</p></div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
