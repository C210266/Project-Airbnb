import './App.css';
import { Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import { ListItem, EditItem, CreateItem } from './components/Page/AdminControlPage/ListItem';
import { ListUser, EditUser, CreateUser } from './components/Page/AdminControlPage/UserRegister';
import AdminPanel from './components/Page/AdminControlPage/AdminPanel';



function App() {
  return (
    <div className="App">
      {/* Quan li Admin */}
      <Admin
        dashboard={AdminPanel}
        dataProvider={simpleRestProvider('http://localhost:8000')}>

        <Resource name="items"
          list={ListItem}
          edit={EditItem}
          create={CreateItem}

        />

        <Resource name="user-register"
          list={ListUser}
          edit={EditUser}
          create={CreateUser}

        />
      </Admin>
    </div>
  );
}

export default App;
