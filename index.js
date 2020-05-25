// https://github.com/moment/moment/issues/2608#issuecomment-170739817
import moment from 'moment/src/moment';

const guessFormat = () => {
	return 'Work in progress...';
};

if (!moment.fn.guessFormat) {
	// Moment's prototype is exposed by `moment.fn`
	// We'll be adding our custom functions to `moment.fn`
	// as suggested in https://momentjs.com/docs/#/parsing/
	moment.fn.guessFormat = guessFormat;
}

export default moment;
