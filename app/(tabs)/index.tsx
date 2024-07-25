import { StyleSheet, View, Text, ScrollView, Image } from 'react-native';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';

export default function HomeScreen() {
  return (
    <ScrollView>
      <View style={styles.heroSection}>

        <Text style={styles.textWhite}>Your current money</Text>
        <Text style={[styles.textWhite, styles.textLarge]}>
          <TabBarIcon name={'wallet'} style={styles.iconWallet} />
          80,200
        </Text>

      </View>

      {/* ===== SERVICE START ===== */}
      <View style={styles.container}>

        <Text style={styles.textMenu}>Service</Text>

        <View style={[styles.menuServiceContainer, styles.addBottom]}>

          <View style={styles.iconMenuContainer}>
            <TabBarIcon name={'albums'} style={styles.iconMenu} />
            <Text style={styles.iconText}>Album</Text>
          </View>

          <View style={styles.iconMenuContainer}>
            <TabBarIcon name={'albums'} style={styles.iconMenu} />
            <Text style={styles.iconText}>Album</Text>
          </View>

          <View style={styles.iconMenuContainer}>
            <TabBarIcon name={'albums'} style={styles.iconMenu} />
            <Text style={styles.iconText}>Album</Text>
          </View>

          <View style={styles.iconMenuContainer}>
            <TabBarIcon name={'albums'} style={styles.iconMenu} />
            <Text style={styles.iconText}>Album</Text>
          </View>

        </View>

        <View style={styles.menuServiceContainer}>

          <View style={styles.iconMenuContainer}>
            <TabBarIcon name={'albums'} style={styles.iconMenu} />
            <Text style={styles.iconText}>Album</Text>
          </View>

          <View style={styles.iconMenuContainer}>
            <TabBarIcon name={'albums'} style={styles.iconMenu} />
            <Text style={styles.iconText}>Album</Text>
          </View>

          <View style={styles.iconMenuContainer}>
            <TabBarIcon name={'albums'} style={styles.iconMenu} />
            <Text style={styles.iconText}>Album</Text>
          </View>

          <View style={styles.iconMenuContainer}>
            <TabBarIcon name={'albums'} style={styles.iconMenu} />
            <Text style={styles.iconText}>Album</Text>
          </View>

        </View>

      </View>
      {/* ===== SERVICE END ===== */}
      

      {/* ===== NEWS START ===== */}
      <View style={styles.container}>
        <Text style={styles.textMenu}>News</Text>

        <View style={styles.newsCard}>
          <Text style={styles.textSmall}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde, veritatis! Nostrum, soluta fugit quia harum voluptate cum repellendus ut esse...
            <Text style={styles.textBlue}>  see more</Text>
          </Text>
          <Image
            source={require('@/assets/images/news-img-1.jpg')}
            style={styles.newsImage}
          />
        </View>

        <View style={styles.newsCard}>
          <Text style={styles.textSmall}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde, veritatis! Nostrum, soluta fugit quia harum voluptate cum repellendus ut esse...
            <Text style={styles.textBlue}>  see more</Text>
          </Text>
          <Image
            source={require('@/assets/images/news-img-1.jpg')}
            style={styles.newsImage}
          />
        </View>

      </View>
      {/* ===== NEWS END ===== */}


      
     
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  heroSection: {
    backgroundColor: '#2f3dc2',
    padding: 20,
    paddingTop: 28
  },
  textWhite: {
    color: '#ffffff'
  },
  textLarge: {
    fontSize: 28,
    fontWeight: 700
  },
  textSmall: {
    fontSize: 12
  },
  textBlue: {
    color: '#3b4bf7'
  },
  iconWallet: {
    fontSize: 20,
    marginRight: 8
  },
  container: {
    paddingTop: 18,
    paddingBottom: 8,
    paddingLeft: 20,
    paddingRight: 20
  },
  textMenu: {
    color: '#1c1c1c',
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 12
  },
  menuServiceContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12
  },
  addBottom: {
    marginBottom: 18,
  },
  iconMenu: {
    color: '#2f3dc2'
  },
  iconText: {
    fontSize: 12,
    paddingTop: 2
  },
  iconMenuContainer: {
    borderWidth: 0.5,
    borderColor: '#b5b5b5',
    width: 64,
    height: 64,
    borderRadius: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  newsCard: {
    borderWidth: 0.5,
    borderColor: '#b5b5b5',
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
    display: 'flex',
    flexDirection: 'row',
    gap: 10
  },
  newsImage: {
    height: 80,
    width: 160,
    borderRadius: 2,
    objectFit: 'cover'
  }
});
