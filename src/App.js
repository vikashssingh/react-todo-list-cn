
import './App.css';
import TodoCreate from './component/TodoCreate';
import TodoList from './component/TodoList';
import { store } from './redux/Stores';
import { Provider } from 'react-redux';


function App() {
  return (
    <div >
      <Provider store={store}>
          <TodoCreate/>
          <TodoList />
      </Provider>
    </div>
  );
}

export default App;
