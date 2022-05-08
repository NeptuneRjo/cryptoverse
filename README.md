## Cyptoverse

Cryptoverse is a fully responsive, dynamic web application that uses API's to create a real-time database of Cryptocurrencies.

## Demo Link:

Access my site at [Demo Link](https://neptunerjo.github.io/cryptoverse/)

## Table of Content:

- [Screenshots](#screenshots)
- [Technologies](#technologies)
- [Setup](#setup)
- [Approach](#approach)

## Screenshots

![Desktop Home Page](screenshots/desktop-homepage.png)
![Coin Details](screenshots/desktop-coindetails.png)

## Technologies

Built with `React`, `React-Redux`, `CSS3`, `Millify`, and `APIs`. Tested with `Jest`, `React-Testing-Library`, and `cypress`.

## Setup

- Download or clone the repository
- Run `npm install`
- Run `npm start` to view a local version on `http://localhost:3000/`

### To run the Cypress Suite

- Run `npm install` if you havent already
- Run `npm run cypress:open` to open the terminal
- Choose a test file to run and double click to run it in the browser

## Approach

In order to create a dynamic website that relies entirely on APIs for its data,
`Redux` was used to store the global state. `React-Router` made it easy to create unique pages for
each coin.
