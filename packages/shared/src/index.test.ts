import { describe, expect, it } from 'vitest';
import { SHARED_VERSION } from './index.js';

describe('shared package', () => {
	it('exports a version', () => {
		expect(SHARED_VERSION).toBe(0);
	});
});
