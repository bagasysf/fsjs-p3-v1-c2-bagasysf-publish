import { Image } from 'react-native';

export default function LogoTitle() {
  return (
    <>
      <Image
        style={{
          width: 180,
          height: 30,
          resizeMode: 'cover',
          marginLeft: 10,
        }}
        source={{
          uri: 'https://rumaysho.com/wp-content/uploads/2019/09/logo-rumaysho-544-x180-ipad.png',
        }}
      ></Image>
    </>
  );
}
