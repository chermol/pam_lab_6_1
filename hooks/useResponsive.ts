import { useState, useEffect } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Breakpoints for responsive design
export const BREAKPOINTS = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
  wide: 1440,
};

export type ScreenSize = 'mobile' | 'tablet' | 'desktop' | 'wide';

export function useResponsive() {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  const getScreenSize = (width: number): ScreenSize => {
    if (width >= BREAKPOINTS.wide) return 'wide';
    if (width >= BREAKPOINTS.desktop) return 'desktop';
    if (width >= BREAKPOINTS.tablet) return 'tablet';
    return 'mobile';
  };

  const screenSize = getScreenSize(dimensions.width);

  return {
    width: dimensions.width,
    height: dimensions.height,
    screenSize,
    isMobile: screenSize === 'mobile',
    isTablet: screenSize === 'tablet',
    isDesktop: screenSize === 'desktop' || screenSize === 'wide',
    isWide: screenSize === 'wide',
  };
}
