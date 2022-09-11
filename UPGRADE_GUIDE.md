# From v0.5.x

The biggest change from v0.5.x to 1.x.x is that now this library has no lightbox functionality. 
Read [this discussion](https://github.com/benhowell/react-grid-gallery/discussions/179) to learn more about the motivation for that decision.
So if you want need lightbox integration please check out our [examples](https://benhowell.github.io/react-grid-gallery/). 

## API changes
Also, we made API polishing and renamed some props, and changed event handler signatures.

### Gallery Options changes
- `onSelectImage` renamed to `onSelect`
- `onClickThumbnail` renamed to `onClick`

Both event handlers now receive the same arguments:
```ts
(index: number, item: Image, event: MouseEvent<HTMLElement>) => void
```

Styling props such as `thumbnailStyle`, `tagStyle`, `tileViewportStyle` now get some extra data as arguments, read more in [the docs](https://github.com/benhowell/react-grid-gallery#gallery-options).

In [v0.5.x docs](https://github.com/benhowell/react-grid-gallery/tree/v0.5.6#programmers-notes) there was a hacky access to `this` in event handlers. 
After lightbox functionality was stripped out it's not needed and removed.

In [v0.5.x](https://github.com/benhowell/react-grid-gallery/tree/v0.5.6), there was [hacky access](https://github.com/benhowell/react-grid-gallery/tree/v0.5.6#programmers-notes) to `this` in event handlers. After lightbox functionality was stripped out this hack was removed as well.

### Image Options changes
- `thumbnail` renamed to `src`
- `thumbnailWidth` renamed to `width`
- `thumbnailHeight` renamed to `height`

So now the minimum image object looks like this

```json
{
  "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Apples.jpg/320px-Apples.jpg",
  "width": 320,
  "height": 480
}
```


## No default import

React grid gallery now uses only named export. Please update import to
```js
import { Gallery } from "react-grid-gallery";
```
