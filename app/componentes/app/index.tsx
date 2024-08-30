import { Outlet } from '@remix-run/react';

import Appbar from './appbar';
import Sidebar from './sidebar';

export default function AppLayout() {
  return (
    <main className="flex w-screen h-screen">
      <Sidebar />
      <div className="w-full relative">
        <Appbar />
        <div className="flex px-16 pt-12">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
