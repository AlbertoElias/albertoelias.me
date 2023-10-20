function checkFlick (startTouchY, endTouchY, startTime, endTime) {
  const distanceY = endTouchY - startTouchY
  const elapsedTime = endTime - startTime

  // Check for a minimum distance in a short time to consider it a flick
  const thresholdTime = 200 // milliseconds
  const thresholdDistance = 50 // pixels

  if (elapsedTime <= thresholdTime) {
    if (Math.abs(distanceY) > thresholdDistance) {
      if (distanceY > 0) {
        return 1
      } else {
        return -1
      }
    }
  }
  return 0
}

export { checkFlick }
