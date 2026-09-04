export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export type Product = {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  price: number;
  category: string;
  photo_url: string;
  stock: number;
  status: 'Active' | 'Low stock' | 'Draft';
  sku: string;
};

const seedProducts: Product[] = [
  {
    id: 1,
    name: 'Наушники Nimbus Wireless',
    description: 'Полноразмерные наушники с шумоподавлением и автономностью до 40 часов.',
    created_at: '2026-06-04T10:00:00.000Z',
    updated_at: '2026-08-28T10:00:00.000Z',
    price: 149,
    category: 'Electronics',
    photo_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=160&q=80',
    stock: 84,
    status: 'Active',
    sku: 'NIM-HEAD-001'
  },
  {
    id: 2,
    name: 'Набор керамической посуды Haven',
    description: 'Минималистичный набор посуды из керамики для ежедневного использования.',
    created_at: '2026-05-18T10:00:00.000Z',
    updated_at: '2026-08-24T10:00:00.000Z',
    price: 68,
    category: 'Home',
    photo_url: 'https://images.unsplash.com/photo-1493106819501-66d381c466f1?auto=format&fit=crop&w=160&q=80',
    stock: 19,
    status: 'Low stock',
    sku: 'HAV-CERA-002'
  },
  {
    id: 3,
    name: 'Городской рюкзак Aster',
    description: 'Водостойкий городской рюкзак с отделением для ноутбука.',
    created_at: '2026-04-26T10:00:00.000Z',
    updated_at: '2026-08-23T10:00:00.000Z',
    price: 92,
    category: 'Accessories',
    photo_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=160&q=80',
    stock: 43,
    status: 'Active',
    sku: 'AST-BAG-003'
  },
  {
    id: 4,
    name: 'Беговая куртка Vale',
    description: 'Лёгкая складная куртка со светоотражающими элементами.',
    created_at: '2026-04-11T10:00:00.000Z',
    updated_at: '2026-08-20T10:00:00.000Z',
    price: 118,
    category: 'Apparel',
    photo_url: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=160&q=80',
    stock: 11,
    status: 'Low stock',
    sku: 'VAL-JCKT-004'
  },
  {
    id: 5,
    name: 'Настольная лампа Orbit',
    description: 'Регулируемая LED-лампа с настройкой температуры света.',
    created_at: '2026-03-16T10:00:00.000Z',
    updated_at: '2026-08-18T10:00:00.000Z',
    price: 74,
    category: 'Home',
    photo_url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=160&q=80',
    stock: 26,
    status: 'Active',
    sku: 'ORB-LAMP-005'
  },
  {
    id: 6,
    name: 'Кроссовки Terra',
    description: 'Повседневные кроссовки с амортизирующей подошвой.',
    created_at: '2026-02-21T10:00:00.000Z',
    updated_at: '2026-08-15T10:00:00.000Z',
    price: 96,
    category: 'Footwear',
    photo_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=160&q=80',
    stock: 57,
    status: 'Active',
    sku: 'TER-SNEA-006'
  },
  {
    id: 7,
    name: 'Портативная колонка Lumen',
    description: 'Компактная Bluetooth-колонка с автономностью до 16 часов.',
    created_at: '2026-02-05T10:00:00.000Z',
    updated_at: '2026-08-12T10:00:00.000Z',
    price: 79,
    category: 'Electronics',
    photo_url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=160&q=80',
    stock: 7,
    status: 'Low stock',
    sku: 'LUM-SPKR-007'
  },
  {
    id: 8,
    name: 'Термобутылка North Field',
    description: 'Стальная бутылка с двойными стенками и герметичной крышкой.',
    created_at: '2026-01-17T10:00:00.000Z',
    updated_at: '2026-08-07T10:00:00.000Z',
    price: 34,
    category: 'Accessories',
    photo_url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=160&q=80',
    stock: 102,
    status: 'Active',
    sku: 'NOR-BOTT-008'
  },
  {
    id: 9,
    name: 'Трикотажный пуловер Sora',
    description: 'Мягкий хлопковый трикотаж свободного повседневного кроя.',
    created_at: '2025-12-22T10:00:00.000Z',
    updated_at: '2026-08-04T10:00:00.000Z',
    price: 88,
    category: 'Apparel',
    photo_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=160&q=80',
    stock: 31,
    status: 'Active',
    sku: 'SOR-KNIT-009'
  },
  {
    id: 10,
    name: 'Тревел-органайзер Cove',
    description: 'Органайзер на молнии для паспорта, карт и документов.',
    created_at: '2025-12-08T10:00:00.000Z',
    updated_at: '2026-08-02T10:00:00.000Z',
    price: 42,
    category: 'Accessories',
    photo_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=160&q=80',
    stock: 5,
    status: 'Low stock',
    sku: 'COV-TRVL-010'
  }
];

