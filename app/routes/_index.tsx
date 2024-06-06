import {Button} from 'react-aria-components'

export default function Index() {
  return (
    <div className="mx-[100px] my-[100px]">
      <Button onPress={() => alert('Hello world!')}>Press me</Button>
    </div>
  )
}
