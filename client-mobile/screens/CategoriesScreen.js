import { View, Text } from 'react-native';

export default function CategoriesScreen() {
  return (
    <>
      <View className="flex p-5">
        <View className="flex flex-row flex-wrap justify-between">
          <Text className="bg-white px-5 py-5 rounded-xl w-full mb-[6%] font-medium">
            Akidah
          </Text>
          <Text className="bg-white px-5 py-5 rounded-xl w-full mb-[6%] font-medium">
            Akidah
          </Text>
          <Text className="bg-white px-5 py-5 rounded-xl w-full mb-[6%] font-medium">
            Akidah
          </Text>
        </View>
      </View>
    </>
  );
}
