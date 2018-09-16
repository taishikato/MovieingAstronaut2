export default function saveData(doc, data) {
  return new Promise((resolve, reject) => {
    doc.set(data).then((result) => {
      resolve(result);
    }).catch((err) => {
      reject(false);
    });
  })
}