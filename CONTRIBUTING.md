## Meetup API Client - Contributing
See below to get up and running with adding onto and developing the Metup API Client

## Setup
1. Apply for and get an approved [Meetup API Client secret](https://www.meetup.com/api/oauth/list/)
1. [Install nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)
1. `nvm install`
1. `npm install -g yarn`
1. `yarn install`
2. Set `MEETUP_API_SECRET` env variable - the **Secret** value **[here](https://www.meetup.com/api/oauth/list/)** (needs an approved key first - see Step 1):
      1. Copy `cp .env.example .env`
      2. Add `MEETUP_API_SECRET` value to .env

## Quick Start
1. `nvm use`
2. `yarn install`
3. `yarn dev`

## Contributing
The [src/dev.ts](src/dev.ts) file can be run with nodemon via `npm run dev` or `yarn dev`, and currently contains sample uses of the GQL query [client functions](src/meetup/client.ts) for quick experimentation.  Feel free to look over and expand upon the [Typescript types](src/meetup/index.d.ts), [GQL queries and fragments](src/meetup/queries.ts), or both.  It can 

I'm also open to other ideas on how to expand on this - this currently stands primarily as a library of client functions to make use of the Meetup API, but I could see new features and improvements (e.g. storage, caching, retry logic, error handling, nicer logging) being built in or adjacent to it.
