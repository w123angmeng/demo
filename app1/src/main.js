// import('./bootstrap')
// await import('./bootstrap')

// const { bootstrap, mount, unmount } = import('./bootstrap')
// eslint-disable-next-line
import { bootstrap, mount, unmount } from './bootstrap'

// import bootstrap from './bootstrap';
// bootstrap();
// console.log("===bootstrap, mount, unmount:", bootstrap, mount, unmount)
export { bootstrap, mount, unmount }

// (async () => {
//     const { bootstrap, mount, unmount } = await import('./bootstrap')
//   })().then(()=> {
//     export { bootstrap, mount, unmount }
//   })
