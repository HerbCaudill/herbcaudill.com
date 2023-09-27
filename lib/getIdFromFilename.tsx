import path from 'path'

/** This strips the path and extension to return just the base filename */
export const getIdFromFilename = (fileName: string) => path.basename(fileName, path.extname(fileName))
