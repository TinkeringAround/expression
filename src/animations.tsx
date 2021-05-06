export const fadeIn = () => `
@keyframes fadeIn {
  0% {opacity: 0;}
  100% {opacity: 1;}
}`;

export const fromTop = (start: string, end: string) => `
@keyframes fromTop {
  0% {top: ${start};}
  100% {top: ${end};}
}`;

export const fromLeft = (start: string, end: string) => `
@keyframes fromLeft {
  0% {left: ${start};}
  100% {left: ${end};}
}`;
