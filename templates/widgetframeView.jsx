import React, { useState } from 'react';
export default function WidgetframeDrawer({ _iframe }) {
  function WidgetFrameLoader({ src, title }) {
    const [isLoading, setIsLoading] = useState(true);

    const handleIframeLoad = () => {
      setIsLoading(false);
    };

    return (
      <div className='widgetframe__iframe-container'>
        {isLoading && (
          <div className='loading'>
            <div className='loading__inner'></div>
          </div>
        )}
        <iframe src={src} title={title} className='w-full h-full' onLoad={handleIframeLoad} style={{ display: isLoading ? 'none' : 'block' }} />
      </div>
    );
  }
  return <WidgetFrameLoader src={_iframe.src} title={_iframe.title} />;
}
