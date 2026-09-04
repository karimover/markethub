import { create } from 'zustand';
import { v4 as uuid } from 'uuid';
// import { persist } from 'zustand/middleware';

export type Priority = 'low' | 'medium' | 'high';

export type Task = {
  id: string;
  title: string;
  priority: Priority;
  description?: string;
  assignee?: string;
  dueDate?: string;
};

type KanbanState = {
  columns: Record<string, Task[]>;
  setColumns: (columns: Record<string, Task[]>) => void;
  addTask: (title: string, description?: string) => void;
};

const initialColumns: Record<string, Task[]> = {
  backlog: [
    {
      id: '1',
      title: 'Настроить обработку оплаты заказа',
      priority: 'high',
      assignee: 'Анна Смирнова',
      dueDate: '2026-04-08'
    },
    {
      id: '2',
      title: 'Добавить экспорт заказов в CSV',
      priority: 'medium',
      assignee: 'Максим Орлов',
      dueDate: '2026-04-12'
    },
    {
      id: '3',
      title: 'Обновить подсказки для новых продавцов',
      priority: 'low',
      assignee: 'Полина Соколова',
      dueDate: '2026-04-15'
    },
    {
      id: '9',
      title: 'Проверить права доступа сотрудников',
      priority: 'medium',
      assignee: 'Илья Ким',
      dueDate: '2026-04-10'
    }
  ],
  inProgress: [
    {
      id: '4',
      title: 'Переработать сервис уведомлений',
      priority: 'high',
      assignee: 'Алексей Туров',
      dueDate: '2026-04-03'
    },
    {
      id: '5',
      title: 'Добавить приглашение сотрудников',
      priority: 'medium',
      assignee: 'Елена Накамура',
      dueDate: '2026-04-06'
    },
    {
      id: '10',
      title: 'Исправить часовой пояс в планировщике',
      priority: 'high',
      assignee: 'Анна Смирнова',
      dueDate: '2026-04-04'
    }
  ],
  done: [
    {
      id: '6',
      title: 'Интеграция единого входа для команды',
      priority: 'high',
      assignee: 'Илья Ким',
      dueDate: '2026-03-22'
    },
    {
      id: '7',
      title: 'Обновить графики аналитики',
      priority: 'medium',
      assignee: 'Максим Орлов',
      dueDate: '2026-03-20'
    },
    {
      id: '8',
      title: 'Добавить повторную обработку вебхуков',
      priority: 'low',
      assignee: 'Алексей Туров',
      dueDate: '2026-03-18'
    }
  ]
};

export const useTaskStore = create<KanbanState>()(
  // To enable persistence across refreshes, uncomment the persist wrapper below:
  // persist(
  (set) => ({
    columns: initialColumns,

    setColumns: (columns) => set({ columns }),

    addTask: (title, description) =>
      set((state) => ({
        columns: {
          ...state.columns,
          backlog: [
            {
              id: uuid(),
              title,
              description,
              priority: 'medium' as Priority,
              assignee: undefined,
              dueDate: undefined
            },
            ...(state.columns.backlog ?? [])
          ]
        }
      }))
  })
  //   ,
  //   { name: 'kanban-store' }
  // )
);
