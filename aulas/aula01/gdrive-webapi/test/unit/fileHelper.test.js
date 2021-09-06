import {
    jest,
    describe,
    test,
    expect,
} from '@jest/globals'
import fs from 'fs'

import FileHelper from '../../src/fileHelper.js'

describe('#FileHelper', () => {

    describe('#getFileStatus', () => {
        test('it should return files statuses in correct format', async () => {
            const statMock = {
                dev: 16777231,
                mode: 33188,
                nlink: 1,
                uid: 501,
                gid: 20,
                rdev: 0,
                blksize: 4096,
                ino: 1021385,
                size: 5,
                blocks: 8,
                atimeMs: 1630940385662.6511,
                mtimeMs: 1630940384321.3691,
                ctimeMs: 1630940384321.3691,
                birthtimeMs: 1630940381611.0793,
                atime: '2021-09-06T14:59:45.663Z',
                mtime: '2021-09-06T14:59:44.321Z',
                ctime: '2021-09-06T14:59:44.321Z',
                birthtime: '2021-09-06T14:59:41.611Z'
            }

            const mockUser = 'aleffelixf'
            process.env.USER = mockUser
            const filename = 'file.png'

            jest.spyOn(fs.promises, fs.promises.readdir.name)
                .mockResolvedValue([filename])
            jest.spyOn(fs.promises, fs.promises.stat.name)
                .mockResolvedValue(statMock)

            const result = await FileHelper.getFilesStatus('/tmp')

            const expectedResult = [{
                size: '5 B',
                lastModified: statMock.birthtime,
                owner: mockUser,
                file: filename,
            }]

            expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${filename}`)
            expect(result).toMatchObject(expectedResult)
        })
    })

})