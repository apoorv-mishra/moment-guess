<h1 align="center">Welcome to moment-guess 👋<br> <img src="./logo.png" /></h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.3-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/apoorv-mishra/moment-guess#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/apoorv-mishra/moment-guess/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/apoorv-mishra/moment-guess/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/apoorv-mishra/moment-guess" />
  </a>
</p>

> A utility package for guessing date's format

## :package: Installation

```sh
npm install moment-guess
```

## 👨‍💻 Usage
```javascript
const guessFormat = require('moment-guess');

// ISO 8601 compliant dates
console.log(guessFormat('2020-10-10')); // YYYY-MM-DD
console.log(guessFormat('2013-02-08T09:30:26')); // YYYY-MM-DDTHH:mm:ss
console.log(guessFormat('2013-02-08T09:30:26+07:00')); // YYYY-MM-DDTHH:mm:ssZ

// RFC 2822 compliant dates
console.log(guessFormat('6 Mar 17 21:22 UT')); // D MMM YY HH:mm ZZ
console.log(guessFormat('Mon, 06 Mar 2017 21:22:23 +0000')); // ddd, DD MMM YYYY HH:mm:ss ZZ
```

## :hammer: Run tests

```sh
npm run test
```

## :man: Author

**Apoorv Mishra**

* Github: [@apoorv-mishra](https://github.com/apoorv-mishra)
* LinkedIn: [Apoorv Mishra](https://www.linkedin.com/in/apoorv-mishra-76a06249/)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/apoorv-mishra/moment-guess/issues). 

## Show your support

Give a ⭐️ if this project helped you!

<a href="https://www.patreon.com/apoorvmishra">
  <img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>

## 📝 License

Copyright © 2020 [Apoorv Mishra](https://github.com/apoorv-mishra).<br />
This project is [MIT](https://github.com/apoorv-mishra/moment-guess/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
