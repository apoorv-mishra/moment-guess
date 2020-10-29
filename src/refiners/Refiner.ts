import {
	IRefiner,
	ParsedResult,
} from '../types';

class Refiner implements IRefiner {
	readonly name: string;
	refine: (parsedResults: Array<ParsedResult>) => Array<ParsedResult>;

	constructor(name, refine) {
		this.name = name;
		this.refine = refine;
	}
}

export default Refiner;
