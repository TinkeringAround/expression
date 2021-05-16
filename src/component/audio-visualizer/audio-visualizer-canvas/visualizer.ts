import { theme } from '../../../theme';

/**
 * Draws an buffer to an canvas
 * @param {HTMLCanvasElement} canvas
 * @param {number[]} buffer of data
 */
export const drawAudio = (canvas: HTMLCanvasElement, buffer: number[]) => {
  const { offsetWidth, offsetHeight } = canvas;

  const dpr = window.devicePixelRatio || 1;
  const padding = 50;
  canvas.width = offsetWidth * dpr;
  canvas.height = (offsetHeight + padding * 2) * dpr;
  const canvas2dContext = canvas.getContext('2d');

  if (canvas2dContext) {
    canvas2dContext.scale(dpr, dpr);
    // set Y = 0 to be in the middle of the canvas
    canvas2dContext.translate(0, offsetHeight / 2 + padding);
    canvas2dContext.imageSmoothingQuality = 'high';

    // draw the line segments
    const width = offsetWidth / buffer.length;
    for (let i = 0; i < buffer.length; i++) {
      const x = width * i;
      let height = buffer[i] * offsetHeight - padding;
      if (height < 0) height = 0;
      else if (height > offsetHeight / 2) height = offsetHeight / 2;

      drawLineSegment(canvas2dContext, x, height, width, !!((i + 1) % 2));
    }
  }
};

/**
 * A utility function for drawing our line segments
 * @param {AudioContext} ctx the audio context
 * @param {number} x  the x coordinate of the beginning of the line segment
 * @param {number} height the desired height of the line segment
 * @param {number} width the desired width of the line segment
 * @param {boolean} isEven whether or not the segmented is even-numbered
 */
const drawLineSegment = (
  ctx: CanvasRenderingContext2D,
  x: number,
  height: number,
  width: number,
  isEven: boolean
) => {
  ctx.lineWidth = 3;
  ctx.strokeStyle = theme.yellow;
  ctx.beginPath();

  // Draw Line
  height = isEven ? height : -height;
  ctx.moveTo(x, 0);
  ctx.lineTo(x, height);
  ctx.arc(x + width / 2, height, width / 2, Math.PI, 0, isEven);
  ctx.lineTo(x + width, 0);

  // Stroke Line
  ctx.stroke();
};
