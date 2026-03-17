import React, { useState, useMemo, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Linking, Alert, ActivityIndicator, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { Header, Header2, SubscriptionPlanShimmer } from '@/components';
import { Svgs } from '@/assets/icons/Svgs';
import { useBrowseOtherPlansQuery, usePurchasePlanMutation } from '@/api/subscriptionApi';
import { SUBSCRIPTION_PLAN_ICON_URL, SUBSCRIPTION_BANNER_IMAGE_URL } from '@/constants/api';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Helper function to parse description and extract parts
const parseDescription = (description: string) => {
    const parts = {
        intro: '',
        benefits: [] as string[],
        mainDescription: '',
        paymentInfo: '',
    };

    // Split by common patterns
    const lines = description.split('\r\n').filter(line => line.trim());
    
    let currentSection = 'intro';
    let benefitsStarted = false;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        if (line.includes('Subscribe and get access to:') || line.includes('Subscribe and you will get')) {
            currentSection = 'benefits';
            benefitsStarted = true;
            continue;
        }
        
        if (benefitsStarted && line.startsWith('-')) {
            parts.benefits.push(line.substring(1).trim());
            continue;
        }
        
        if (line.toLowerCase().includes('and much more') || line.toLowerCase().includes('and more')) {
            currentSection = 'mainDescription';
            continue;
        }
        
        if (line.startsWith('(') && (line.includes('VAT') || line.includes('recurring subscription'))) {
            currentSection = 'paymentInfo';
            parts.paymentInfo += line + ' ';
            continue;
        }
        
        if (currentSection === 'intro' && !benefitsStarted) {
            parts.intro += line + ' ';
        } else if (currentSection === 'mainDescription' && !line.startsWith('(')) {
            parts.mainDescription += line + ' ';
        } else if (currentSection === 'paymentInfo') {
            parts.paymentInfo += line + ' ';
        }
    }
    
    return {
        intro: parts.intro.trim(),
        benefits: parts.benefits,
        mainDescription: parts.mainDescription.trim(),
        paymentInfo: parts.paymentInfo.trim(),
    };
};

// Helper function to get plan icon URL
const getPlanIconUrl = (iconName: string | null): any => {
    if (!iconName) {
        return null;
    }
    return { uri: `${SUBSCRIPTION_PLAN_ICON_URL}${iconName}` };
};

