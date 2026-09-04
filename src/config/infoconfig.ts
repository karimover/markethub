import type { InfobarContent } from '@/components/ui/infobar';

export const productInfoContent: InfobarContent = {
  title: 'Product Management',
  sections: [
    {
      title: 'Обзор',
      description:
        'На странице товаров можно управлять каталогом: сортировать, фильтровать, просматривать страницы и искать товары. Используйте кнопку «Добавить товар», чтобы создать новую позицию.',
      links: [
        {
          title: 'Product Management Guide',
          url: '#'
        }
      ]
    },
    {
      title: 'Adding Products',
      description:
        'Чтобы добавить товар, нажмите «Добавить товар» в заголовке страницы. В форме можно указать название, описание, цену, категорию и изображения.',
      links: [
        {
          title: 'Adding Products Documentation',
          url: '#'
        }
      ]
    },
    {
      title: 'Редактирование товаров',
      description:
        'You can edit existing products by clicking on a product row in the table. This will open the product edit form where you can modify any product information. Changes are saved automatically when you submit the form.',
      links: [
        {
          title: 'Инструкция по редактированию товаров',
          url: '#'
        }
      ]
    },
    {
      title: 'Deleting Products',
      description:
        'Товары можно удалить из таблицы каталога. Нажмите действие удаления у нужного товара и подтвердите операцию перед окончательным удалением из каталога.',
      links: [
        {
          title: 'Product Deletion Policy',
          url: '#'
        }
      ]
    },
    {
      title: 'Table Features',
      description:
        'The product table includes several powerful features to help you manage large product catalogs efficiently. You can sort columns by clicking on column headers, filter products using the filter controls, navigate through pages using pagination, and quickly find products using the search functionality.',
      links: [
        {
          title: 'Table Features Documentation',
          url: '#'
        },
        {
          title: 'Sorting and Filtering Guide',
          url: '#'
        }
      ]
    },
    {
      title: 'Product Fields',
      description:
        'Each product can have the following fields: Name (required), Description (optional text), Price (numeric value), Category (for organizing products), and Image Upload (for product photos). All fields can be edited when creating or updating a product.',
      links: [
        {
          title: 'Product Fields Specification',
          url: '#'
        }
      ]
    }
  ]
};
