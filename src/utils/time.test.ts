import { test } from 'node:test'
import assert from 'node:assert/strict'
import { getFormat, getFormattedData } from './time.ts'

test('getFormat falls back to the default when given an invalid format', () => {
	assert.equal(getFormat('not-a-format'), 'ymdhis')
	assert.equal(getFormat(undefined), 'ymdhis')
})

test('getFormat accepts any ordered subset of the known tokens', () => {
	assert.equal(getFormat('dhi'), 'dhi')
	assert.equal(getFormat('y'), 'y')
})

test('getFormattedData breaks seconds down into the requested units', () => {
	// 1 year, 2 days, 3 hours, 4 minutes, 5 seconds
	const seconds = 31536000 + 2 * 86400 + 3 * 3600 + 4 * 60 + 5

	assert.deepEqual(getFormattedData(seconds, 'ymdhis'), {
		years: 1,
		months: 0,
		days: 2,
		hours: 3,
		minutes: 4,
		seconds: 5
	})
})

test('getFormattedData only computes the units present in the format', () => {
	const seconds = 3 * 3600 + 30 * 60

	assert.deepEqual(getFormattedData(seconds, 'hi'), {
		hours: 3,
		minutes: 30
	})
})
