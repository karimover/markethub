export type OrderStatus = 'Paid' | 'Processing' | 'Shipped' | 'Delivered' | 'Refunded';
export type OrderChannel = 'Online store' | 'Marketplace';

export type Order = {
  id: string;
  customer: string;
  email: string;
  items: number;
  total: number;
  status: OrderStatus;
  date: string;
  channel: OrderChannel;
  delivery: string;
};

export const orders: Order[] = [
  { id: '#MH-1048', customer: 'Ольга Картер', email: 'olivia@example.com', items: 2, total: 24890, status: 'Paid', date: '4 сен 2026', channel: 'Online store', delivery: 'Самовывоз' },
  { id: '#MH-1047', customer: 'Итан Уокер', email: 'ethan@example.com', items: 1, total: 14990, status: 'Processing', date: '4 сен 2026', channel: 'Marketplace', delivery: 'СДЭК' },
  { id: '#MH-1046', customer: 'Мия Паркер', email: 'mia@example.com', items: 3, total: 32450, status: 'Shipped', date: '3 сен 2026', channel: 'Online store', delivery: 'Boxberry' },
  { id: '#MH-1045', customer: 'Ной Беннетт', email: 'noah@example.com', items: 1, total: 9690, status: 'Delivered', date: '3 сен 2026', channel: 'Marketplace', delivery: 'Ozon' },
  { id: '#MH-1044', customer: 'Ава Митчелл', email: 'ava@example.com', items: 4, total: 41280, status: 'Paid', date: '2 сен 2026', channel: 'Online store', delivery: 'Самовывоз' },
  { id: '#MH-1043', customer: 'Лиам Брукс', email: 'liam@example.com', items: 2, total: 17640, status: 'Processing', date: '2 сен 2026', channel: 'Marketplace', delivery: 'Почта России' },
  { id: '#MH-1042', customer: 'София Рид', email: 'sofia@example.com', items: 1, total: 7400, status: 'Refunded', date: '1 сен 2026', channel: 'Online store', delivery: 'Самовывоз' },
  { id: '#MH-1041', customer: 'Джеймс Купер', email: 'james@example.com', items: 5, total: 52190, status: 'Delivered', date: '1 сен 2026', channel: 'Online store', delivery: 'СДЭК' },
  { id: '#MH-1040', customer: 'Грейс Морган', email: 'grace@example.com', items: 2, total: 13490, status: 'Shipped', date: '31 авг 2026', channel: 'Marketplace', delivery: 'Ozon' },
  { id: '#MH-1039', customer: 'Генри Фостер', email: 'henry@example.com', items: 1, total: 4290, status: 'Delivered', date: '31 авг 2026', channel: 'Online store', delivery: 'Самовывоз' }
];
