export namespace Words {
  export const fromLine = (line: string): string[] => {
    return line
      .toLowerCase()
      .replace(/[^0-9a-zA-ZäöüÄÖÜß]+/g, ' ')
      .trim()
      .split(' ');
  };
}
