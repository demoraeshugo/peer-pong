const deviceOrientationData = (event) => {
  return {
    type: event.type,
    absolute: event.absolute,
    alpha: event.alpha,
    beta: event.beta,
    gamma: event.gamma
  };
};

const deviceMotionData = (event) => {
  return {
    type: event.type,
    acceleration: event.acceleration,
    accelerationIncludingGravity: event.accelerationIncludingGravity,
    rotationRate: event.rotationRate,
    interval: event.interval
  };
};
export { deviceOrientationData, deviceMotionData };
