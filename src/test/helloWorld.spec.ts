import { describe, expect, it } from 'vitest';

describe('Hello World Test Suite', () => {
    it('should return hello world message', () => {
        const message = 'Hello World';
        expect(message).toBe('Hello World');
    });

    it('should have correct length', () => {
        const message = 'Hello World';
        expect(message).toHaveLength(11);
    });

    it('should contain Hello', () => {
        const message = 'Hello World';
        expect(message).toContain('Hello');
    });

    it('should be a string', () => {
        const message = 'Hello World';
        expect(typeof message).toBe('string');
    });
});