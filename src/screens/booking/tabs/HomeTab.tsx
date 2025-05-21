import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  Text,
} from 'react-native';
import { Colors } from '../../../common/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../common/components/Header';
import { useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');
const data = [
  {
    image: require('../../../assets/banner1.png'),
    title: 'Explore Atlanta',
    subTitle:
      'Discover the vibrant city of Atlanta with its rich history and culture.',
  },
  {
    image: require('../../../assets/banner1.png'),
    title: 'Visit New York',
    subTitle:
      'Experience the city that never sleeps with iconic landmarks and attractions.',
  },
  {
    image: require('../../../assets/banner1.png'),
    title: 'Relax in Hawaii',
    subTitle:
      'Unwind on the beautiful beaches of Hawaii and enjoy the tropical paradise.',
  },
  {
    image: require('../../../assets/banner1.png'),
    title: 'Adventure in Colorado',
    subTitle:
      'Embark on thrilling adventures in the Rocky Mountains of Colorado.',
  },
  {
    image: require('../../../assets/banner1.png'),
    title: 'Discover Paris',
    subTitle: 'Fall in love with the charm and romance of the City of Light.',
  },
];

// const banners = [
//   { id: '1', image: require('../../../assets/banner1.jpg') },
//   { id: '2', image: require('../../../assets/banner2.jpg') },
//   { id: '3', image: require('../../../assets/banner3.jpg') },
//   { id: '4', image: require('../../../assets/banner4.jpg') },
//   { id: '5', image: require('../../../assets/banner5.jpg') },
// ];

const Home = () => {
  const [current, setCurrent] = useState(0);
  const scrollViewRef = useRef<ScrollView | null>(null);

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setCurrent(index);
  };

  const handleDotPress = (index: number) => {
    setCurrent(index);
    scrollViewRef.current?.scrollTo({
      x: index * width,
      animated: true,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <Header title="Coforge Airlines" />

      <Icon name="home" size={30} color="#4CAF50" />

      <View style={styles.container}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={100}
          contentContainerStyle={styles.scrollContainer}>
          {data.map((item, index) => (
            <View
              key={index}
              style={{
                marginHorizontal: 20,
                marginTop: 15,
                borderColor: '#fff',
              }}>
              <View style={[{ width: width - 40 }]}>
                <Image source={item.image} style={styles.bannerImage} />
                <Text style={styles.itemText}>{item.title}</Text>
                <Text style={styles.itemSubtitle}>{item.subTitle}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.dotsContainer}>
          {data.map((_, index) => (
            <Text
              key={index}
              style={[styles.dot, current === index && styles.activeDot]}
              onPress={() => handleDotPress(index)}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    // flex: 1,

    alignItems: 'center',
  },
  // bannerList: {
  //   paddingHorizontal: 10,
  //   marginTop: 20,
  // },
  // bannerContainer: {
  //   marginHorizontal: 10,
  //   borderRadius: 10,
  //   overflow: 'hidden',
  // },
  bannerImage: {
    width: width - 40,
    height: 130,
    resizeMode: 'cover',
  },

  // container: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  scrollContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  // item: {
  //   // backgroundColor: Colors.background,
  //   // height: 250,
  //   justifyContent: 'center',
  //   // alignItems: 'center',
  // },
  itemText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 20,
    marginTop: 15,
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 20,
    marginVertical: 10,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: 'blue',
  },
});

export default Home;
