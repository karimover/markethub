import { useMemo, useState } from 'react';
import { Icons } from '@/components/icons';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Bar, BarChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import PageContainer from '@/components/layout/page-container';
import { orders } from '@/features/orders/types';

const periods = {
  week: { label: '7 дней', multiplier: 0.92, data: [{ label: 'Пн', revenue: 38200 }, { label: 'Вт', revenue: 41800 }, { label: 'Ср', revenue: 39600 }, { label: 'Чт', revenue: 44700 }, { label: 'Пт', revenue: 51200 }, { label: 'Сб', revenue: 47800 }, { label: 'Вс', revenue: 55300 }] },
  month: { label: '30 дней', multiplier: 1, data: [{ label: 'Нед 1', revenue: 88400 }, { label: 'Нед 2', revenue: 94200 }, { label: 'Нед 3', revenue: 103600 }, { label: 'Нед 4', revenue: 112750 }] },
  quarter: { label: '3 месяца', multiplier: 1.14, data: [{ label: 'Июн', revenue: 247000 }, { label: 'Июл', revenue: 284000 }, { label: 'Авг', revenue: 317500 }] }
} as const;

const categoryData = [
  { name: 'Электроника', value: 38 }, { name: 'Для дома', value: 24 }, { name: 'Аксессуары', value: 19 }, { name: 'Одежда', value: 13 }, { name: 'Обувь', value: 6 }
];

const kpis = [
  { label: 'Оборот', value: '₽317 500', change: '+12,8%', icon: Icons.billing },
  { label: 'Заказы', value: '426', change: '+8,4%', icon: Icons.orders },
  { label: 'Клиенты', value: '1 284', change: '+14,2%', icon: Icons.teams },
  { label: 'Товары', value: '128', change: '+5,1%', icon: Icons.product }
];

const money = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 });

export default function OverViewPage() {
  const [period, setPeriod] = useState<keyof typeof periods>('month');
  const activePeriod = periods[period];
  const chartData = useMemo(() => activePeriod.data.map((item) => ({ ...item, revenue: Math.round(item.revenue * activePeriod.multiplier) })), [activePeriod]);

  return (
    <PageContainer>
      <div className='space-y-5'>
        <div className='flex flex-col justify-between gap-3 sm:flex-row sm:items-end'>
          <div>
            <p className='text-muted-foreground text-sm'>4 сентября 2026</p>
            <h1 className='mt-1 text-2xl font-semibold tracking-tight'>Добрый день, Эмир 👋</h1>
            <p className='text-muted-foreground mt-1 text-sm'>Вот что происходит с вашим магазином сейчас.</p>
          </div>
          <Badge variant='outline' className='w-fit gap-1 border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-950 dark:text-green-200'>
            <Icons.trendingUp className='size-3.5' /> 12,8% к прошлому месяцу
          </Badge>
        </div>

        <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
          {kpis.map(({ label, value, change, icon: Icon }) => (
            <Card key={label} className='shadow-xs'>
              <CardContent className='flex items-start justify-between p-5'>
                <div><p className='text-muted-foreground text-sm'>{label}</p><p className='mt-2 text-2xl font-semibold tracking-tight'>{value}</p><p className='mt-2 text-xs text-emerald-700 dark:text-emerald-300'>{change} к прошлому месяцу</p></div>
                <div className='bg-accent text-primary flex size-9 items-center justify-center rounded-lg'><Icon className='size-4' /></div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className='grid gap-4 xl:grid-cols-[1.6fr_1fr]'>
          <Card>
            <CardHeader className='flex-row items-start justify-between gap-4'>
              <div><CardTitle className='text-base'>Динамика продаж</CardTitle><p className='text-muted-foreground mt-1 text-sm'>Изменение оборота по выбранному периоду</p></div>
              <div className='flex gap-1'>{(Object.keys(periods) as Array<keyof typeof periods>).map((key) => <Button key={key} size='sm' variant={period === key ? 'secondary' : 'ghost'} onClick={() => setPeriod(key)}>{periods[key].label}</Button>)}</div>
            </CardHeader>
            <CardContent className='h-[320px] pt-0'>
              <ResponsiveContainer width='100%' height='100%'>
                <AreaChart data={chartData} margin={{ top: 20, right: 12, left: -14, bottom: 0 }}>
                  <defs><linearGradient id='marketFill' x1='0' y1='0' x2='0' y2='1'><stop offset='0%' stopColor='var(--primary)' stopOpacity={0.24} /><stop offset='100%' stopColor='var(--primary)' stopOpacity={0} /></linearGradient></defs>
                  <CartesianGrid vertical={false} stroke='var(--border)' strokeDasharray='3 3' />
                  <XAxis dataKey='label' tickLine={false} axisLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} tickFormatter={(v) => `₽${Math.round(v / 1000)}k`} />
                  <Tooltip formatter={(value) => [money.format(Number(value)), 'Оборот']} contentStyle={{ borderRadius: 8, border: '1px solid var(--border)', background: 'var(--card)' }} />
                  <Area type='monotone' dataKey='revenue' stroke='var(--primary)' fill='url(#marketFill)' strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className='text-base'>Продажи по категориям</CardTitle><p className='text-muted-foreground mt-1 text-sm'>Доля продаж за текущий месяц</p></CardHeader>
            <CardContent className='h-[320px]'>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart data={categoryData} layout='vertical' margin={{ top: 0, right: 18, left: 16, bottom: 0 }}>
                  <XAxis type='number' hide domain={[0, 40]} /><YAxis type='category' dataKey='name' tickLine={false} axisLine={false} width={90} tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} />
                  <Tooltip cursor={false} formatter={(value) => [`${value}%`, 'Доля']} contentStyle={{ borderRadius: 8, border: '1px solid var(--border)', background: 'var(--card)' }} />
                  <Bar dataKey='value' fill='var(--primary)' radius={[0, 5, 5, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader><CardTitle className='text-base'>Последние заказы</CardTitle><p className='text-muted-foreground mt-1 text-sm'>Последняя активность магазина</p></CardHeader>
          <CardContent className='grid gap-1 p-0'>
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className='flex items-center justify-between gap-3 border-t px-5 py-4 first:border-t-0'>
                <div className='min-w-0'><p className='font-medium'>{order.customer}</p><p className='text-muted-foreground text-xs'>{order.id} · {order.channel === 'Marketplace' ? 'Маркетплейс' : 'Интернет-магазин'}</p></div>
                <div className='text-right'><p className='font-medium tabular-nums'>{money.format(order.total)}</p><p className='text-muted-foreground text-xs'>{({ Paid: 'Оплачен', Processing: 'В обработке', Shipped: 'Отправлен', Delivered: 'Доставлен', Refunded: 'Возвращён' } as Record<string, string>)[order.status]}</p></div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
