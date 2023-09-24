import path from 'path'

export const getIdFromFilename = (fileName: string) => path.basename(fileName, path.extname(fileName))
