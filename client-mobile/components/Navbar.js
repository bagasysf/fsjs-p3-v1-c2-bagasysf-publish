import { View, Image, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Navbar() {
  return (
    <>
      {/* <View className="px-5 flex gap-3 flex-row items-center border-b border-gray-100">
        <View className="bg-[#E20612] py-3 px-2 ">
          <Ionicons name="flash-outline" size={16} color="white" />
        </View>
        <Text>Bahaya Jika Tidak Ada Hafalan ...</Text>
      </View>
      <View className="px-5 flex flex-row items-center border-b border-gray-100 justify-between">
        <View className="py-7 flex flex-row items-center">
          <Ionicons name="menu" size={32} color="black" />
        </View>
        <View className="flex flex-row gap-3">
          <Ionicons name="search" size={24} color="black" />
          <Ionicons name="moon" size={24} color="black" />
        </View>
      </View> */}
      <View className="px-5 py-5 border-b border-gray-100">
        <Image
          style={{
            height: 40,
            width: '100%',
            resizeMode: 'cover',
            borderRadius: 16,
          }}
          source={{
            uri: 'https://rumaysho.com/wp-content/uploads/2022/09/IMG_20220930_092726_422.jpg',
          }}
        ></Image>
      </View>
    </>
  );
}
