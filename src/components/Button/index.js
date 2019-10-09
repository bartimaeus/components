import React from 'react'
import { Button, Icon } from 'antd'
import styled from '@emotion/styled'

const htmlColorNames = [
  'indianred',
  'lightcoral',
  'salmon',
  'darksalmon',
  'lightsalmon',
  'crimson',
  'red',
  'firebrick',
  'darkre',
  'pink',
  'lightpink',
  'hotpink',
  'deeppink',
  'mediumvioletred',
  'palevioletre',
  'lightsalmon',
  'coral',
  'tomato',
  'orangered',
  'darkorange',
  'orang',
  'gold',
  'yellow',
  'lightyellow',
  'lemonchiffon',
  'lightgoldenrodyellow',
  'papayawhip',
  'moccasin',
  'peachpuff',
  'palegoldenrod',
  'khaki',
  'darkkhak',
  'lavender',
  'thistle',
  'plum',
  'violet',
  'orchid',
  'fuchsia',
  'magenta',
  'mediumorchid',
  'mediumpurple',
  'amethyst',
  'blueviolet',
  'darkviolet',
  'darkorchid',
  'darkmagenta',
  'purple',
  'indigo',
  'slateblue',
  'darkslateblue',
  'mediumslateblu',
  'greenyellow',
  'chartreuse',
  'lawngreen',
  'lime',
  'limegreen',
  'palegreen',
  'lightgreen',
  'mediumspringgreen',
  'springgreen',
  'mediumseagreen',
  'seagreen',
  'forestgreen',
  'green',
  'darkgreen',
  'yellowgreen',
  'olivedrab',
  'olive',
  'darkolivegreen',
  'mediumaquamarine',
  'darkseagreen',
  'lightseagreen',
  'darkcyan',
  'teal',
  'aqua',
  'cyan',
  'lightcyan',
  'paleturquoise',
  'aquamarine',
  'turquoise',
  'mediumturquoise',
  'darkturquoise',
  'cadetblue',
  'steelblue',
  'lightsteelblue',
  'powderblue',
  'lightblue',
  'skyblue',
  'lightskyblue',
  'deepskyblue',
  'dodgerblue',
  'cornflowerblue',
  'mediumslateblue',
  'royalblue',
  'blue',
  'mediumblue',
  'darkblue',
  'navy',
  'midnightblu',
  'cornsilk',
  'blanchedalmond',
  'bisque',
  'navajowhite',
  'wheat',
  'burlywood',
  'tan',
  'rosybrown',
  'sandybrown',
  'goldenrod',
  'darkgoldenrod',
  'peru',
  'chocolate',
  'saddlebrown',
  'sienna',
  'brown',
  'maroon',
  'white',
  'snow',
  'honeydew',
  'mintcream',
  'azure',
  'aliceblue',
  'ghostwhite',
  'whitesmoke',
  'seashell',
  'beige',
  'oldlace',
  'floralwhite',
  'ivory',
  'antiquewhite',
  'linen',
  'lavenderblush',
  'mistyrose',
  'gainsboro',
  'lightgrey',
  'silver',
  'darkgray',
  'gray',
  'dimgray',
  'lightslategray',
  'slategray',
  'darkslategray',
  'black',
]

const formatColor = color => {
  if (!color) return 'inherit'
  if (htmlColorNames.includes(color)) return color
  if (color.startsWith('#')) return color
  return `#${color}`
}

const StyledButton = styled(Button)`
  background: ${props => formatColor(props.background)};
  border-color: ${props => formatColor(props.background)};
  color: ${props => formatColor(props.color)};
  &:active,
  &:focus,
  &:hover {
    /* background: ${props => formatColor(props.color)}; */
    border-color: ${props => formatColor(props.background)};
    color: ${props => formatColor(props.background)};
  }
`

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
})

export default ({
  background,
  children,
  color,
  icon,
  iconFont,
  iconStyle = {},
  ...restProps
}) => (
  <StyledButton {...restProps} background={background} color={color}>
    {icon && <Icon style={iconStyle} type={icon} />}
    {iconFont && <IconFont style={iconStyle} type={iconFont} />}
    {children}
  </StyledButton>
)
