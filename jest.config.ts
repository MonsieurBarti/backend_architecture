import type { Config } from 'jest';
import { defaults } from 'jest-config';

const config: Config = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
	transform: {
		'^.+\\.tsx?$': [
			'ts-jest',
			{
				tsconfig: 'tsconfig.json',
			},
		],
	},
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
	},
	testMatch: ['**/*.spec.ts'],
	collectCoverage: true,
	collectCoverageFrom: [
		'src/**/*.ts',
		'!src/**/*.d.ts',
		'!src/**/*.builder.ts', // Exclude builders from coverage
		'!src/server/db/**/*', // Exclude database schema
	],
	coverageDirectory: 'coverage',
	coverageReporters: ['text', 'lcov'],
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default config;
