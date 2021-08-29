// This file re-exports every export from the common npm module
// However, while developing, you might want to test out changes you make in the package,
// without having to publish the package, and update the package wherever you plan to use it.

// For standalone mode, everything is exported from the source code of the commons package, so you test your changes immediately
// For production or in docker, everything is exported from the latest version of the commons package published to npm-js

// When running in standalone mode, uncomment this export && comment the other
// export * from '../../../commons/src'

// For production or in docker, uncomment this export && comment the other
export * from '@stranerd/api-commons'