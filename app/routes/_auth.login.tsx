import { zodResolver } from '@hookform/resolvers/zod';
import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  MetaFunction,
  redirect,
} from '@remix-run/node';
import { Form, Link, useActionData } from '@remix-run/react';
import { getValidatedFormData, useRemixForm } from 'remix-hook-form';

import { Button, Input, Label, TextField } from 'react-aria-components';
import { z } from 'zod';

import { commitSession, getSession } from '~/session';
import { db } from '../../db/instance';
import { User } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { requireAnonymous, verifyPassword } from '~/utils/auth.service';

export const meta: MetaFunction = () => {
  return [{ title: 'Iniciar sesión' }];
};

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormData = z.infer<typeof LoginSchema>;
type ActionData = {
  error?: string;
};

const resolver = zodResolver(LoginSchema);

export async function loader({ request }: LoaderFunctionArgs) {
  const response = await requireAnonymous(request);

  return response;
}

export async function action({ request }: ActionFunctionArgs) {
  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData<FormData>(request, resolver);

  if (errors) {
    return json({ errors, defaultValues });
  }

  const session = await getSession(request.headers.get('Cookie'));

  const user = await db.query.User.findFirst({
    where: eq(User.email, data.email),
  });

  if (!user) {
    return json(
      {
        error: 'Credenciales incorrectas',
      },
      {
        status: 404,
      }
    );
  }

  const isPasswordValid = await verifyPassword(
    data.password,
    user.hashed_password
  );

  if (!isPasswordValid) {
    return json(
      {
        error: 'Credenciales incorrectas',
      },
      {
        status: 404,
      }
    );
  }

  session.set('user', user);

  return redirect('/dashboard', {
    headers: {
      'set-cookie': await commitSession(session),
    },
  });
}

export default function LogIn() {
  const actionData = useActionData<ActionData>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useRemixForm<FormData>({
    mode: 'onSubmit',
    resolver,
  });

  return (
    <main className="p-[2rem] flex items-center justify-center flex-col h-lvh bg-cyan-500">
      <div className="flex justify-between flex-col w-[45%] items-center shadow-xl pt-24 pb-16 rounded-3xl bg-white">
        <h1 className="text-3xl mb-12">Inicia Sesión</h1>
        {actionData?.error ? (
          <div className="error text-red-600">{actionData?.error}</div>
        ) : null}
        <Form
          className="flex flex-col gap-y-8 w-[75%]"
          method="POST"
          onSubmit={handleSubmit}
        >
          <TextField
            className="flex flex-col"
            name="email"
            type="email"
            isRequired
          >
            <Label className="text-lg">Correo:</Label>
            <Input
              {...register('email')}
              className="border-2 border-cyan-500 rounded-xl px-4 py-3 hover:border-blue-500 focus:border-black"
            />
            {errors.email ? (
              <div className="label label-text-alt text-error text-red-600">
                {errors.email?.message}
              </div>
            ) : null}
          </TextField>

          <TextField
            className="flex flex-col"
            name="password"
            type="password"
            isRequired
          >
            <Label className="text-lg">Contraseña:</Label>
            <Input
              {...register('password')}
              className="border-2 border-cyan-500 rounded-xl px-4 py-3 hover:border-blue-500 focus:border-black"
            />
            {errors.email ? (
              <div className="label">
                <span className="label-text-alt text-error">
                  {errors.password?.message}
                </span>
              </div>
            ) : null}
          </TextField>

          <section className="mt-24 flex flex-col items-center">
            <Button
              type="submit"
              className="border-2 border-cyan-500 w-[90%] text-lg py-2 rounded-3xl text-white bg-cyan-500 hover:opacity-70"
            >
              <b>Iniciar sesión</b>
            </Button>
            <span className="w-fit">
              <Link
                to="/signup"
                className="underline underline-offset-2 cursor-pointer hover:decoration-cyan-500 hover:text-cyan-500"
              >
                ¿Aun no tienes una cuenta?
              </Link>
            </span>
          </section>
        </Form>
      </div>
    </main>
  );
}
