import { Link } from '@remix-run/react';
import { adminOptions } from './helpers';

function Sidebar() {
  const IMG_URL = '/images/casa_bhakti_logo.png'

  return (
    <main className="h-full w-max px-6 pt-12 shadow-xl" >
      <div className="flex flex-col gap-16">
        <figure className="max-w-64">
          <img alt="casa_bhakti_logo" src={IMG_URL} />
        </figure>
        <div className="flex flex-col gap-8 text-2xl pl-2">
          {adminOptions.map((option) => (
            <Link key={option.id} to={option.route}>
              {option.label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Sidebar;
