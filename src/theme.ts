export const theme = {
  white: '#FFFFFF',
  black: '#373737',
  darkGrey: '#5e5e5e',
  grey: '#C8C8C8',
  light: '#F0F0F0',

  blue: '#3278E1',
  darkBlue: '#264653',
  green: '#59C9A5',
  red: '#E63946',
  yellow: '#ffd166',
  orange: '#f4a261',

  hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : null;
  },

  hexToRgbA(hex: string, alpha: string = '1') {
    let c: any;

    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split('');

      if (c.length === 3) c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      c = '0x' + c.join('');

      return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + `,${alpha})`;
    }

    throw new Error('Bad Hex');
  }
};
