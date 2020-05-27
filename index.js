// https://github.com/moment/moment/issues/2608#issuecomment-170739817
import moment from 'moment/src/moment';

const guessFormat = () => {
	return 'Work in progress...';
};

// What if we attach directly on moment?
// Like https://github.com/moment/moment-timezone/blob/063a95053afdfca0cbe8fb035271205d5f0ac417/moment-timezone.js#L601
moment.guessFormat = guessFormat;

export default moment;
