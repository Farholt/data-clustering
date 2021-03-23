import { NextApiRequest, NextApiResponse } from 'next'
import jsonResult from '../../shared/functions/convertDatasetToJson'

import { Centroid } from '../../shared/class/Centroid'
import pearson from '../../shared/functions/pearson'

const random = (from: number) => (to: number) =>
  from + Math.random() * (to - from)

const kMean = (req: NextApiRequest, res: NextApiResponse) => {
  const CLUSTERS: number = 5 // set max cluster
  const MAX_ITERATIONS: number = 50 // set max iterations
  const n: number = 706 // set n of words
  const blogs = jsonResult()[0].blogs // the blogs

  const centroids: Array<any> = [] // empty array for coming Centroid objects

  /* Generate random centroids */
  for (let i = 0; i < CLUSTERS; i++) {
    centroids[i] = new Centroid() // for every cluster, add centroid

    /* ...Then loop MAX_ITERATIONS of times */
    for (let j = 0; j < n; j++) {
      centroids[i].setWordCount(j, random(0)(n)) // random min[j] (0) to max[j] (706)
    }
  }

  /* Iterate specified amount of time */
  for (let i = 0; i < MAX_ITERATIONS; i++) {
    centroids.forEach((e) => e.clearAssignments()) // clear assignments for every centroid

    /* This assigns each blog to closest centroid */
    for (let j = 0; j < blogs.length; j++) {
      let distance: number = Infinity // infinite value
      let best: any // best centroid

      /* This finds closest centroid */
      for (let k = 0; k < centroids.length; k++) {
        const cDist: number = pearson(centroids[k], blogs[j])
        if (cDist < distance) {
          best = centroids[k]
          distance = cDist
        }
      }
      best.assign(blogs[j]) // assign blog to centroid
    }

    /* This for loop re calculates the center for each centroid */
    for (let y = 0; y < centroids.length; y++) {
      /* This for loop finds the average count for each word */
      for (let l = 0; l < n; l++) {
        var avg: number = 0
        /* Iterate every blog assigned to this centroid */
        for (let j = 0; j < centroids[y]['assignments'].length; j++) {
          avg += centroids[y]['assignments'][j].wordCount[l]
        }
        avg /= centroids[y]['assignments'].length
        centroids[y].setWordCount(l, avg) // update word count for the centroid
      }
    }
  }

  let arr = centroids.map((x) => x.assignments.map((y: any) => y.name))
  res.json(JSON.stringify(arr, null, 2))
}

export default kMean
