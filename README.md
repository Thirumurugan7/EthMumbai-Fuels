//To install the Fuel toolchain, you can use the fuelup-init script. 
curl https://install.fuel.network | sh


//If you already have fuelup installed, run the commands below to make sure you are on the most up-to-date toolchain.
fuelup self update
fuelup update
fuelup default latest

//Installing the Fullstack Fuel project.
pnpm create fuels

mkdir fuel-project


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-fuels`](https://github.com/fuellabs/fuels-ts).

## Getting Started

1. Start the Fuel development server. This server will start a local Fuel node and provide hot-reloading for your smart contracts.

```bash
npm run fuels:dev

# or
npx fuels dev
```

1. Start the Next.js development server.

```bash
npm run dev
```

## Learn More

- [Fuel TS SDK docs](https://fuellabs.github.io/fuels-ts/)
- [Fuel Docs Portal](https://docs.fuel.network/)
