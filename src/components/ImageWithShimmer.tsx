import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    Image,
    ImageProps,
    StyleSheet,
    View,
    ViewStyle,
} from 'react-native';
import { Shimmer } from './Shimmer';

type ImageSourcePropType = ImageProps['source'];

export type ImageWithShimmerSource = string | { uri: string } | number | null;

export interface ImageWithShimmerProps extends Omit<ImageProps, 'source' | 'style'> {
    /** Image URL, { uri }, require() asset, or null */
    source: ImageWithShimmerSource;
    /** Container / image dimensions; also applied to shimmer */
    style?: ViewStyle;
    /** Optional fallback when load fails */
    fallbackSource?: ImageSourcePropType;
    /** Override shimmer style (e.g. borderRadius to match container) */
    shimmerStyle?: ViewStyle;
}

const normalizeSource = (src: ImageWithShimmerSource): ImageSourcePropType | null => {
    if (src == null) return null;
    if (typeof src === 'string') return { uri: src };
    return src as ImageSourcePropType;
};

export const ImageWithShimmer: React.FC<ImageWithShimmerProps> = ({
    source,
    style,
    fallbackSource,
    shimmerStyle,
    onLoad,
    onLoadEnd,
    onError,
    ...rest
}) => {
    const [loading, setLoading] = useState(false);
    const [currentSource, setCurrentSource] = useState<ImageSourcePropType | null>(
        () => normalizeSource(source)
    );
    const hasTriedFallback = useRef(false);

    // Safety timeout to ensure shimmer eventually disappears
    useEffect(() => {
        let timeout: any;
        if (loading) {
            timeout = setTimeout(() => {
                setLoading(false);
            }, 8000); // 8 seconds safety catch
        }
        return () => {
            if (timeout) clearTimeout(timeout);
        };
    }, [loading]);

    const handleLoadStart = useCallback(() => {
        setLoading(true);
    }, []);

    const finishLoading = useCallback(() => {
        setLoading(false);
        onLoadEnd?.();
    }, [onLoadEnd]);

    const handleLoad = useCallback(
        (e: any) => {
            onLoad?.(e);
            finishLoading();
        },
        [onLoad, finishLoading]
    );

    const handleError = useCallback(
        (e: any) => {
            if (fallbackSource && !hasTriedFallback.current) {
                hasTriedFallback.current = true;
                setCurrentSource(fallbackSource);
                // Don't stop loading yet, wait for fallback to load
            } else {
                finishLoading();
            }
            onError?.(e);
        },
        [fallbackSource, onError, finishLoading]
    );

    useEffect(() => {
        const next = normalizeSource(source);
        hasTriedFallback.current = false;
        setCurrentSource(next);

        // If there's no source, we shouldn't be in a loading state
        if (!next) {
            setLoading(false);
        } else {
            // Re-trigger loading state if source changed
            setLoading(true);
        }
    }, [source]);

    const shimmerContainerStyle = StyleSheet.flatten([
        StyleSheet.absoluteFillObject,
        shimmerStyle,
    ]) as ViewStyle;

    // Use a key derived from the source but only for remote images to avoid flicker on assets
    const imageKey = (currentSource && typeof currentSource === 'object' && 'uri' in currentSource) ? currentSource.uri : undefined;

    return (
        <View style={[styles.container, style]}>
            {currentSource ? (
                <Image
                    {...rest}
                    key={imageKey}
                    source={currentSource}
                    style={StyleSheet.absoluteFill}
                    onLoadStart={handleLoadStart}
                    onLoad={handleLoad}
                    onError={handleError}

                    onLoadEnd={finishLoading}
                />
            ) : fallbackSource ? (
                <Image
                    {...rest}
                    source={fallbackSource}
                    style={StyleSheet.absoluteFill}
                    onLoad={finishLoading}
                    onError={finishLoading}
                />
            ) : null}

            {loading && (
                <View style={shimmerContainerStyle} pointerEvents="none">
                    <Shimmer
                        width="100%"
                        height="100%"
                        borderRadius={0}
                        style={styles.shimmer}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
    },
    shimmer: {
        flex: 1,
    }
});