export const fakeProducts = {
  records: [...seedProducts],

  async getAll({ categories = [], search }: { categories?: string[]; search?: string }) {
    let products = [...this.records];
    if (categories.length) products = products.filter((product) => categories.includes(product.category));
    if (search) {
      const needle = search.toLowerCase();
      products = products.filter((product) =>
        [product.name, product.description, product.category, product.sku]
          .join(' ')
          .toLowerCase()
          .includes(needle)
      );
    }
    return products;
  },

  async getProducts({
    page = 1,
    limit = 10,
    categories,
    search,
    sort
  }: {
    page?: number;
    limit?: number;
    categories?: string | string[];
    search?: string;
    sort?: string;
  }) {
    await delay(350);
    const categoriesArray = categories
      ? Array.isArray(categories)
        ? categories
        : String(categories).split(/[.,]/)
      : [];
    const allProducts = await this.getAll({ categories: categoriesArray, search });

    if (sort) {
      try {
        const [{ id, desc }] = JSON.parse(sort) as { id: string; desc: boolean }[];
        allProducts.sort((a, b) => {
          const av = String((a as Record<string, unknown>)[id] ?? '').toLowerCase();
          const bv = String((b as Record<string, unknown>)[id] ?? '').toLowerCase();
          return desc ? bv.localeCompare(av, undefined, { numeric: true }) : av.localeCompare(bv, undefined, { numeric: true });
        });
      } catch {
        // Ignore malformed sorting state from the URL.
      }
    }

    const offset = (page - 1) * limit;
    return {
      success: true,
      time: new Date().toISOString(),
      message: 'Тестовые данные каталога MarketHub',
      total_products: allProducts.length,
      offset,
      limit,
      products: allProducts.slice(offset, offset + limit)
    };
  },

  async getProductById(id: number) {
    await delay(250);
    const product = this.records.find((item) => item.id === id);
    if (!product) return { success: false, message: `Product ${id} not found` };
    return { success: true, time: new Date().toISOString(), message: 'Товар найден', product };
  },

  async createProduct(data: Omit<Product, 'id' | 'created_at' | 'updated_at' | 'photo_url' | 'stock' | 'status' | 'sku'>) {
    await delay(300);
    const id = Math.max(...this.records.map((item) => item.id), 0) + 1;
    const product: Product = {
      ...data,
      id,
      photo_url: `https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=160&q=80&sig=${id}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      stock: 0,
      status: 'Draft',
      sku: `NEW-${String(id).padStart(4, '0')}`
    };
    this.records.push(product);
    return { success: true, message: 'Товар создан', product };
  },

  async updateProduct(id: number, data: Omit<Product, 'id' | 'created_at' | 'updated_at' | 'photo_url' | 'stock' | 'status' | 'sku'>) {
    await delay(300);
    const index = this.records.findIndex((item) => item.id === id);
    if (index === -1) return { success: false, message: `Product ${id} not found` };
    this.records[index] = { ...this.records[index], ...data, updated_at: new Date().toISOString() };
    return { success: true, message: 'Товар обновлён', product: this.records[index] };
  },

  async deleteProduct(id: number) {
    await delay(250);
    const index = this.records.findIndex((item) => item.id === id);
    if (index === -1) return { success: false, message: `Product ${id} not found` };
    this.records.splice(index, 1);
    return { success: true, message: 'Товар удалён' };
  }
};
