// Import necessary modules from 'react-native-reanimated'
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";

// Define a custom hook for implementing a parallax scroll effect
const useParelexScrollHook = ({ image_height }: { image_height: number }) => {
  // Create a reference to the scroll view using 'useAnimatedRef'
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  // Get the scroll offset using 'useScrollViewOffset'
  const scrollOffset = useScrollViewOffset(scrollRef);

  // Create an animated style for the image using 'useAnimatedStyle'
  const imageStyle = useAnimatedStyle(() => {

    return {
      // Apply transformations to the image based on the scroll offset
      transform: [
        {
          // Translate the image vertically based on the scroll offset
          translateY: interpolate(
            scrollOffset.value,
            [-image_height, 0, image_height],
            [-image_height / 2, 0, image_height * 0.78]
          ),
        },
        {
          // Scale the image horizontally based on the scroll offset
          scale: interpolate(
            scrollOffset.value,
            [-image_height, 0, image_height],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  // Return the image style, scroll view reference, and scroll offset
  return { imageStyle, scrollRef, scrollOffset };
};

// Export the custom hook
export default useParelexScrollHook;
