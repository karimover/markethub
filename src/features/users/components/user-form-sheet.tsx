import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { useAppForm } from '@/lib/form';
import { Spinner } from '@/components/ui/spinner';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import { Icons } from '@/components/icons';
import { useMutation } from '@tanstack/react-query';
import { createUserMutation, updateUserMutation } from '../api/mutations';
import type { User } from '../api/types';
import { toast } from 'sonner';
import { userSchema, type UserFormValues } from '../schemas/user';
import { ROLE_OPTIONS } from './users-table/options';

const STATUS_OPTIONS = [
  { value: 'Active', label: 'Активен' },
  { value: 'Inactive', label: 'Неактивен' },
  { value: 'Invited', label: 'Приглашён' }
];

interface UserFormSheetProps {
  user?: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UserFormSheet({ user, open, onOpenChange }: UserFormSheetProps) {
  const isEdit = !!user;

  const createMutation = useMutation({
    ...createUserMutation,
    onSuccess: () => {
      toast.success('Клиент создан');
      onOpenChange(false);
      form.reset();
    },
    onError: () => toast.error('Не удалось создать клиента')
  });

  const updateMutation = useMutation({
    ...updateUserMutation,
    onSuccess: () => {
      toast.success('Клиент обновлён');
      onOpenChange(false);
    },
    onError: () => toast.error('Не удалось обновить клиента')
  });

  const form = useAppForm({
    defaultValues: {
      first_name: user?.first_name ?? '',
      last_name: user?.last_name ?? '',
      email: user?.email ?? '',
      phone: user?.phone ?? '',
      role: user?.role ?? '',
      status: user?.status ?? 'Active'
    } as UserFormValues,
    validators: {
      onSubmit: userSchema
    },
    onSubmit: async ({ value }) => {
      if (isEdit) {
        await updateMutation.mutateAsync({ id: user.id, values: value });
      } else {
        await createMutation.mutateAsync(value);
      }
    }
  });

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='flex flex-col'>
        <SheetHeader>
          <SheetTitle>{isEdit ? 'Редактирование клиента' : 'Новый клиент'}</SheetTitle>
          <SheetDescription>
            {isEdit
              ? 'Измените данные клиента ниже.'
              : 'Заполните данные, чтобы добавить нового клиента.'}
          </SheetDescription>
        </SheetHeader>

        <div className='flex-1 overflow-auto'>
          <form
            id='user-form-sheet'
            className='space-y-4 p-4 md:p-4'
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <div className='grid grid-cols-2 gap-4'>
                <form.AppField
                  name='first_name'
                  children={(field) => (
                    <field.TextField label='Имя' required placeholder='Иван' />
                  )}
                />
                <form.AppField
                  name='last_name'
                  children={(field) => (
                    <field.TextField label='Фамилия' required placeholder='Иванов' />
                  )}
                />
              </div>

              <form.AppField
                name='email'
                children={(field) => (
                  <field.TextField
                    label='Электронная почта'
                    required
                    type='email'
                    placeholder='ivan@example.com'
                  />
                )}
              />

              <form.AppField
                name='phone'
                children={(field) => (
                  <field.TextField label='Телефон' required type='tel' placeholder='(555) 123-4567' />
                )}
              />

              <form.AppField
                name='role'
                children={(field) => (
                  <field.SelectField
                    label='Сегмент'
                    required
                    options={ROLE_OPTIONS}
                    placeholder='Выберите сегмент'
                  />
                )}
              />

              <form.AppField
                name='status'
                children={(field) => (
                  <field.SelectField
                    label='Статус'
                    required
                    options={STATUS_OPTIONS}
                    placeholder='Выберите статус'
                  />
                )}
              />
            </FieldGroup>
          </form>
        </div>

        <SheetFooter>
          <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button type='submit' form='user-form-sheet' disabled={isPending}>
            {isPending ? (
              <Spinner data-icon='inline-start' />
            ) : (
              <Icons.check data-icon='inline-start' />
            )}
            {isEdit ? 'Обновить клиента' : 'Создать клиента'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export function UserFormSheetTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Icons.add className='mr-2 h-4 w-4' /> Добавить клиента
      </Button>
      <UserFormSheet open={open} onOpenChange={setOpen} />
    </>
  );
}
