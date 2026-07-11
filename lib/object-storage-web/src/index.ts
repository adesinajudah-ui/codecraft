// ObjectUploader (Uppy dashboard modal) is intentionally not re-exported here to avoid
// bundling @uppy/react's dashboard-modal subpath in apps that only need the plain
// useUpload hook. Import it directly from './ObjectUploader' if the Uppy modal UI is needed.
export { useUpload } from './use-upload';
