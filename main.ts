/// <reference path="./deploy.d.ts" />

let count = 0;

setInterval(() => {
  if (count > 100) {
    count = 0;
  } else {
    count += 1;
  }
}, 1000);

addEventListener("fetch", (event) => {
  const response = new Response(`Count: ${count}`, {
    headers: { "content-type": "text/plain" },
  });
  event.respondWith(response);
});
