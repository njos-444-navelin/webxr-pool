import { describe, expect, it } from 'vitest';
import { SIM_VERSION } from './index.js';

describe('sim package', () => {
	it('exports a version', () => {
		expect(SIM_VERSION).toBe(0);
	});
});
