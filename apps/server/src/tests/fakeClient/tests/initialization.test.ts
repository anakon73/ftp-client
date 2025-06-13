import { beforeEach, describe, expect, it } from 'vitest'
import { createFakeClient, type FakeClient } from '../'

describe('fakeClient initialization', () => {
  let client: FakeClient

  beforeEach(() => {
    client = createFakeClient()
  })

  it('should be initialized', () => {
    expect(client.isInitialized()).toBe(true)
  })
})
