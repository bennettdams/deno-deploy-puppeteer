/// <reference path="./deploy.d.ts" />

let count2 = 0;

setInterval(() => {
  if (count2 > 100) {
    count2 = 0;
  } else {
    count2 += 1;
  }
}, 1000);

addEventListener("fetch", (event) => {
  const response = new Response(`Count 2: ${count2}`, {
    headers: { "content-type": "text/plain" },
  });
  event.respondWith(response);
});
