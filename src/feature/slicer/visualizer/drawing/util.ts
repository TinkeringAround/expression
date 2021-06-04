/**
 * Calculates polyline points from sampled audio data
 * @param {number[]} samples one sampled channel of an audio file
 * @param {number} maxAmplitude the maximum amplitude of the sampled channel
 * @param {number} stepWidth the space between data points
 * @param {number} maxY max height the max amplitude is allowed to be
 * @param {number} paddingY padding the max amplitude must have
 * @return {string} points in 'x,y' format for a svg rect
 */
export const calculateDrawingPoints: (
  samples: number[],
  maxAmplitude: number,
  stepWidth: number,
  maxY: number,
  paddingY: number
) => string = (samples, maxAmplitude, stepWidth, maxY, paddingY) => {
  let points = '';

  // multiplication factor to display the curve always with max possible amplitude
  const factor = (maxY - paddingY) / maxAmplitude;

  // iterate over sampled audio data slice
  for (let i = 0; i < samples.length; i++) {
    const x = stepWidth * i;
    // -1 because svg coordinate system starts with 0,0 in top left corner
    const y = -1 * samples[i] * factor + maxY;

    // Add next line point
    points += ` ${x},${y}`;
  }

  return points;
};
