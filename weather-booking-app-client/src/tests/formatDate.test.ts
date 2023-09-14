// formatDate.test.js
import { expect, test } from 'vitest'
import formatDate from '../utility/formatDate'

test('shouldFormatDate', () => {
  expect(formatDate("2023-09-06")).toBe("Wednesday, 06 September")
})