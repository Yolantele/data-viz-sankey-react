# GeoFluxus Circular Sankey

Uses:

- React
- d3

### How to use the CircularSankey component within your React (or other) projects

install the npm module:

`npm i geofluxus-circular-sankey` or `yarn add geofluxus-circular-sankey`

then in your React (or other) project:

```
import CircularSanky from 'geofluxus-circular-sankey'
```

Within React View Component use the component:

```
const YourView = () => <CircularSankey circularData={yourCircularData} />

```

Customise the size of the diagram and absolute position on the screen by passing properties:

```
const pageMargins = {
    top: 50,
    left: 300,
    right: 50,
    bottom: 0
}

return (
    <CircularSankey
        circularData={yourCircularData}
        width={900}
        height={1000}
        absolutePosition={pageMargins}
    />
)

```

### Your Circular Data Shape

This is very important: Circular Sankey diagram calculates unique node connections and links to them. Pass the object of your Nodes and Links with the value (represents weight/width):

```
const yourCircularData = {
  nodes: [
    { name: 'A' },
    { name: 'B' },
    { name: 'C' }
  ],
  links: [
    {
      source: 'A',
      target: 'B',
      value: 10
    },
    {
      source: 'B',
      target: 'C',
      value: 5
    },
    {
      source: 'B',
      target: 'A',
      value: 1
    },
    {
      source: 'C',
      target: 'A',
      value: 3
    },
  ]
}
```

See [this link](https://blog.engineyard.com/integrating-react-with-backbone) for how to translate React Component to Backbone.js class views

### The Result

Should be a readable circular sankey with the ability to highlight key data nodes by clicking on the square nodes:

<img width="1201" alt="Screenshot 2020-05-09 at 10 50 37" src="https://user-images.githubusercontent.com/30931242/81470576-5487a180-91e3-11ea-86b5-27b95139b540.png">

### React instance / Hook called outside of fuction issue

currently the community is reporting potential issues with hooks being called outside of function or multiple react instances. In this case, add a resolver to your webpack.config.js :

```
module.exports = {
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react')
    }
  },
  // other webpack configurations...
}
```
