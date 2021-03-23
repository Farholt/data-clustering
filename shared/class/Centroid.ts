/**
 * Centroid class
 */
export class Centroid {
  wordCount: any = {}
  assignments: any = []

  setWordCount(id: number, count: number) {
    this.wordCount[id] = count
  }

  assign(blog) {
    this.assignments.push(blog)
  }

  clearAssignments() {
    this.assignments = []
  }
}
