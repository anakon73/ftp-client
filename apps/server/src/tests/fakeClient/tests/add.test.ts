import { beforeEach, describe, expect, it } from 'vitest'
import { createFakeClient, type FakeClient } from '../'

describe('fakeClient add', () => {
  let client: FakeClient

  beforeEach(() => {
    client = createFakeClient()
  })

  it('should add a directory', async () => {
    client.addDir('/new-dir')

    expect(await client.list()).toContainEqual({
      name: 'new-dir',
      type: 2,
      size: 0,
      modifiedAt: expect.any(Date),
    })
  })

  it('should add a file', async () => {
    client.addFile('/new-file.txt', 1024)

    expect(await client.list()).toContainEqual({
      name: 'new-file.txt',
      type: 1,
      size: 1024,
      modifiedAt: expect.any(Date),
    })
  })

  it('should add a file into a directory', async () => {
    client.addDir('/new-dir')
    client.addFile('/new-dir/new-file.txt', 1024)

    expect(await client.list('/new-dir')).toContainEqual({
      name: 'new-file.txt',
      type: 1,
      size: 1024,
      modifiedAt: expect.any(Date),
    })
  })
})
