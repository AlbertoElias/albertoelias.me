export async function iterateAfterWait (iterator, ms = 100) {
  return new Promise((resolve) => {
    function next () {
      const result = iterator.next()
      if (result.done) {
        resolve()
        return
      }

      setTimeout(next, ms)
    }

    next()
  })
}
