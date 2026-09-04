import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

export default function CtaGithub() {
  return (
    <Button variant='ghost' size='sm' className='group hidden sm:flex' asChild>
      <a
        aria-label='Открыть репозиторий проекта'
        href='https://github.com/karimover/markethub'
        rel='noopener noreferrer'
        target='_blank'
      >
        <Icons.github />
      </a>
    </Button>
  );
}
