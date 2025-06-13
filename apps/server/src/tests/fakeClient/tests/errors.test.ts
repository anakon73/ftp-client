import { beforeEach, describe, expect, it } from 'vitest'
import { createFakeClient, type FakeClient } from '../'

describe('fakeClient handle errors', () => {
  let client: FakeClient

  beforeEach(() => {
    client = createFakeClient()
  })

  it(
    'should throw an error when adding a file to a non-existent directory',
    () => {
      expect(() => client.addFile('/non-existent-dir/file.txt')).toThrow(
        // eslint-disable-next-line max-len
        'Parent directory does not exist or is not a directory: /non-existent-dir',
      )
    },
  )

  it(
    'should throw an error when adding a directory to a non-existent directory',
    () => {
      expect(() => client.addDir('/non-existent-dir/new-dir')).toThrow(
        'Parent directory does not exist: /non-existent-dir',
      )
    },
  )

  it('should throw an error when trying to remove root dir', async () => {
    await expect(client.remove('/'))
      .rejects
      .toThrow('You cannot delete root directory')
  })
})
