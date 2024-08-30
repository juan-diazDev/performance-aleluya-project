import { useLocation, Form } from '@remix-run/react';

import { Button } from 'react-aria-components';

import { breadcrumbsLabel } from './helpers';

type BreadcrumbKey = keyof typeof breadcrumbsLabel;

function Appbar() {
  const { pathname } = useLocation();

  const breadcrumbName = pathname.split('/')[1] as BreadcrumbKey;

  const getBreadcrumb = (breadcrumb: BreadcrumbKey) => {
    return breadcrumbsLabel[breadcrumb];
  };

  return (
    <div className="flex items-center justify-between px-12 py-2 w-full shadow-lg min-h-20">
      <section className="text-xl">{getBreadcrumb(breadcrumbName)}</section>
      <section className="w-[30%]">
        <Form method="POST" action="/logout">
          <span>
            <Button
              type="submit"
              className="border-2 border-cyan-500 w-[90%] text-sm py-2 rounded-3xl text-white bg-cyan-500 hover:opacity-70"
            >
              Log Out
            </Button>
          </span>
        </Form>
      </section>
    </div>
  );
}

export default Appbar;
