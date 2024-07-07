import React from 'react';
import { WebView } from 'react-native-webview';
import { YStack, Text } from 'tamagui';

type VideoPlayerProps = {
  video: {
    key: string;
    name: string;
  };
};

const VideoPlayer = ({ video }: VideoPlayerProps) => {
  return (
    <YStack alignItems="center" justifyContent="center" padding={10}>
      <WebView
        style={{
          width: 360,
          height: 240,
          borderRadius: 5,
        }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        source={{ uri: `https://www.youtube.com/embed/${video.key}` }}
      />
    </YStack>
  );
};

export default VideoPlayer;
