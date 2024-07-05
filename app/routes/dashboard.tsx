import { Form } from '@remix-run/react';
import { Button } from 'react-aria-components';

export default function Dashboard() {
  return (
    <div>
      This is the dashboard
      <Form method="POST" action="/logout">
        <span>
          <Button
            type="submit"
            className="border-2 border-cyan-500 w-[90%] text-lg py-2 rounded-3xl text-white bg-cyan-500 hover:opacity-70"
          >
            Log Out
          </Button>
        </span>
      </Form>
    </div>
  );
}
