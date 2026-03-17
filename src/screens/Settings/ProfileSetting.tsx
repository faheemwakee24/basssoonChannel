import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { BassoonInput } from '@/components/BassoonInput';
import { PrimaryButton } from '@/components/PrimaryButton';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { Header2 } from '@/components';
import { useGetUserAccountQuery, useUpdateProfileMutation } from '@/api/userApi';
import { useAppDispatch } from '@/store';
import { showSnackbar } from '@/store';

export const ProfileSetting: React.FC<any> = ({ route, navigation }: any) => {
    const dispatch = useAppDispatch();
    const { data, isLoading, error } = useGetUserAccountQuery();
    const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');
    const [contact, setContact] = React.useState('');
    const [country, setCountry] = React.useState('');
    const [address1, setAddress1] = React.useState('');
    const [address2, setAddress2] = React.useState('');
    const [postal, setPostal] = React.useState('');
    const [city, setCity] = React.useState('');
    const [state, setState] = React.useState('');

    // Update form fields when API data loads
    useEffect(() => {
        if (data?.data?.user) {
            const user = data.data.user;
            setEmail(user.email || '');
            setName(user.name || '');
            setContact(user.contact_number || '');
            setCountry(user.country_id?.toString() || '');
            setAddress1(user.address_line_1 || '');
            setAddress2(user.address_line_2 || '');
            setPostal(user.postal_code || '');
            setCity(user.city || '');
            setState(user.state || '');
        }
    }, [data]);

    // Show error if API call fails
    useEffect(() => {
        if (error) {
            dispatch(
                showSnackbar({
                    message: 'Failed to load account information. Please try again.',
                    type: 'error',
                })
            );
        }
    }, [error, dispatch]);

    const onSave = async () => {
        try {
            // Validate required fields
            if (!name.trim()) {
                dispatch(
                    showSnackbar({
                        message: 'Name is required',
                        type: 'error',
                    })
                );
                return;
            }
            if (!contact.trim()) {
                dispatch(
                    showSnackbar({
                        message: 'Contact number is required',
                        type: 'error',
                    })
                );
                return;
            }
            if (!country.trim()) {
                dispatch(
                    showSnackbar({
                        message: 'Country is required',
                        type: 'error',
                    })
                );
                return;
            }
            if (!address1.trim()) {
                dispatch(
                    showSnackbar({
                        message: 'Address line 1 is required',
                        type: 'error',
                    })
                );
                return;
            }
            if (!postal.trim()) {
                dispatch(
                    showSnackbar({
                        message: 'Postal code is required',
                        type: 'error',
                    })
                );
                return;
            }
            if (!city.trim()) {
                dispatch(
                    showSnackbar({
                        message: 'City is required',
                        type: 'error',
                    })
                );
                return;
            }
            if (!state.trim()) {
                dispatch(
                    showSnackbar({
                        message: 'State is required',
                        type: 'error',
                    })
                );
                return;
            }

            // Prepare the request body
            const updateData = {
                name: name.trim(),
                contact_number: contact.trim(),
                country_id: parseInt(country, 10),
                address_line_1: address1.trim(),
                address_line_2: address2.trim() || undefined,
                postal_code: postal.trim(),
                city: city.trim(),
                state: state.trim(),
            };

            // Call the API
            const result = await updateProfile(updateData).unwrap();
            
            if (result.success) {
                dispatch(
                    showSnackbar({
                        message: result.message || 'Profile updated successfully',
                        type: 'success',
                    })
                );
                // Navigate back after a short delay to allow toast to be visible
                setTimeout(() => {
                    navigation.goBack();
                }, 500);
            } else {
                dispatch(
                    showSnackbar({
                        message: result.message || 'Failed to update profile',
                        type: 'error',
                    })
                );
            }
        } catch (err: any) {
            console.error('Error updating profile:', err);
            dispatch(
                showSnackbar({
                    message: err?.data?.message || err?.message || 'Failed to update profile. Please try again.',
                    type: 'error',
                })
            );
        }
    };

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Header2 title="Settings" titleStyle={styles.headerTitle} />
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={darkColors.primaryColor} />
                </View>
            </View>
        );
    }

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
                <BassoonInput value={state} onChangeText={setState} placeholder="State" containerStyle={styles.inputWrap} />

                <View style={styles.saveWrap}>
                    <PrimaryButton 
                        title={isUpdating ? "SAVING..." : "SAVE"} 
                        onPress={onSave}
                        disabled={isUpdating}
                    />
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
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default ProfileSetting;
