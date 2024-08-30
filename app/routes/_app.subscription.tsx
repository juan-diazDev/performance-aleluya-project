import { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [{ title: 'Mi suscripción' }];
};

export default function Subscription() {
  return 'Subscription view';
}
