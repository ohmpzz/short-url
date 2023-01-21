import { customAlphabet } from 'nanoid';

export function GenerateCode(length: number = 6) {
  return customAlphabet(
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
    length
  )();
}
