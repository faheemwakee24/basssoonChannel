import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator, Platform, PermissionsAndroid } from 'react-native';
import { launchImageLibrary, ImagePickerResponse, MediaType, ImageLibraryOptions } from 'react-native-image-picker';
import { Header2 } from '@/components/Header2';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { Svgs } from '@/assets/icons/Svgs';
import TitleTile from '@/components/TitleTile';
import { MyProfileShimmer } from '@/components/Shimmer';
import { SCREEN_NAMES } from '@/config/constants';
import { navigate } from '@/navigation/navigationService';
import { useGetUserAccountQuery, useChangeProfilePictureMutation } from '@/api/userApi';
import { useAppDispatch } from '@/store';
import { showSnackbar } from '@/store';
import { useLogoutMutation } from '@/api/authApi';
import { USER_PROFILE_IMAGE_URL } from '@/constants/api';

const MyProfile: React.FC<any> = () => {
    const dispatch = useAppDispatch();
    const { data, isLoading } = useGetUserAccountQuery();
    const [changeProfilePicture, { isLoading: isUploading }] = useChangeProfilePictureMutation();
    const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
    const [localImageUri, setLocalImageUri] = useState<string | null>(null);

    const user = data?.data?.user;

    // Helper function to get profile image source
    const getProfileImageSource = () => {
        if (localImageUri) {
            return { uri: localImageUri };
        }
        if (user?.image) {
            // If image is a full URL, use it directly, otherwise construct the URL with base path
            if (user.image.startsWith('http://') || user.image.startsWith('https://')) {
                return { uri: user.image };
            }
            // Construct full URL using base path
            return { uri: `${USER_PROFILE_IMAGE_URL}${user.image}` };
        }
        return require('@/assets/images/NoImage.png');
    };

    // Request camera/photo library permissions
    const requestPermissions = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    {
                        title: 'Photo Library Permission',
                        message: 'App needs access to your photo library to upload profile picture',
                        buttonNeutral: 'Ask Me Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'OK',
                    }
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        }
        return true; // iOS permissions are handled automatically
    };

    // Handle image picker
    const handleImagePicker = async () => {
        const hasPermission = await requestPermissions();
        if (!hasPermission) {
            dispatch(
                showSnackbar({
                    message: 'Permission to access photo library is required',
                    type: 'error',
                })
            );
            return;
        }

        const options: ImageLibraryOptions = {
            mediaType: 'photo',
            quality: 0.8,
            maxWidth: 1024,
            maxHeight: 1024,
        };

        launchImageLibrary(options, async (response: ImagePickerResponse) => {
            if (response.didCancel) {
                return;
            }

            if (response.errorMessage) {
                dispatch(
                    showSnackbar({
                        message: response.errorMessage || 'Failed to pick image',
                        type: 'error',
                    })
                );
                return;
            }

            const asset = response.assets?.[0];
            if (!asset?.uri) {
                return;
            }

            // Set local image immediately for preview
            setLocalImageUri(asset.uri);

            // Prepare file for upload
            const file = {
                uri: asset.uri,
                type: asset.type || 'image/jpeg',
                name: asset.fileName || `profile_${Date.now()}.jpg`,
            };

            try {
                const result = await changeProfilePicture({ file }).unwrap();
                
                if (result.success) {
                    dispatch(
                        showSnackbar({
                            message: result.message || 'Profile picture updated successfully',
                            type: 'success',
                        })
                    );
                } else {
                    setLocalImageUri(null); // Reset on error
                    dispatch(
                        showSnackbar({
                            message: result.message || 'Failed to update profile picture',
                            type: 'error',
                        })
                    );
                }
            } catch (error: any) {
                setLocalImageUri(null); // Reset on error
                console.error('Error uploading profile picture:', error);
                dispatch(
                    showSnackbar({
                        message: error?.data?.message || error?.message || 'Failed to upload profile picture. Please try again.',
                        type: 'error',
                    })
                );
            }
        });
    };

    // Handle logout
    const handleLogout = async () => {
        try {
            await logout().unwrap();
            dispatch(
                showSnackbar({
                    message: 'Logged out successfully',
                    type: 'success',
                })
            );
            
            // AppNavigator switches to Auth (Login) when isAuthenticated becomes false
        } catch (error: any) {
            console.error('Error during logout:', error);
            dispatch(
                showSnackbar({
                    message: error?.data?.message || 'Logged out locally',
                    type: 'info',
                })
                );
            // Token/user cleared in authApi logout; AppNavigator switches to Auth
        }
    };

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Header2 />
                <MyProfileShimmer />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header2 />

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.profileRow}>
                    <TouchableOpacity 
                        style={styles.avatarWrap} 
                        onPress={handleImagePicker}
                        disabled={isUploading}
                        activeOpacity={0.7}
                    >
                        {isUploading ? (
                            <View style={styles.uploadingOverlay}>
                                <ActivityIndicator size="large" color={darkColors.primaryColor} />
                            </View>
                        ) : null}
                        <Image 
                            source={getProfileImageSource()} 
                            style={styles.avatar} 
                            resizeMode="cover" 
                        />
                    </TouchableOpacity>

                    <View style={styles.infoWrap}>
                        <Text style={styles.name}>{user?.name || 'User'}</Text>
                        <Text style={styles.email}>{user?.email || ''}</Text>
                    </View>
                </View>

                <View style={styles.grid}>
                    <TitleTile icon={<Svgs.SettingIcon height={metrics.width(50)} width={metrics.width(50)} />} label="Settings" onPress={() => navigate(SCREEN_NAMES.ProfileSetting)} />
                    <TitleTile icon={<Svgs.SubscriptionIcon height={metrics.width(50)} width={metrics.width(50)} />} label="Subscriptions" onPress={() => navigate(SCREEN_NAMES.SubscriptionPlanDetail)} />
                    <TitleTile icon={<Svgs.Notification height={metrics.width(50)} width={metrics.width(50)} />} label="Notifications" onPress={() => navigate(SCREEN_NAMES.Notifications)} />
                    <TitleTile icon={<Svgs.Bookmark height={metrics.width(50)} width={metrics.width(50)} />} label="Bookmarks" onPress={() => navigate(SCREEN_NAMES.Bookmarks)} />
                    <TitleTile icon={<Svgs.ChangePassoword height={metrics.width(50)} width={metrics.width(50)} />} label="Change Password" onPress={() => navigate(SCREEN_NAMES.ChangePassword)} />
                    <TitleTile 
                        icon={<Svgs.Logout height={metrics.width(50)} width={metrics.width(50)} />} 
                        label={isLoggingOut ? "Logging out..." : "Logout"} 
                        onPress={handleLogout}
                        disabled={isLoggingOut}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

export default MyProfile;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: darkColors.background },
    content: { padding: metrics.width(16), },
    profileRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: metrics.height(24) },
    avatarWrap: {
        width: metrics.width(150),
        height: metrics.width(150),
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: metrics.width(5), // Make it circular
    },
    avatar: { width: '100%', height: '100%', borderRadius: metrics.width(5) },
    uploadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: metrics.width(75),
        zIndex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noImagePlaceholder: { position: 'absolute', alignItems: 'center', justifyContent: 'center' },
    infoWrap: { flex: 1, paddingLeft: metrics.width(16) },
    name: { color: darkColors.TextWhite, fontSize: metrics.width(18), fontWeight: '700' },
    email: { color: darkColors.TextWhite, marginTop: metrics.height(2), fontSize: metrics.width(17) },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: metrics.width(8),
    },
    iconWrap: { marginBottom: metrics.height(8) },
    tileLabel: { color: darkColors.TextWhite, textAlign: 'center' },
});
