<div  align="center">
<img src="https://cdn.bglad.io/img/meetup-api-client/meetup-api-client.logo.png" style="max-height:500px;max-width:500px;" height="100%" width="100%" alt="MAC: Meetup API Client"/>
</div>

[![npm: meetup-api-client](https://img.shields.io/npm/v/meetup-api-client.svg?color=blue)](https://npmjs.com/package/meetup-api-client)
# MAC: Meetup API Client
There doesn't appear to be any Node client library for [Meetup's GQL API](https://www.meetup.com/api/general/), so I made one for [organizing purposes](https://nyctnb.com), complete with Typescript types.

Feel free to [contribute](CONTRIBUTING.md) or [let me know](../../issues) if there's something you think can be added or improved!

## Installing
```bash
$ npm install meetup-api-client
```
You can also use equivalent `yarn`, `pnpm`, or `bower` commands to install.

## Getting Started

1. **Optional**: Set `MEETUP_API_SECRET` env variable
   * From testing, this only seems necessary for the `proNetwork` query, so this is not necessary to use the other queries in this library
   * This the **API Secret** value that must be requested and approved in the **[Meetup API admin console](https://www.meetup.com/api/oauth/list/)** first
   * Once this secret key is obtained, it can be set in the env in different ways, but in the [dev environment](CONTRIBUTING.md) for this repo, we use [dotenv](https://www.npmjs.com/package/dotenv)
2. Import (or `require`) the client functions:
```js
import { queryMeetup, queryEvent, queryGroup, queryHealthCheck, queryKeywordSearch, queryProNetwork } from 'meetup-api-client';
```
These are complete with typescript definitions, so you can see what data you can expect to get back from each.

## Contributing
If you're interested in contributing, look [here](CONTRIBUTING.md).  I'd love if others would like to help build this further into a polished, full-fledged client for the Meetup API.  It would help organizers with dev skills do something with all of their group and member data.  In the meantime, I'll continue building on it where I find time, and I think in its current state it meets a variety of use cases and taps into a lot of key data in a developer-friendly way.

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
