import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';

const salesData = [
  { name: 'Ольга Картер', email: 'olivia@example.com', avatar: 'https://api.slingacademy.com/public/sample-users/1.png', fallback: 'ОК', amount: '24 890 ₽' },
  { name: 'Итан Уокер', email: 'ethan@example.com', avatar: 'https://api.slingacademy.com/public/sample-users/2.png', fallback: 'ИУ', amount: '14 990 ₽' },
  { name: 'Мия Паркер', email: 'mia@example.com', avatar: 'https://api.slingacademy.com/public/sample-users/3.png', fallback: 'МП', amount: '32 450 ₽' },
  { name: 'Ава Митчелл', email: 'ava@example.com', avatar: 'https://api.slingacademy.com/public/sample-users/4.png', fallback: 'АМ', amount: '41 280 ₽' },
  { name: 'Лиам Брукс', email: 'liam@example.com', avatar: 'https://api.slingacademy.com/public/sample-users/5.png', fallback: 'ЛБ', amount: '17 640 ₽' }
];

export function RecentSales() {
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Последние продажи</CardTitle>
        <CardDescription>Самые свежие заказы магазина.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-8'>
          {salesData.map((sale) => (
            <div key={sale.email} className='flex items-center'>
              <Avatar className='h-9 w-9'>
                <AvatarImage src={sale.avatar} alt='' />
                <AvatarFallback>{sale.fallback}</AvatarFallback>
              </Avatar>
              <div className='ml-4 space-y-1'>
                <p className='text-sm leading-none font-medium'>{sale.name}</p>
                <p className='text-muted-foreground text-sm'>{sale.email}</p>
              </div>
              <div className='ml-auto font-medium tabular-nums'>{sale.amount}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
