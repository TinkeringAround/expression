import { Features } from '../../features';
import { v4 } from 'uuid';
import { Snapshot } from '../../store/types';

/**
 * Placeholder Type for any void Function
 * @returns {void}
 */
export type anyFunction = (...anyThing: any) => void;

/**
 * Converts bytes size to mb size with 'MB' extension
 * @param {number} bytes count
 * @returns {string} the size in mb as string with 'MB' extension
 */
export const toMB = (bytes: number): string => `${(bytes / (1024 * 1024)).toFixed(2)} MB`;

/**
 * Converts a floating point duration value to fixed string with unit 's' seconds
 * @param {number} duration the float point duration in seconds
 * @param {number} fraction the fraction as digit count after comma
 * @returns {string} the fixed duration as string with unit 's'
 */
export const asSeconds = (duration: number, fraction: number = 0): string => {
  let seconds = duration.toFixed(fraction);
  if (fraction === 1 && seconds.charAt(seconds.length - 1) === '0') seconds = duration.toFixed(0);

  return `${seconds}s`;
};

/**
 * Maps the Feature Path to a readable feature name
 * @param {string} path the feature path
 * @returns {string} the readable feature name
 */
export const featureToNameByPath = (path: string): string => {
  if (path === '/') return '';
  if (path === Features.DASHBOARD) return 'Kadenz';
  return `${path[1].toUpperCase()}${path.slice(2)}`.charAt(0);
};

/**
 * Maps one number range to another
 * @param {number} value the value in first range
 * @param {number} x1 the min value of first range
 * @param {number} y1 the max value of first range
 * @param {number} x2 the min value of second range
 * @param {number} y2 the max value of second range
 * @returns {number} the value of first range mapped to second range
 */
export const map = (value: number, x1: number, y1: number, x2: number, y2: number) =>
  ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;

/**
 * Delay helper function
 * @param {function} callback callback function
 * @param {number} time
 * @return {number} the handler
 */
export const delay = (callback: anyFunction, time: number) => setTimeout(callback, time);

/**
 * Number Mapping Helper to always have a positive Valid Number
 * value < 0 || value === Infinity -> return 0, else value
 * @param {number} value the number
 * @return {number} the valid mapped number
 */
export const toValidFloat = (value: number): number => {
  if (value < 0) return 0;
  if (value === Infinity) return 0;
  return parseFloat(value.toFixed(2));
};

/**
 * Float Value Comparing Helper Function
 * @param {number} float1
 * @param {number} float2
 * @return {boolean} the comparison result
 */
export const floatsDiffer = (float1: number, float2: number) =>
  toValidFloat(float1) !== toValidFloat(float2);

/**
 * Generate unique Id Helper Function
 * @return {string} the new id
 */
export const generateId = (): string => v4().toString();

/**
 * Creates a Snapshot of a provided value
 * excluding changes and id
 * @param value
 */
export const toSnapshot = <T>(value: T): Snapshot<T> => {
  return JSON.parse(JSON.stringify({ ...value, id: undefined, changes: undefined }));
};
