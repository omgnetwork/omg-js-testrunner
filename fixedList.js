
class FixedSizeList {
  constructor (max) {
    this.max = max
    this.items = []
  }

  add (item) {
    if (this.items.length === this.max) {
      // Discard the oldest item
      this.items.shift()
    }
    this.items.push(item)
  }

  find (id) {
    return this.items.find(item => item.id === id)
  }

  print () {
    this.items.forEach(item => console.log(JSON.stringify(item)))
  }
}

module.exports = FixedSizeList
