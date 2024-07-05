import { Form, Link } from '@remix-run/react';
import {
  Button,
  FieldError,
  Input,
  Label,
  TextField,
} from 'react-aria-components';

export default function SignUp() {
  return (
    <main className="p-[2rem] flex items-center justify-center flex-col h-lvh bg-cyan-500">
      <div className="flex justify-start flex-col w-[45%] items-center shadow-xl pt-24 pb-16 rounded-3xl bg-white">
        <h1 className="text-3xl mb-8">Crea tu cuenta</h1>
        <Form className="flex flex-col gap-y-3 w-[75%] max-h-[75%]">
          <TextField className="flex flex-col gap-y-2" name="name" isRequired>
            <Label className="text-lg">Nombre:</Label>
            <Input className="border-2 border-cyan-500 rounded-xl px-4 py-3 hover:border-blue-500 focus:border-black" />
            <FieldError className="text-red-600" />
          </TextField>

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
                to="/login"
                className="underline underline-offset-2 cursor-pointer hover:decoration-cyan-500 hover:text-cyan-500"
              >
                Ya tengo una cuenta
              </Link>
            </span>
          </TextField>
          <span className="mt-10 flex justify-center">
            <Button
              onPress={() => console.log('You click me')}
              className="border-2 border-cyan-500 w-[90%] text-lg py-2 rounded-3xl text-white bg-cyan-500 hover:opacity-70"
            >
              <b>Crear cuenta</b>
            </Button>
          </span>
        </Form>
      </div>
    </main>
  );
}
