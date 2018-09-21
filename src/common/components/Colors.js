const colors = {
  'green': '21ce99',
  'white': 'ffffff',
  'black': '000000',
  'greyF5': 'f5f5f5',
  'darkgrey': '1b2126',
  'lightgrey': '6c7980',
  'transparent': '00000000'
}

export default {
  get: (name) => `#${colors[name] || colors['white']}`
}