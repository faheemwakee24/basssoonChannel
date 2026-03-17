import React, { useState, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header2, FAQShimmer } from '@/components';
import { metrics } from '@/utils/metrics';
import { darkColors } from '@/config/colors';
import { useGetFaqListQuery } from '@/api/faqApi';
import type { FaqItem } from '@/api/faqApi';

const LeftBackButton = () => (
    <Text style={styles.backText}>&lt; Back</Text>
);

interface FAQAccordionItemProps {
    item: FaqItem;
    isExpanded: boolean;
    onToggle: () => void;
}

const FAQAccordionItem: React.FC<FAQAccordionItemProps> = ({ item, isExpanded, onToggle }) => {
    const answerText = item.answer.replace(/\r\n/g, '\n').trim();
    return (
        <View style={styles.accordionItem}>
            <TouchableOpacity
                style={styles.questionBlock}
                onPress={onToggle}
                activeOpacity={0.8}
            >
                <Text style={styles.questionText} numberOfLines={isExpanded ? undefined : 3}>
                    {item.question}
                </Text>
                <Text style={styles.caretIcon}>{isExpanded ? '▲' : '▼'}</Text>
            </TouchableOpacity>
            {isExpanded && (
                <View style={styles.answerBlock}>
                    <Text style={styles.answerText}>{answerText}</Text>
                </View>
            )}
        </View>
    );
};

export const FAQScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const { data, isLoading, error } = useGetFaqListQuery();
    const [expandedId, setExpandedId] = useState<number | -1 | null>(null);

    const faqList = useMemo(() => {
        if (!data?.data?.faq_list) return [];
        return [...data.data.faq_list].sort((a, b) => a.sort_order - b.sort_order);
    }, [data]);

    const initialExpandedId = useMemo(() => {
        const firstShow = data?.data?.first_faq_show;
        if (firstShow && faqList.length > 0) {
            const firstItem = faqList.find((f) => f.sort_order === firstShow) ?? faqList[0];
            return firstItem.id;
        }
        return faqList[0]?.id ?? null;
    }, [data, faqList]);

    const activeExpandedId = expandedId === -1 ? null : expandedId ?? initialExpandedId;

    const toggleExpand = (id: number) => {
        setExpandedId((prev) => (prev === id ? -1 : id));
    };

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Header2
                    title="Frequently Asked Questions"
                    titleStyle={styles.headerTitle}
                    LeftIcon={<LeftBackButton />}
                    leftStyle={styles.backButtonWrap}
                />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <FAQShimmer count={10} />
                </ScrollView>
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.container, styles.centered]}>
                <Header2
                    title="Frequently Asked Questions"
                    titleStyle={styles.headerTitle}
                    LeftIcon={<LeftBackButton />}
                    leftStyle={styles.backButtonWrap}
                />
                <Text style={styles.errorText}>Failed to load FAQ. Please try again later.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header2
                title="Frequently Asked Questions"
                titleStyle={styles.headerTitle}

            />
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={[
                    styles.content,
                    { paddingBottom: insets.bottom + metrics.height(100) },
                ]}
                showsVerticalScrollIndicator={false}
            >
                {faqList.map((item) => (
                    <FAQAccordionItem
                        key={item.id}
                        item={item}
                        isExpanded={activeExpandedId === item.id}
                        onToggle={() => toggleExpand(item.id)}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: darkColors.background,
    },
    centered: {
        justifyContent: 'center',
    },
    backButtonWrap: {
        minWidth: metrics.width(70),
    },
    backText: {
        color: darkColors.primaryColor,
        fontSize: metrics.width(16),
    },
    headerTitle: {
        fontSize: metrics.width(20),
        color: darkColors.primaryColor,
    },
    scrollView: {
        flex: 1,
    },
    content: {
        paddingHorizontal: metrics.width(16),
        paddingTop: metrics.height(16),
    },
    accordionItem: {
        marginBottom: metrics.height(12),
    },
    questionBlock: {
        backgroundColor: '#1a1a1a',
        paddingVertical: metrics.height(14),
        paddingHorizontal: metrics.width(16),
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    questionText: {
        color: darkColors.TextWhite,
        fontSize: metrics.width(15),
        flex: 1,
        paddingRight: metrics.width(12),
    },
    caretIcon: {
        color: darkColors.TextWhite,
        fontSize: metrics.width(14),
    },
    answerBlock: {
        backgroundColor: '#2a2a2a',
        paddingVertical: metrics.height(14),
        paddingHorizontal: metrics.width(16),
        marginTop: 2,
        borderRadius: 4,
    },
    answerText: {
        color: darkColors.TextWhite,
        fontSize: metrics.width(15),
        lineHeight: metrics.height(24),
    },
    errorText: {
        color: darkColors.TextWhite,
        fontSize: metrics.width(16),
        textAlign: 'center',
        paddingHorizontal: metrics.width(24),
    },
});

export default FAQScreen;
