import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { useAppForm } from '@/lib/form';
import { useTransition } from 'react';
import { toast } from 'sonner';
import * as z from 'zod';
import GithubSignInButton from './github-auth-button';

const formSchema = z.object({
  email: z.string().email({ message: 'Введите корректный email' })
});

export default function UserAuthForm() {
  const [loading, startTransition] = useTransition();

  const form = useAppForm({
    defaultValues: {
      email: ''
    },
    validators: {
      onSubmit: formSchema
    },
    onSubmit: () => {
      startTransition(() => {
        toast.success('Вы успешно вошли в аккаунт');
      });
    }
  });

  return (
    <>
      <form
        className='w-full space-y-2'
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.AppField
            name='email'
            children={(field) => (
              <field.TextField
                label='Электронная почта'
                type='email'
                placeholder='Введите email...'
                disabled={loading}
              />
            )}
          />
        </FieldGroup>
        <Button disabled={loading} className='mt-2 ml-auto w-full' type='submit'>
          Продолжить с email
        </Button>
      </form>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background text-muted-foreground px-2'>Или продолжить через</span>
        </div>
      </div>
      <GithubSignInButton />
    </>
  );
}
