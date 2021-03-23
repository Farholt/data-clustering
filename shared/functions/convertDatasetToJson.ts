let csvToJson = require('convert-csv-to-json')

/**
 * Builds a json from blogdata.csv
 */
const jsonResult = () => {
  const rawJson = csvToJson.getJsonFromCsv('./shared/data/blogdata.csv')

  /* New Json Array */
  let arr: any = [
    {
      blogs: [],
    },
  ]

  for (let i = 0; i < rawJson.length; i++) {
    /* For storing total word count */
    let tmp = []

    /* Get total word count */
    for (var propName in rawJson[i]) {
      if (rawJson[i].hasOwnProperty(propName)) {
        let v = parseInt(rawJson[i][propName]) // parse string to int
        if (v >= 0) tmp.push(v) // get rid of blog name from word list
      }
    }

    /* Store blog data in seperate objects */
    arr[0]['blogs'].push({
      name: rawJson[i]['Blog'],
      wordCount: tmp,
    })
  }

  return arr
}

export default jsonResult
