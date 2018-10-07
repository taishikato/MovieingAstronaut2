export default function(doc) {
  return new Promise(resolve => {
    doc.get().then(user => {
      resolve(user || false)
    })
  })
}
