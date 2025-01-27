# Meetup API Client
There doesn't appear to be any Node client library for [Meetup's GQL API](https://www.meetup.com/api/general/), so I made one for [organizing purposes](https://nyctnb.com), complete with Typescript types.

Feel free to [contribute](CONTRIBUTING.md) or [let me know](../../issues) if there's something you think can be added or improved!

## Installing

### Package manager

Using npm:

```bash
$ npm install meetup-api-client
```

Using yarn:

```bash
$ yarn add meetup-api-client
```

Using pnpm:

```bash
$ pnpm add meetup-api-client
```

Using bower:

```bash
$ bower install meetup-api-client
```

Once the package is installed, you can import the library using `import` or `require` approach:

```js
import { queryMeetup, queryEvent, queryGroup, queryHealthCheck, queryKeywordSearch, queryProNetwork } from 'meetup-api-client';
```

## Getting Started

1. **Optional**: Set `MEETUP_API_SECRET` env variable
   * From testing, this only seems necessary for the `proNetwork` query, so this is not necessary to use the other queries in this library
   * This the **API Secret** value that must be requested and approved in the **[Meetup API admin console](https://www.meetup.com/api/oauth/list/)** first
   * Once this secret key is obtained, it can be set in the env in different ways, but in the [dev environment](CONTRIBUTING.md) for this repo, we use [dotenv](https://www.npmjs.com/package/dotenv)
2. Import the client functions like so:
```js
import { queryMeetup, queryEvent, queryGroup, queryHealthCheck, queryKeywordSearch, queryProNetwork } from 'meetup-api-client';
```

## Contributing
If you're interested in contributing, look [here](CONTRIBUTING.md).  I'd love for others to help build this up further into a polished, full-fledged client for the Meetup API.  It would help organizers with dev skills do something with all of their group and member data.

## Meetup API: Background
The query system is based on Meetup API's [GQL schema](https://www.meetup.com/api/schema/#graphQl-schema).  It uses an axios version of this query:

```bash
query='query { self { id name } }'
curl -X POST https://api.meetup.com/gql \
  -H 'Authorization: Bearer {YOUR_TOKEN}' \
  -H 'Content-Type: application/json' \
  -d @- <<EOF
    {"query": "$query"}
```

Which comes out to basically this:
```typescript
const axiosClient = axios.create({
  baseURL: 'https://api.meetup.com/gql',
  headers: {
    'Authorization': `Bearer ${process.env.MEETUP_API_TOKEN}`
  }
});

export const queryMeetup = (gqlQuery: string): AxiosPromise => {
  return axiosClient.post('', {'query': gqlQuery});
}
```
