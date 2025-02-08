import 'dotenv/config';
// import { fileURLToPath } from "url";

import { gqlResponseDebugLog, queryEvent, queryKeywordSearch, queryHealthCheck, queryGroup, queryProNetwork } from './meetup/client';

function main() {
  // HEALTH CHECK
  queryHealthCheck()
    .then(gqlResponseDebugLog)

  // EVENT
  queryEvent("305391431")
    .then(gqlResponseDebugLog)

  // GROUP
  queryGroup('nycaiu')
    .then(gqlResponseDebugLog)

  // Uncomment below to test these:

  // // KEYWORD SEARCH
  // queryKeywordSearch("EVENTS", "tech events")
  // .then(gqlResponseDebugLog)

  // // PRO NETWORK
  // queryProNetwork("some ID")
  // .then(gqlResponseDebugLog)


  /**
   * Debug Print of GQL Queries
   */
  // fs.writeFileSync('tmp/EVENT_QUERY.gql', EVENT_QUERY);
  // fs.writeFileSync('tmp/GROUP_QUERY.gql', GROUP_QUERY);
  // fs.writeFileSync('tmp/KEYWORD_SEARCH_QUERY.gql', KEYWORD_SEARCH_QUERY);
  // fs.writeFileSync('tmp/PRO_NETWORK_QUERY.gql', PRO_NETWORK_QUERY);
}

main();