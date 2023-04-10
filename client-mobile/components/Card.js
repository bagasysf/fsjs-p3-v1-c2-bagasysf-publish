import { Pressable, Image, View, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import moment from 'moment/moment';

export default function Card({ navigation, post }) {
  const spliceWord = (word = '', value) => {
    return word?.length > value ? word.slice(0, value).concat(' ...') : word;
  };

  const textOnPress = (slug) => {
    navigation.navigate('Details', { slug });
  };
  return (
    <>
      <Pressable
        onPress={() => textOnPress(post.slug)}
        className="w-[47%] mb-[6%] relative rounded-2xl overflow-hidden"
      >
        <Image
          className="h-[160] w-full object-cover"
          source={{
            uri: `${post.imgUrl}`,
          }}
        ></Image>
        <View className="bg-white p-3 absolute bottom-0 w-full rounded-t-2xl">
          <View className="flex flex-row justify-between pb-2">
            <View className="items-center flex flex-row mb-1">
              <Ionicons name="time-outline" size={12} color="black" />
              <Text className="pl-1 text-xs">
                {moment(post.createdAt).format('DD/MM/YY')}
              </Text>
            </View>
            <Text className="text-xs inline-flex bg-red-100 px-2 rounded-xl text-secondaryColor font-">
              {spliceWord(post.Category.name, 7)}
            </Text>
          </View>
          <Text className="font-bold text-sm">
            {spliceWord(post.title, 30)}
          </Text>
        </View>
      </Pressable>
    </>
  );
}
