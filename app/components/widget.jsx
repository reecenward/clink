// WidgetGenerator.js
'use client'
import React, { useState } from 'react';

const WidgetGenerator = ({ videoId, autoplay, controls }) => {
  const [copied, setCopied] = useState(false);
  const [iframeVisible, setIframeVisible] = useState(true);

  const generateEmbedCode = () => {
    const options = [];
    if (autoplay) {
      options.push('autoplay=1');
    }
    if (!controls) {
      options.push('controls=0');
    }
    const optionsString = options.length > 0 ? '?' + options.join('&') : '';
    const embedCode = `<iframe src="https://yourbackend.com/embed/${videoId}${optionsString}" width="600" height="400" frameborder="0" allowfullscreen></iframe>`;
    return embedCode;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateEmbedCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const toggleIframeVisibility = () => {
    setIframeVisible(!iframeVisible);
  };

  return (
    <div>
      <h2>Embeddable Widget</h2>
      <textarea rows="4" cols="50" value={generateEmbedCode()} readOnly />
      <button onClick={copyToClipboard}>
        {copied ? 'Copied!' : 'Copy to Clipboard'}
      </button>
      <button onClick={toggleIframeVisibility}>
        {iframeVisible ? 'Hide iframe' : 'Show iframe'}
      </button>
      {iframeVisible && (
        <iframe width="300" height="500" src="http://localhost:3000/player/1" frameborder="0"></iframe>
      )}
    </div>
  );
};

export default WidgetGenerator;
