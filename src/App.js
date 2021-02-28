import Lmap from './Lmap';
import './App.css';
import Sidebar from './Sidebar.js'
import Widgets from './Widgets.js'

function App() {
  return (
    <div className="app">
      
        {/* SideBar */}
        <Sidebar/>

        <Lmap/>

        {/* Widgets */}
        <Widgets/>

    
        
    </div>
  );
}


export default App;