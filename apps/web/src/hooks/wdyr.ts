import React from 'react';

if (process.env.NODE_ENV === 'development') {
  import('@welldone-software/why-did-you-render').then((module) => {
    return module.default(React, {
      trackAllPureComponents: true,
      onlyLogs: true,
      titleColor: 'green',
    });
  });
}
