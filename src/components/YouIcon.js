import { Image, useColorScheme } from "react-native";
import React from "react";
import You_black_en from "../../assets/images/You_black_en.png";
import You_black_pl from "../../assets/images/You_black_pl.png";
import You_black_ua from "../../assets/images/You_black_ua.png";
import You_white_en from "../../assets/images/You_white_en.png";
import You_white_pl from "../../assets/images/You_white_pl.png";
import You_white_ua from "../../assets/images/You_white_ua.png";
import * as Localization from "expo-localization";
import { styles } from "../../app.styles";

const YouIcon = () => {
  const colorScheme = useColorScheme();
  const currentLocale = Localization.locale;

  const imageMapping = {
    dark: {
      "en-US": You_white_en,
      "pl-PL": You_white_pl,
      "ua-UA": You_white_ua,
    },
    light: {
      "en-US": You_black_en,
      "pl-PL": You_black_pl,
      "ua-UA": You_black_ua,
    },
  };

  const imageSource = imageMapping[colorScheme][currentLocale];

  return (
    <Image style={styles.logo} resizeMode="contain" source={imageSource} />
  );
};

export default YouIcon;
