import 'dotenv/config';
import { queryEvent, queryKeywordSearch, queryHealthCheck, queryGroup, queryProNetwork, queryGroupUpcomingEvents } from './meetup/client';
import { AxiosResponse } from 'axios';

/**
 * Simple axios response debug log
 */
export const axiosResponseDebugLog = (res: AxiosResponse) => {
  const { data, status, statusText } = res;
  console.debug(`HTTP ${status} (${statusText}):`, data);
}

function main() {
  // // HEALTH CHECK
  queryHealthCheck()
    .then(gqlResponseDebugLog)

  // // EVENT
  queryEvent("305391431")
    .then(gqlResponseDebugLog)

  // GROUP
  queryGroup('nycaiu')
    .then(gqlResponseDebugLog)

  // UPCOMING EVENTS
  queryGroupUpcomingEvents('nyctnb')
    .then(gqlResponseDebugLog)

  // Uncomment below to test these:

  // // KEYWORD SEARCH
  queryKeywordSearch("EVENTS", "tech events")
    .then(gqlResponseDebugLog)

  // // PRO NETWORK
  // queryProNetwork("some ID")
  // .then(gqlResponseDebugLog)
}

main();