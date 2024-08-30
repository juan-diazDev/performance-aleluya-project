import { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [{ title: 'Mi perfil' }];
};

export default function Profile() {
  return 'Profile view';
}
