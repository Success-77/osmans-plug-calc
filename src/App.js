import Navbar from "./Navbar";
import "./App.css";
import MTN from "./MTN"; // Import the MTN component

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <h3 className="home-header">Daily Sales Calculator</h3>
      <MTN />
    </div>
  );
};

export default App;