export const SubscriptionPlanDetail: React.FC<any> = ({ route, navigation: _navigation }: any) => {
    const initialIndex = route?.params?.initialIndex || 0;
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const { data, isLoading, error } = useBrowseOtherPlansQuery();
    const [purchasePlan, { isLoading: isPurchasing }] = usePurchasePlanMutation();
    const flatListRef = useRef<FlatList>(null);

    // Parse plans data
    const plans = useMemo(() => {
        if (!data?.data?.plans) return [];
        return data.data.plans.map(plan => {
            const parsed = parseDescription(plan.description);
            const durationLabel = data.data.durations[plan.duration] || plan.duration;
            return {
                ...plan,
                parsedDescription: parsed,
                durationLabel,
                formattedPrice: `€${plan.price}`,
            };
        });
    }, [data]);

    const currentPlan = plans[currentIndex] || plans[0];

    const handlePrevious = () => {
        if (currentIndex > 0) {
            const newIndex = currentIndex - 1;
            setCurrentIndex(newIndex);
            flatListRef.current?.scrollToIndex({ index: newIndex, animated: true });
        }
    };

    const handleNext = () => {
        if (currentIndex < plans.length - 1) {
            const newIndex = currentIndex + 1;
            setCurrentIndex(newIndex);
            flatListRef.current?.scrollToIndex({ index: newIndex, animated: true });
        }
    };

    const handleScroll = (event: any) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffsetX / SCREEN_WIDTH);
        if (index !== currentIndex && index >= 0 && index < plans.length) {
            setCurrentIndex(index);
        }
    };

    const handleScrollEvent = (event: any) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffsetX / SCREEN_WIDTH);
        if (index !== currentIndex && index >= 0 && index < plans.length) {
            setCurrentIndex(index);
        }
    };

    // Scroll to initial index when data loads
    useEffect(() => {
        if (plans.length > 0 && initialIndex > 0 && flatListRef.current) {
            setTimeout(() => {
                flatListRef.current?.scrollToIndex({ index: initialIndex, animated: false });
            }, 100);
        }
    }, [plans.length, initialIndex]);

    const renderPlanCard = ({ item, index }: { item: any; index: number }) => {
        return (
            <View style={styles.planCardWrapper}>
                {/* Navigation Arrows */}
                {index > 0 && (
                    <TouchableOpacity 
                        style={styles.navArrowLeft} 
                        onPress={handlePrevious}
                        activeOpacity={0.7}
                    >
                        <Svgs.ArrowLeft 
                            height={metrics.width(24)} 
                            width={metrics.width(24)} 
                            fill={darkColors.primaryColor}
                        />
                    </TouchableOpacity>
                )}

                {index < plans.length - 1 && (
                    <TouchableOpacity 
                        style={styles.navArrowRight} 
                        onPress={handleNext}
                        activeOpacity={0.7}
                    >
                        <Svgs.ArrowRight 
                            height={metrics.width(24)} 
                            width={metrics.width(24)} 
                            fill={darkColors.primaryColor}
                        />
                    </TouchableOpacity>
                )}

                {/* Main Card with ScrollView for content */}
                <ScrollView 
                    contentContainerStyle={styles.cardScrollContent}
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled={true}
                    scrollEventThrottle={16}
                    bounces={true}
                    directionalLockEnabled={true}
                    alwaysBounceVertical={true}
                    alwaysBounceHorizontal={false}
                >
                    <View style={styles.card}>
                        {/* Circular Graphic */}
                        <View style={styles.graphicContainer}>
                            <View style={styles.graphicCircle}>
                                {item.plan_icon ? (
                                    <Image
                                        source={getPlanIconUrl(item.plan_icon)}
                                        style={styles.planIcon}
                                        resizeMode="contain"
                                        defaultSource={require('@/assets/images/Music.png')}
                                    />
                                ) : (
                                    <View style={styles.graphicPlaceholder}>
                                        <Svgs.BassoonLogo 
                                            height={metrics.width(100)} 
                                            width={metrics.width(100)} 
                                        />
                                        <Text style={styles.musicalNotes}>♪ ♫ ♪</Text>
                                    </View>
                                )}
                            </View>
                        </View>

                        {/* Title */}
                        <Text style={styles.title}>{item.name}</Text>

                        {/* Price */}
                        <Text style={styles.price}>{item.formattedPrice}</Text>

                        {/* Duration */}
                        <Text style={styles.duration}>Duration: {item.durationLabel}</Text>

                        {/* Subscribe Button */}
                        <TouchableOpacity 
                            style={[styles.subscribeButton, isPurchasing && styles.subscribeButtonDisabled]}
                            onPress={handleSubscribe}
                            activeOpacity={0.8}
                            disabled={isPurchasing}
                        >
                            {isPurchasing ? (
                                <View style={styles.loadingContainer}>
                                    <ActivityIndicator size="small" color={darkColors.TextWhite} />
                                    <Text style={styles.subscribeButtonText}>Processing...</Text>
                                </View>
                            ) : (
                                <Text style={styles.subscribeButtonText}>SUBSCRIBE NOW</Text>
                            )}
                        </TouchableOpacity>

                        {/* Description */}
                        <View style={styles.contentSection}>
                            {item.parsedDescription.intro && (
                                <Text style={styles.descriptionText}>
                                    {item.parsedDescription.intro}
                                </Text>
                            )}

                            {item.parsedDescription.benefits.length > 0 && (
                                <>
                                    <Text style={styles.benefitsTitle}>Subscribe and get access to:</Text>
                                    {item.parsedDescription.benefits.map((benefit: string, benefitIndex: number) => (
                                        <Text key={benefitIndex} style={styles.benefitItem}>
                                            - {benefit}
                                        </Text>
                                    ))}
                                    <Text style={styles.andMore}>and much more</Text>
                                </>
                            )}

                            {item.parsedDescription.mainDescription && (
                                <Text style={styles.descriptionText}>
                                    {item.parsedDescription.mainDescription}
                                </Text>
                            )}

                            {item.parsedDescription.paymentInfo && (
                                <Text style={styles.paymentInfo}>
                                    {item.parsedDescription.paymentInfo}
                                </Text>
                            )}
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    };

    const handleSubscribe = async () => {
        if (!currentPlan?.slug) {
            Alert.alert('Error', 'Plan information is missing. Please try again.');
            return;
        }

        try {
            const result = await purchasePlan(currentPlan.slug).unwrap();
            
            if (result.success && result.data?.checkout_url) {
                // Open the Stripe checkout URL
                const canOpen = await Linking.canOpenURL(result.data.checkout_url);
                if (canOpen) {
                    await Linking.openURL(result.data.checkout_url);
                } else {
                    Alert.alert('Error', 'Unable to open checkout page. Please try again.');
                }
            } else {
                Alert.alert('Error', result.message || 'Failed to create checkout session. Please try again.');
            }
        } catch (error: any) {
            console.error('[SubscriptionPlanDetail] Purchase error:', error);
            const errorMessage = error?.data?.message || error?.message || 'Failed to process subscription. Please try again.';
            Alert.alert('Error', errorMessage);
        }
    };

    if (isLoading) {
        return (
            <View style={styles.container}>
                <View style={styles.loadingWrapper}>
                    <SubscriptionPlanShimmer />
                    <View style={styles.paginationContainer}>
                        {[1, 2, 3, 4].map((_, index) => (
                            <View key={index} style={styles.paginationDot} />
                        ))}
                    </View>
                </View>
            </View>
        );
    }

    if (error || !currentPlan) {
        return (
            <View style={styles.container}>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Failed to load subscription plans. Please try again.</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
              <Header2 title={'Subscription Plans'}  />
            <FlatList
                ref={flatListRef}
                data={plans}
                renderItem={renderPlanCard}
                keyExtractor={(item) => String(item.id)}
                horizontal
                pagingEnabled
                scrollEnabled
                showsHorizontalScrollIndicator={false}
                decelerationRate="fast"
                onScroll={handleScrollEvent}
                scrollEventThrottle={16}
                onMomentumScrollEnd={handleScroll}
                onScrollToIndexFailed={(info) => {
                    setTimeout(() => {
                        flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
                    }, 500);
                }}
                getItemLayout={(data, index) => ({
                    length: SCREEN_WIDTH,
                    offset: SCREEN_WIDTH * index,
                    index,
                })}
                initialScrollIndex={initialIndex >= 0 && initialIndex < plans.length ? initialIndex : 0}
                contentContainerStyle={styles.flatListContent}
                removeClippedSubviews={false}
                bounces={false}
            />

            {/* Pagination Dots */}
            <View style={styles.paginationContainer}>
                {plans.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.paginationDot,
                            index === currentIndex && styles.paginationDotActive,
                        ]}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: darkColors.background,
    },
    flatListContent: {
        paddingBottom: metrics.height(20),
    },
    planCardWrapper: {
        width: SCREEN_WIDTH,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: metrics.width(20),
        position: 'relative',
        paddingTop: metrics.height(20),
    },
    cardScrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingBottom: metrics.height(60),
    },
    cardContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: metrics.width(20),
        position: 'relative',
        minHeight: metrics.screenHeight * 0.8,
    },
    card: {
        backgroundColor: '#1a1a1a',
        borderRadius: 20,
        padding: metrics.width(24),
        width: '100%',
        maxWidth: metrics.width(400),
        alignItems: 'center',
    },
    navArrowLeft: {
        position: 'absolute',
        left: metrics.width(10),
        top: '50%',
        transform: [{ translateY: -metrics.width(12) }],
        zIndex: 10,
        padding: metrics.width(8),
    },
    navArrowRight: {
        position: 'absolute',
        right: metrics.width(10),
        top: '50%',
        transform: [{ translateY: -metrics.width(12) }],
        zIndex: 10,
        padding: metrics.width(8),
    },
    graphicContainer: {
        marginBottom: metrics.height(20),
        alignItems: 'center',
    },
    graphicCircle: {
        width: metrics.width(150),
        height: metrics.width(150),
        borderRadius: metrics.width(75),
        backgroundColor: '#FF6B35',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    graphicPlaceholder: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    musicalNotes: {
        position: 'absolute',
        fontSize: metrics.width(20),
        color: darkColors.TextWhite,
        top: metrics.height(10),
        right: metrics.width(10),
    },
    title: {
        fontSize: metrics.width(28),
        fontWeight: 'bold',
        color: darkColors.TextWhite,
        textAlign: 'center',
        marginBottom: metrics.height(8),
    },
    price: {
        fontSize: metrics.width(32),
        fontWeight: 'bold',
        color: darkColors.primaryColor,
        textAlign: 'center',
        marginBottom: metrics.height(4),
    },
    duration: {
        fontSize: metrics.width(14),
        color: darkColors.TextWhite,
        textAlign: 'center',
        marginBottom: metrics.height(20),
    },
    subscribeButton: {
        backgroundColor: darkColors.primaryColor,
        borderRadius: 12,
        paddingVertical: metrics.height(16),
        paddingHorizontal: metrics.width(32),
        width: '100%',
        alignItems: 'center',
        marginBottom: metrics.height(24),
    },
    subscribeButtonDisabled: {
        opacity: 0.6,
    },
    subscribeButtonText: {
        color: darkColors.TextWhite,
        fontSize: metrics.width(16),
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: metrics.width(8),
    },
    contentSection: {
        width: '100%',
    },
    descriptionText: {
        fontSize: metrics.width(14),
        color: darkColors.TextWhite,
        lineHeight: metrics.height(20),
        marginBottom: metrics.height(12),
        textAlign: 'left',
    },
    benefitsTitle: {
        fontSize: metrics.width(14),
        color: darkColors.TextWhite,
        fontWeight: '600',
        marginBottom: metrics.height(8),
        marginTop: metrics.height(4),
    },
    benefitItem: {
        fontSize: metrics.width(14),
        color: darkColors.TextWhite,
        lineHeight: metrics.height(20),
        marginBottom: metrics.height(6),
        paddingLeft: metrics.width(4),
    },
    andMore: {
        fontSize: metrics.width(14),
        color: darkColors.TextWhite,
        fontStyle: 'italic',
        marginBottom: metrics.height(12),
        marginTop: metrics.height(4),
    },
    paymentInfo: {
        fontSize: metrics.width(12),
        color: '#9d9d9d',
        lineHeight: metrics.height(18),
        marginTop: metrics.height(16),
        textAlign: 'left',
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: metrics.height(20),
        gap: metrics.width(8),
    },
    paginationDot: {
        width: metrics.width(8),
        height: metrics.width(8),
        borderRadius: metrics.width(4),
        backgroundColor: darkColors.TextWhite,
        opacity: 0.3,
    },
    paginationDotActive: {
        backgroundColor: darkColors.primaryColor,
        opacity: 1,
    },
    planIcon: {
        width: '100%',
        height: '100%',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: metrics.height(40),
        paddingHorizontal: metrics.width(20),
    },
    errorText: {
        color: darkColors.TextWhite,
        fontSize: metrics.width(14),
        textAlign: 'center',
    },
    loadingWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: metrics.height(40),
    },
});

export default SubscriptionPlanDetail;
