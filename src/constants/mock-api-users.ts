export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  status: 'Active' | 'Inactive' | 'Invited';
  role: 'Retail' | 'Wholesale' | 'VIP';
  created_at: string;
  updated_at: string;
};

const seedUsers: User[] = [
  ['Olivia', 'Carter', 'olivia@example.com', '(212) 555-0191', 'VIP'],
  ['Ethan', 'Walker', 'ethan@example.com', '(646) 555-0147', 'Retail'],
  ['Mia', 'Parker', 'mia@example.com', '(718) 555-0112', 'Retail'],
  ['Noah', 'Bennett', 'noah@example.com', '(917) 555-0133', 'Wholesale'],
  ['Ava', 'Mitchell', 'ava@example.com', '(347) 555-0188', 'VIP'],
  ['Liam', 'Brooks', 'liam@example.com', '(212) 555-0152', 'Retail'],
  ['Sofia', 'Reed', 'sofia@example.com', '(646) 555-0171', 'Retail'],
  ['James', 'Cooper', 'james@example.com', '(917) 555-0162', 'Wholesale'],
  ['Grace', 'Morgan', 'grace@example.com', '(718) 555-0108', 'VIP'],
  ['Henry', 'Foster', 'henry@example.com', '(347) 555-0124', 'Retail'],
  ['Ella', 'James', 'ella@example.com', '(212) 555-0198', 'Retail'],
  ['Lucas', 'Hayes', 'lucas@example.com', '(646) 555-0121', 'Wholesale']
].map(([first_name, last_name, email, phone, role], index) => ({
  id: index + 1,
  first_name,
  last_name,
  email,
  phone,
  status: index === 9 ? 'Invited' : index === 6 ? 'Inactive' : 'Active',
  role,
  created_at: '2026-06-01T10:00:00.000Z',
  updated_at: '2026-08-31T10:00:00.000Z'
})) as User[];

export const fakeUsers = {
  records: [...seedUsers],

  async getAll({ roles = [], search }: { roles?: string[]; search?: string }) {
    let users = [...this.records];
    if (roles.length) users = users.filter((user) => roles.includes(user.role));
    if (search) {
      const needle = search.toLowerCase();
      users = users.filter((user) => `${user.first_name} ${user.last_name} ${user.email}`.toLowerCase().includes(needle));
    }
    return users;
  },

  async getUsers({ page = 1, limit = 10, roles, search }: { page?: number; limit?: number; roles?: string | string[]; search?: string; sort?: string }) {
    await delay(300);
    const rolesArray = roles ? (Array.isArray(roles) ? roles : String(roles).split(/[.,]/)) : [];
    const allUsers = await this.getAll({ roles: rolesArray, search });
    const offset = (page - 1) * limit;
    return { success: true, time: new Date().toISOString(), message: 'Mock customer data', total_users: allUsers.length, offset, limit, users: allUsers.slice(offset, offset + limit) };
  },

  async createUser(data: Omit<User, 'id' | 'created_at' | 'updated_at'>) {
    await delay(250);
    const user: User = { ...data, id: Math.max(...this.records.map((item) => item.id), 0) + 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
    this.records.push(user);
    return { success: true, message: 'Customer created', user };
  },

  async updateUser(id: number, data: Omit<User, 'id' | 'created_at' | 'updated_at'>) {
    await delay(250);
    const index = this.records.findIndex((user) => user.id === id);
    if (index === -1) return { success: false, message: `Customer ${id} not found` };
    this.records[index] = { ...this.records[index], ...data, updated_at: new Date().toISOString() };
    return { success: true, message: 'Customer updated', user: this.records[index] };
  },

  async deleteUser(id: number) {
    await delay(200);
    const index = this.records.findIndex((user) => user.id === id);
    if (index === -1) return { success: false, message: `Customer ${id} not found` };
    this.records.splice(index, 1);
    return { success: true, message: 'Customer deleted' };
  }
};
