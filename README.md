# moment-guess
A utility package for guessing date's format

### Setup Instructions
1. Clone the repository
2. `cd moment-guess`
3. `npm run build`

### Usage
1. `cd moment-guess && mkdir quick-test`
2. `cd quick-test && touch quick-test.js`
3. In `quick-test.js`, add,
```javascript
const guessFormat = require('../dist/bundle.js');

console.log(guessFormat('2020-06-23T00:20:49+05:30')); //YYYY-MM-DDTHH:mm:ssZ
console.log(guessFormat('2020-10-10')); //YYYY-MM-DD
```
4. `node quick-test.js`
