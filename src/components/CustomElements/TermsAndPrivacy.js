import { View, Text } from 'react-native';
import React from 'react';
import { styles } from '../../../app.styles';
import i18n from '../../../i18n';

const TermsAndPrivacy = ({}) => {
  const termsOfUseOpen = () => {
    alert('terms');
  };

  const privacyPolicyOpen = () => {
    alert('policy');
  };

  return (
    <View>
      <Text style={styles.text}>
        {i18n.t('terms_and_condition.start')}
        <Text style={styles.link} onPress={termsOfUseOpen}>
          {i18n.t('terms_and_condition.terms_of_use')}
        </Text>
        {i18n.t('terms_and_condition.and')}
        <Text style={styles.link} onPress={privacyPolicyOpen}>
          {i18n.t('terms_and_condition.privacy_policy')}
        </Text>
      </Text>
    </View>
  );
};

export default TermsAndPrivacy;
