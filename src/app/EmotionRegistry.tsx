'use client';

import { useServerInsertedHTML } from 'next/navigation';
import React, { useState } from 'react';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '@/createEmotionCache';

export default function EmotionRegistry({ children }: { children: React.ReactNode }) {
  const [emotionCache] = useState(() => createEmotionCache());

  useServerInsertedHTML(() => {
    return (
      <style
        data-emotion={`${emotionCache.key} ${Object.keys(emotionCache.inserted).join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: Object.values(emotionCache.inserted).join(' '),
        }}
      />
    );
  });

  return <CacheProvider value={emotionCache}>{children}</CacheProvider>;
}