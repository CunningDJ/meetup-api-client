import axios, { AxiosPromise } from 'axios';
import { Event, EventType, Group, GroupSponsor, Image, MailchimpList, ProNetwork, SearchConnection, SearchSources, SocialNetwork } from '.';
import { EVENT_QUERY, GROUP_QUERY, KEYWORD_SEARCH_QUERY, PRO_NETWORK_QUERY } from './queries';

/**
 * Client
 */
const axiosClient = axios.create({
  baseURL: 'https://api.meetup.com/gql',
  headers: {
    'Authorization': `Bearer ${process.env.MEETUP_API_SECRET}`
  }
});

/**
 * GQL Debug Log
 */
export const gqlResponseLog = (res) => {
  const { data, status, statusText } = res;
  console.log('data:', data);
  console.log(`status: ${status} (${statusText})`);
}

/**
 * Base Query
 */
const queryMeetup = <V = object, RD = object>(query: string, variables?: V): AxiosPromise<RD> => (
  new Promise((resolve, reject) => {
    try {
      axiosClient.post('', { query, variables: JSON.stringify(variables) })
        .then(res => {
          // Transforming based on the GQL response inside the 'data' field
          res.data = res.data.data;
          resolve(res);
        })

    } catch (err) {
      reject(err);
    }
  })
);


/**
 * Query: Event
 * Response schema: https://www.meetup.com/api/schema/#Event
 */
type QueryEventVariables = {
  eventId: string;
}

export const queryEvent = (eventId: string): AxiosPromise => (
  queryMeetup<QueryEventVariables, Event>(EVENT_QUERY, { eventId })
);


/**
 * Query: Group
 * Response schema: https://www.meetup.com/api/schema/#Group
 */
type UrlNameOptions = "nyctnb" | "nycaiu";

type QueryGroupVariables = {
  urlname: string;
}
export const queryGroup = (urlname: UrlNameOptions): AxiosPromise => (
  queryMeetup<QueryGroupVariables, Group>(GROUP_QUERY, { urlname })
);


/**
 * Query: Meetup Health Check
 */
type HealthCheckQueryResponse = {
  healthCheck: 'pass' | 'fail'
}
const HEALTH_CHECK_QUERY = `
  query {
    healthCheck
  }
`;
export const queryHealthCheck = (): AxiosPromise<HealthCheckQueryResponse> => (
  queryMeetup<undefined, HealthCheckQueryResponse>(HEALTH_CHECK_QUERY)
);


/**
 * Query: keywordSearch
 * Response: https://www.meetup.com/api/schema/#SearchConnection
 */
type KeywordSearchResponse = SearchConnection;
type KeywordSearchVariables = {
  filter: {
    source: SearchSources;
    query: string;
    lat: number;
    lon: number;
    city?: string;
    state?: string;
    eventType?: EventType;
  }
}

export const queryKeywordSearch = (source: SearchSources, searchString: string, lat = 40.7128, lon = -74.0060, city = "New York", state = "NY", eventType: EventType = "PHYSICAL"): AxiosPromise<KeywordSearchResponse> => (
  queryMeetup<KeywordSearchVariables, KeywordSearchResponse>(KEYWORD_SEARCH_QUERY, {
    filter: {
      source,
      query: searchString,
      lat,
      lon,
      city,
      state,
      eventType
    }
  })
);

/**
 * Query: proNetwork
 * Response: https://www.meetup.com/api/schema/#ProNetwork
 */
export type ProNetworkStatus = "ACTIVE" | "INACTIVE" | "FROZEN";
export type ProNetWorkResponse = ProNetwork;
type QueryProNetworkVariables = {
  id: string;
}

export const queryProNetwork = (id: string): AxiosPromise<ProNetWorkResponse> => (
  queryMeetup<QueryProNetworkVariables, ProNetWorkResponse>(PRO_NETWORK_QUERY, { id })
);