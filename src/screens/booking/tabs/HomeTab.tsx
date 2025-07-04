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
import { useCallback, useEffect, useRef, useState } from 'react';
import { pushPageloadEvent } from '../../../utils/AepUtils';
import {
  AepPageName,
  AepPageUrl,
} from '../../../common/constants/AepConstants';

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

  useEffect(() => {
    pushPageloadEvent(AepPageName.HOME, AepPageUrl.HOME);
  }, []);

  const handleScroll = useCallback((event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setCurrent(index);
  }, []);

  const handleDotPress = useCallback((index: number) => {
    setCurrent(index);
    scrollViewRef.current?.scrollTo({
      x: index * width,
      animated: true,
    });
  }, []);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <Header title="Coforge Airlines" />
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
            <View key={index} style={styles.itemContainer}>
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
    alignItems: 'center',
  },
  bannerImage: {
    width: width - 40,
    height: 170,
    resizeMode: 'cover',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  scrollContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  itemContainer: {
    marginHorizontal: 20,
    marginTop: 15,
    backgroundColor: '#1d2c40',
    borderRadius: 20,
  },
  itemText: {
    fontSize: 16,
    color: Colors.white,
    marginHorizontal: 15,
    marginTop: 10,
  },
  itemSubtitle: {
    fontSize: 13,
    color: Colors.white,
    marginHorizontal: 15,
    marginTop: 5,
    marginBottom: 10,
  },
  dotsContainer: {
    flexDirection: 'row',
    backgroundColor: '#1d2c40',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'gray',
    marginHorizontal: 10,
  },
  activeDot: {
    backgroundColor: Colors.white,
  },
});

export default Home;
