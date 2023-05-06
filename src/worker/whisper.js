importScripts('https://www.unpkg.com/@xenova/transformers/dist/transformers.min.js')
// src
self.addEventListener('message', async(event) => {
  console.log(pipeline())
  console.log(event.data)
})