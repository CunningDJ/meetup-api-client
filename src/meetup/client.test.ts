import { queryEvent, queryGroup, queryGroupPastEvents, queryGroupUpcomingEvents, queryHealthCheck } from "./client";

import fs from 'fs';
import { EVENT_QUERY, GROUP_PAST_EVENTS_QUERY, GROUP_QUERY, GROUP_UPCOMING_EVENTS_QUERY, KEYWORD_SEARCH_QUERY, PRO_NETWORK_QUERY } from "./queries";

const NYCTNB = {
  id: '32317069',
  name: 'New York Tech & Beer®'
}

const NYCAIU = {
  id: '37018158',
  name: 'New York AI Users'
}

describe("API Client", () => {
  beforeAll(() => {
    // Writing queries to directory for diagnosis
    const TMPDIR = 'tmp';
    fs.mkdirSync(TMPDIR, { recursive: true });
    fs.writeFileSync(`${TMPDIR}/EVENT_QUERY.gql`, EVENT_QUERY);
    fs.writeFileSync(`${TMPDIR}/GROUP_QUERY.gql`, GROUP_QUERY);
    fs.writeFileSync(`${TMPDIR}/GROUP_UPCOMING_EVENTS_QUERY.gql`, GROUP_UPCOMING_EVENTS_QUERY);
    fs.writeFileSync(`${TMPDIR}/GROUP_PAST_EVENTS_QUERY.gql`, GROUP_PAST_EVENTS_QUERY);
    fs.writeFileSync(`${TMPDIR}/KEYWORD_SEARCH_QUERY.gql`, KEYWORD_SEARCH_QUERY);
    fs.writeFileSync(`${TMPDIR}/PRO_NETWORK_QUERY.gql`, PRO_NETWORK_QUERY);
  })
  it("queryEvent: Should fetch without error", async () => {
    const response = await queryEvent("305391431");
    expect(response.status).toEqual(200);
    const event = response.data;
    expect(event.group.id).toEqual(NYCTNB.id);
  })

  it("queryGroup: Should fetch without error", async () => {
    const response = await queryGroup('nycaiu');
    expect(response.status).toEqual(200);
    const group = response.data;
    expect(group.id).toEqual(NYCAIU.id);
    expect(group.name).toEqual(NYCAIU.name);
  })

  it("queryUpcomingEvents: Should fetch without error", async () => {
    const response = await queryGroupUpcomingEvents('nyctnb', 2);
    expect(response.status).toEqual(200);
    const { upcomingEvents, id, name } = response.data;
    expect(id).toBe(NYCTNB.id);
    expect(name).toBe(NYCTNB.name);
    expect(upcomingEvents.length).toEqual(2);
  })

  it("queryPastEvents: Should fetch without error", async () => {
    const response = await queryGroupPastEvents('nyctnb', 2);
    expect(response.status).toEqual(200);
    const { pastEvents, id, name } = response.data;
    expect(id).toBe(NYCTNB.id);
    expect(name).toBe(NYCTNB.name);
    expect(pastEvents.length).toEqual(2);
  })

  it("queryHealthCheck: Should fetch without error", async () => {
    const response = await queryHealthCheck();
    expect(response.status).toEqual(200);
  })
})