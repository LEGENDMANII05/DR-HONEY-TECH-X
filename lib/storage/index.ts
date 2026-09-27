export type StorageObject={url:string;key:string};
/** Persistent storage boundary. Connect a provider such as S3-compatible object storage here; never use the Vercel local filesystem for permanent uploads. */
export async function uploadObject(_input:File):Promise<StorageObject>{throw new Error('Persistent storage provider is not configured. Set STORAGE_PROVIDER and implement its adapter before enabling uploads.')}
