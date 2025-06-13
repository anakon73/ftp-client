import { beforeEach, describe, expect, it } from 'vitest'
import { createFakeClient, type FakeClient } from '../'

describe('fakeClient remove', () => {
  let client: FakeClient

  beforeEach(() => {
    client = createFakeClient()
  })

  it('should remove file', async () => {
    client.addFile('/new-file.txt', 1024)

    expect(await client.list()).toHaveLength(1)

    client.remove('/new-file.txt')

    expect(await client.list()).toHaveLength(0)
  })

  it('should remove dir', async () => {
    client.addDir('/new-dir')

    expect(await client.list()).toHaveLength(1)

    client.remove('/new-dir')

    expect(await client.list()).toHaveLength(0)
  })

  it('should remove files in directory', async () => {
    client.addDir('/new-dir')
    client.addFile('/new-dir/file1.txt', 1024)
    client.addFile('/new-dir/file2.txt', 2048)

    expect(await client.list('/new-dir')).toHaveLength(2)

    client.remove('/new-dir')

    expect(await client.list()).toHaveLength(0)
  })

  it('should remove files in directory with trailing slash', async () => {
    client.addDir('/new-dir')
    client.addFile('/new-dir/file1.txt', 1024)
    client.addFile('/new-dir/file2.txt', 2048)

    expect(await client.list('/new-dir')).toHaveLength(2)

    client.remove('/new-dir/')

    expect(await client.list()).toHaveLength(0)
  })
})
