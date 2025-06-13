import { beforeEach, describe, expect, it } from 'vitest'
import { createFakeClient, type FakeClient } from '../'

describe('fakeClient list', () => {
  let client: FakeClient

  beforeEach(() => {
    client = createFakeClient()
  })

  it('should reset entities', async () => {
    client.addDir('/new-dir')
    client.addFile('/new-file.txt', 1024)

    expect(await client.list()).toHaveLength(2)

    client.reset()

    expect(await client.list()).toHaveLength(0)
    expect(client.isInitialized()).toBe(true)
  })
})
