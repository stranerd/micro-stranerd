// This file re-exports every export from the common npm module
// However, while developing, you might want to test out changes you make in the package,
// without having to publish the package, and update the package wherever you plan to use it.

// For development, everything is exported from the source code of the commons package, so you test your changes immediately
// For production, everything is exported from the latest version of the commons package publushed to npmjs


// For development, uncomment this export && comment the other
// export * from '../../commons/src'

// For production, uncomment this export && comment the other
export * from '@stranerd/api-commons'
