import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BassoonInput } from '@/components/BassoonInput';
import { PrimaryButton } from '@/components/PrimaryButton';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { Header2 } from '@/components';

export const ProfileSetting: React.FC<any> = ({ route, navigation }: any) => {
    const [email, setEmail] = React.useState(route?.params?.email ?? 'refardt@me.com');
    const [name, setName] = React.useState(route?.params?.name ?? 'Malte Refardt');
    const [contact, setContact] = React.useState(route?.params?.contact ?? '');
    const [country, setCountry] = React.useState(route?.params?.country ?? 'Germany');
    const [address1, setAddress1] = React.useState(route?.params?.address1 ?? 'Bothfelder Anger 1');
    const [address2, setAddress2] = React.useState(route?.params?.address2 ?? '');
    const [postal, setPostal] = React.useState(route?.params?.postal ?? '');
    const [city, setCity] = React.useState(route?.params?.city ?? 'Hannover');

    const onSave = () => {
        // placeholder: save logic goes here
        console.log('Saving profile', { email, name, contact, country, address1, address2, postal, city });
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Header2 title="Settings" titleStyle={styles.headerTitle} />
            <ScrollView contentContainerStyle={styles.content}>
                <BassoonInput value={email} onChangeText={setEmail} placeholder="Email" containerStyle={styles.inputWrap} />
                <BassoonInput value={name} onChangeText={setName} placeholder="Full name" containerStyle={styles.inputWrap} />
                <BassoonInput value={contact} onChangeText={setContact} placeholder="Contact number" containerStyle={styles.inputWrap} />
                <BassoonInput value={country} onChangeText={setCountry} placeholder="Country" containerStyle={styles.inputWrap} />
                <BassoonInput value={address1} onChangeText={setAddress1} placeholder="Address line 1" containerStyle={styles.inputWrap} />
                <BassoonInput value={address2} onChangeText={setAddress2} placeholder="Address line 2" containerStyle={styles.inputWrap} />
                <BassoonInput value={postal} onChangeText={setPostal} placeholder="Postal code" containerStyle={styles.inputWrap} />
                <BassoonInput value={city} onChangeText={setCity} placeholder="City" containerStyle={styles.inputWrap} />

                <View style={styles.saveWrap}>
                    <PrimaryButton title="SAVE" onPress={onSave} />
                </View>

                <Text style={styles.cancel} onPress={() => navigation.goBack()}>Cancel</Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: darkColors.background },
    content: { padding: metrics.width(16), paddingBottom: metrics.height(40) },
    inputWrap: { marginBottom: metrics.height(12) },
    saveWrap: { marginTop: metrics.height(18) },
    cancel: { color: darkColors.primaryColor, textAlign: 'center', marginTop: metrics.height(12) },
    headerTitle: { fontSize: metrics.width(20), color: darkColors.primaryColor },
});

export default ProfileSetting;
