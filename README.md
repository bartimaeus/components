# React Components

I often find myself using [Ant Design](https://github.com/ant-design/ant-design) and customizing it a bit for my needs. Creating a repo of shared React components for use in my personal projects.

## Usage

#### Install

```bash
cd [project_using_current_package]
yalc add @bartimaeus/components
yarn install
```

#### Example

```jsx
import React, { useState } from 'react'

import { ColorPicker } from '@bartimaeus/components'

export default = () => {
  const [value, onChange] = useState('404040')
  render() {
    return <ColorPicker value={value} onChange={onChange} />
  }
}
```

## Development

Currently, development is happening with `yalc` so that the package can be used locally without publishing to an npm repository.

**If you don't have yalc installed, then install it locally: `npm install -g yalc`**

1. Install dependencies

   ```bash
   yarn install
   ```

2. Start up Storybook

   ```bash
   yarn start
   ```

3. Make and commit the changes

4. Publish with `yalc`

   ```bash
   yalc publish
   cd [project_using_current_package]
   yalc update
   yarn install
   ```

## License

@bartimaeus/components is [MIT licensed](https://github.com/bartimaeus/components/blob/master/LICENSE)
