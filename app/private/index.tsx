import { Image, YStack } from 'tamagui';

export default function App() {
  return (
    <YStack bg='white' f={1} px='$24' py='$29' ai='center' jc='center'>
      <Image source={require('assets/images/logo.png')} w='$512' h='$93' />
    </YStack>
  );
}
