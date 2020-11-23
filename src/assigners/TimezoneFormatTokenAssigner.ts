import Token from '../parsers/Token';
import {
	IAssigner,
} from '../types';

class TimezoneFormatTokenAssigner implements IAssigner {
	public readonly name: string;
	public readonly type: string;
	public readonly format?: string;

	private _map: Map<RegExp, string>;

	constructor(name: string, type: string, format?: string) {
		this.name = name;
		this.type = type;
		this.format = format;
		this._map = new Map();

		const abbreviatedTimezoneRegex = new RegExp(
			'UT|'

			// https://www.timeanddate.com/time/zones/africa
			+ 'CAT|CET|CVT|EAT|EET|GMT|MUT|RET|SAST|SCT|WAST|WAT|WEST|WET|WST|WT|'

			// https://www.timeanddate.com/time/zones/asia
			+ 'ADT|AFT|ALMT|AMST|AMT|ANAST|ANAT|AQTT|AST|AZST|AZT|BNT|BST|BTT|CHOST|CHOT|'
			+ 'CST|EEST|EET|GET|GST|HKT|HOVST|HOVT|ICT|IDT|IRDT|IRKST|IRKT|IST|JST|KGT|KRAST|'
			+ 'KRAT|KST|MAGST|MAGT|MMT|MSK|MVT|NOVST|NOVT|NPT|OMSST|OMST|ORAT|PETST|PETT|PHT|'
			+ 'PKT|PYT|QYZT|SAKT|SGT|SRET|TJT|TLT|TMT|TRT|ULAST|ULAT|UZT|VLAST|VLAT|WIB|WIT|'
			+ 'YAKST|YAKT|YEKST|YEKT|'

			// https://www.timeanddate.com/time/zones/antarctica
			+ 'ART|CAST|CEST|CLST|CLT|DAVT|DDUT|GMT|MAWT|NZDT|NZST|ROTT|SYOT|VOST|'

			// https://www.timeanddate.com/time/zones/atlantic
			+ 'ADT|AST|AT|AZOST|AZOT|'

			// https://www.timeanddate.com/time/zones/au
			+ 'ACDT|ACST|ACT|ACWST|AEDT|AEST|AET|AWDT|AWST|CXT|LHDT|LHST|NFDT|NFT|'

			// https://www.timeanddate.com/time/zones/caribbean
			+ 'AST|AT|CDT|CIDST|CIST|CST|EDT|EST|ET|'

			// https://www.timeanddate.com/time/zones/ca
			+ 'CST|CT|EST|ET|'

			// https://www.timeanddate.com/time/zones/eu
			+ 'BST|CEST|CET|EEST|EET|FET|GET|GMT|IST|KUYT|MSD|MSK|SAMT|TRT|WEST|WET|'

			// https://www.timeanddate.com/time/zones/indian-ocean
			+ 'CCT|EAT|IOT|TFT|'

			// https://www.timeanddate.com/time/zones/na
			+ 'ADT|AKDT|AKST|AST|AT|CDT|CST|CT|EDT|EGST|EGT|ET|GMT|HDT|HST|MDT|MST|MT|NDT|NST|PDT|PMDT|PMST|PST|PT|WGST|WGT|'

			// https://www.timeanddate.com/time/zones/pacific
			+ 'AoE|BST|CHADT|CHAST|CHUT|CKT|ChST|EASST|EAST|FJST|FJT|GALT|GAMT|GILT|HST|KOST|LINT|MART|'
			+ 'MHT|NCT|NRT|NUT|NZDT|NZST|PGT|PHOT|PONT|PST|PWT|SBT|SST|TAHT|TKT|TOST|TOT|TVT|VUT|WAKT|WFT|WST|YAPT|'

			// https://www.timeanddate.com/time/zones/sa
			+ 'ACT|AMST|AMT|ART|BOT|BRST|BRT|CLST|CLT|COT|ECT|FKST|FKT|FNT|GFT|GST|GYT|PET|PYST|PYT|SRT|UYST|UYT|VET|WARST'
		);

		if (!format || format === 'default') {
			this._map.set(/[+-]\d{2}(?::\d{2})?/, 'Z');
			this._map.set(/[+-]\d{4}/, 'ZZ');

			// Treat these as escaped text
			this._map.set(/Z/, '[Z]');
			this._map.set(/z/, '[z]');


			this._map.set(abbreviatedTimezoneRegex, 'z');
		} else {
			this._map.set(/[+-]\d{2}(?::\d{2})?/, '%:z');
			this._map.set(/[+-]\d{4}/, '%z');

			// Treat these as escaped text
			this._map.set(/Z/, 'Z');
			this._map.set(/z/, 'z');

			this._map.set(abbreviatedTimezoneRegex, '%Z');
		}
	}

	private _testTokenType(token: Token): boolean {
		return token.type === this.type;
	}

	public assign(token: Token): void {
		this._map.forEach((formatToken, pattern) => {
			if (this._testTokenType(token) && pattern.test(token.value)) {
				token.format = formatToken;
			}
		});
	}
}

export default TimezoneFormatTokenAssigner;
