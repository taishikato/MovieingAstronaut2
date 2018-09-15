export default function saveData(ref, data) {
  return new Promise((resolve, reject) => {
    ref.set(data).then((result) => {
      resolve(result);
    }).catch((err) => {
      reject(false);
    });
  })
}