// import React from 'react';
// import { Provider } from 'react-redux';
// import store from './Store'; // No curly braces for default export
// import SearchComponent from './Debounce';

// const App = () => {
//   return (
//     <Provider store={store}>
//       <div>
//         <h1>Search Application</h1>
//         <SearchComponent />
//       </div>
//     </Provider>
//   );
// };

// export default App;

import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from './Todo';
import Todo from './Todo';

const store = createStore(rootReducer)
 
const App = () => (
  <Provider store={store}>
    <Todo />
  </Provider>
)
 
export default App;
 
