import Token from './parsers/Token';

export type Date = string;
export type Format = string;

export interface ParsedResult {
	tokens: Array<Token>;
	index: number;
	parser: string;
}
