# data

## Project description
 
 - project created with vue.js (my first project with vue)
 
 - added express service
 
 - added airbnb linting setup
 
 App component: 
 
 - handles loading data and data processing
 
 - handles click events and displaying/ hiding notifications
 
 Methods:
 
 - close: close all notifications
 
 - nest: process data for Diagram component
 
 - setSelected: set selected node name
 
 Diagram component: 
 
 - is called recursively 
 
 - receives as input the data, the selected node name and the select method
 
 - handles node click: shows notification and sets the selected node style
 
 - extendKey -recursive function that sets node data based on expanded property 
 
 Used notification-vue library to show notifications
 
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
