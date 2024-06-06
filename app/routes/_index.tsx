import { Button, FieldError, Form, Input, Label, TextField } from 'react-aria-components';

export default function Index() {
  return (
    <div className="p-[2rem] flex items-center justify-center flex-col h-lvh bg-cyan-500">
      <div className="flex justify-between flex-col w-[45%] items-center shadow-xl pt-24 pb-16 rounded-3xl bg-white">
        <header className="text-3xl mb-12">Inicia Sesión</header>
        <Form className="flex flex-col gap-y-8 w-[75%]">
          <TextField
            className="flex flex-col gap-y-2"
            name="email"
            type="email"
            isRequired
          >
            <Label className="text-lg">Email</Label>
            <Input className="border-2 border-cyan-500 rounded-xl px-4 py-3"/>
            <FieldError className="text-red-600"/>
          </TextField>

          <TextField
            className="flex flex-col gap-y-2"
            name="password"
            type="password"
            isRequired
          >
            <Label className="text-lg">Password</Label>
            <Input className="border-2 border-cyan-500 rounded-xl px-4 py-3"/>
            <Button>Olvitaste tu contraseña</Button>
            <FieldError className="text-red-600"/>
          </TextField>
          <div className="mt-24 flex justify-center">
            <Button
              onPress={() => console.log('You click me')}
              className="border-2 border-cyan-500 w-[90%]  text-lg py-2 rounded-3xl text-white bg-cyan-500"
            >
              <b>Iniciar sesión</b>
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}
