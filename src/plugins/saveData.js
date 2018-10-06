/**
 * documentにデータを保存する
 * @param {*} doc Firestoreのdocument ref
 * @param {Object} data 保存データ
 */

export default function saveData(doc, data) {
  return new Promise((resolve, reject) => {
    doc
      .set(data)
      .then(result => {
        resolve(result)
      })
      .catch(err => {
        console.log(err)
        reject(false)
      })
  })
}
