import { Image, View } from 'react-native';
import LogoImage from '../../assets/images/NotALogo.jpg';
import { styles } from '../../app.styles';

export default function Logo() {
  return (
    <View style={styles.Middle}>
      <Image style={styles.logo} resizeMode="contain" source={LogoImage} />
    </View>
  );
}
