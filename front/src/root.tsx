import { component$ } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet } from "@builder.io/qwik-city";
import { RouterHead } from "~/components/router-head/router-head";

import "./index.css";

export default component$(() => {
  return (
    <QwikCityProvider>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=JetBrains+Mono:wght@100..800&display=swap"
          rel="stylesheet"
        />
        <RouterHead />
        <script dangerouslySetInnerHTML={`
          (function(){
            var m=document.cookie.match(/(?:^|;)\\s*coders-theme=([^;]*)/);
            if(m&&m[1]==='dark'){document.documentElement.classList.add('dark')}
            else{document.documentElement.classList.remove('dark')}
          })();
        `} />
      </head>
      <body class="bg-bg-base text-fg-primary antialiased">
        <RouterOutlet />
      </body>
    </QwikCityProvider>
  );
});
