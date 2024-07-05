import { zodResolver } from '@hookform/resolvers/zod';
import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  MetaFunction,
  redirect,
} from '@remix-run/node';
import { Form, Link, useActionData } from '@remix-run/react';

import { Button, Input, Label, TextField } from 'react-aria-components';
import { getValidatedFormData, useRemixForm } from 'remix-hook-form';

import { z } from 'zod';

import { commitSession, getSession } from '~/session';
import { hashPassword, requireAnonymous } from '~/utils/auth.service';
import { db } from '../../db/instance';
import { User } from '../../db/schema';

export const meta: MetaFunction = () => {
  return [{ title: 'Crear una cuenta' }];
};

const SignupSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

type FormData = z.infer<typeof SignupSchema>;
type ActionData = {
  error?: string;
};

const resolver = zodResolver(SignupSchema);

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

  const session = await getSession(request.headers.get('cookie'));

  const [user] = await db
    .insert(User)
    .values({
      name: data.name,
      email: data.email,
      hashed_password: await hashPassword(data.password),
    })
    .returning();

  session.set('user', user);

  return redirect('/dashboard', {
    headers: {
      'set-cookie': await commitSession(session),
    },
  });
}

export default function SignUp() {
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
      <div className="flex justify-start flex-col w-[45%] items-center shadow-xl pt-24 pb-16 rounded-3xl bg-white">
        {actionData?.error ? (
          <div className="error">{actionData?.error}</div>
        ) : null}
        <h1 className="text-3xl mb-8">Crea tu cuenta</h1>
        <Form
          className="flex flex-col gap-y-3 w-[75%] max-h-[75%]"
          onSubmit={handleSubmit}
          method="POST"
        >
          <TextField className="flex flex-col" name="name" isRequired>
            <Label className="text-lg">Nombre:</Label>
            <Input
              {...register('name')}
              type="text"
              className="border-2 border-cyan-500 rounded-xl px-4 py-3 hover:border-blue-500 focus:border-black"
            />
            {errors.name ? (
              <div className="label">
                <span className="label-text-alt text-error color-red-600">
                  {errors.name?.message}
                </span>
              </div>
            ) : null}
          </TextField>

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
              <div className="label">
                <span className="label-text-alt text-error">
                  {errors.email?.message}
                </span>
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
            {errors.password ? (
              <div className="label">
                <span className="label-text-alt text-error">
                  {errors.password?.message}
                </span>
              </div>
            ) : null}
          </TextField>
          <section className="mt-12 flex flex-col items-center">
            <Button
              type="submit"
              className="border-2 border-cyan-500 w-[90%] text-lg py-2 rounded-3xl text-white bg-cyan-500 hover:opacity-70"
            >
              <b>Crear cuenta</b>
            </Button>
            <span className="w-fit">
              <Link
                to="/login"
                className="underline underline-offset-2 cursor-pointer hover:decoration-cyan-500 hover:text-cyan-500"
              >
                Ya tengo una cuenta
              </Link>
            </span>
          </section>
        </Form>
      </div>
    </main>
  );
}
