import { zodResolver } from '@hookform/resolvers/zod';
import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  MetaFunction,
  redirect,
} from '@remix-run/node';
import { Form, Link } from '@remix-run/react';
import { getValidatedFormData } from 'remix-hook-form';

import {
  Button,
  FieldError,
  Input,
  Label,
  TextField,
} from 'react-aria-components';
import { z } from 'zod';
import { db } from "~/db/instance";

import { commitSession, getSession } from '~/session';

export const meta: MetaFunction = () => {
  return [{ title: 'Iniciar sesión' }];
};

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormData = z.infer<typeof LoginSchema>;
const resolver = zodResolver(LoginSchema);

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'));

  if (session.has('userId')) {
    return redirect('/dashboard');
  }

  const data = { error: session.get('error') };

  return json(data, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const {
    errors,
    data,
    receivedValues,
  } = await getValidatedFormData<FormData>(request, resolver);

  if (errors) {
    return json({ errors, receivedValues });
  }

  const session = await getSession(request.headers.get('Cookie'));

  const user = await db.query.User.findFirst({
    where: eq(User.email, data.email),
    with: {
      password: true,
    },
  });
}

export default function LogIn() {
  return (
    <main className="p-[2rem] flex items-center justify-center flex-col h-lvh bg-cyan-500">
      <div className="flex justify-between flex-col w-[45%] items-center shadow-xl pt-24 pb-16 rounded-3xl bg-white">
        <h1 className="text-3xl mb-12">Inicia Sesión</h1>
        <Form className="flex flex-col gap-y-8 w-[75%]" method="POST">
          <TextField
            className="flex flex-col gap-y-2"
            name="email"
            type="email"
            isRequired
          >
            <Label className="text-lg">Correo:</Label>
            <Input className="border-2 border-cyan-500 rounded-xl px-4 py-3 hover:border-blue-500 focus:border-black" />
            <FieldError className="text-red-600" />
          </TextField>

          <TextField
            className="flex flex-col gap-y-2"
            name="password"
            type="password"
            isRequired
          >
            <Label className="text-lg">Contraseña:</Label>
            <Input className="border-2 border-cyan-500 rounded-xl px-4 py-3 hover:border-blue-500 focus:border-black" />
            <span>
              <Link
                to="/signup"
                className="underline underline-offset-2 cursor-pointer hover:decoration-cyan-500 hover:text-cyan-500"
              >
                ¿Aun no tienes una cuenta?
              </Link>
            </span>
            <FieldError className="text-red-600" />
          </TextField>
          <div className="mt-24 flex justify-center">
            <Button
              onPress={() => console.log('You click me')}
              className="border-2 border-cyan-500 w-[90%] text-lg py-2 rounded-3xl text-white bg-cyan-500 hover:opacity-70"
            >
              <b>Iniciar sesión</b>
            </Button>
          </div>
        </Form>
      </div>
    </main>
  );
}
