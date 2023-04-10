import Navbar from '../components/Navbar';
import { ScrollView, View } from 'react-native';
import Card from '../components/Card';
import { GET_ALLPOSTS } from '../queries/post';
import { useQuery } from '@apollo/client';
import { Text } from 'react-native';

export default function HomeScreen({ navigation }) {
  const { loading, error, data } = useQuery(GET_ALLPOSTS);
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
  return (
    <>
      <Navbar />
      <ScrollView>
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
          {data.getAllPosts.data.map((post) => (
            <Card navigation={navigation} key={post.id} post={post} />
          ))}
        </View>
      </ScrollView>
    </>
  );
}
