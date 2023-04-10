import { Image, ScrollView, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useQuery } from '@apollo/client';
import { GET_POSTBYSLUG } from '../queries/post';
import moment from 'moment';

export default function DetailPostScreen({ route, navigation }) {
  const { slug } = route.params;
  const { loading, error, data } = useQuery(GET_POSTBYSLUG, {
    variables: {
      slug: slug,
    },
  });
  if (loading)
    return (
      <>
        <Text>Loading ...</Text>
      </>
    );
  if (error)
    return (
      <>
        <Text>Error : {error.message}</Text>
      </>
    );
  const postDetail = data.getPostBySlug.data;
  return (
    <>
      <ScrollView className="py-5">
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginLeft: 20,
            marginRight: 20,
            justifyContent: 'space-between',
          }}
        >
          <View className="w-[100%] mb-[20] rounded-2xl overflow-hidden">
            <Image
              className="h-[180] w-full object-cover"
              source={{
                uri: `${postDetail.imgUrl}`,
              }}
            ></Image>
            <View className="bg-white p-5 mt-[-20] relative w-full rounded-t-2xl">
              <View className="flex flex-row justify-between pb-2 py-2">
                <Text className="text-md bg-red-100 px-4 py-2 rounded-xl text-secondaryColor font-">
                  {postDetail.Category.name}
                </Text>
              </View>
              <Text className="font-bold text-2xl py-2">
                {postDetail.title}
              </Text>
              <View className="flex flex-row items-center py-2">
                <Ionicons name="person-outline" size={18} color="black" />
                <Text className="pl-2 font-bold">
                  {postDetail.User.username}
                </Text>
                <View className="pl-2 items-center flex flex-row">
                  <Ionicons name="time-outline" size={18} color="black" />
                  <Text className="pl-1 font-bold">
                    {moment(postDetail.createdAt).format('DD/MM/YY')}
                  </Text>
                </View>
              </View>
              <View className="flex flex-row py-2">
                <Text className="font-bold">Tags :</Text>
                {postDetail.Tags.map((tag) => (
                  <Text className="px-1">#{tag.name}</Text>
                ))}
              </View>
              <Text className="py-2 text-lg text-justify">
                {postDetail.content}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
