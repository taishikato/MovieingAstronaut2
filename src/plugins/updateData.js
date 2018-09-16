export default function updateData(ref, data) {
  return new Promise((resolve, reject) => {
    ref.update(data).then((result) => {
      resolve(result);
    }).catch((err) => {
      reject(false);
    });
  })
}