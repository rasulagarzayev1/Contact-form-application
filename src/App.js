import Form from "./components/Form/Form";
import AddressDetail from "./components/AddressDetail/AddressDetail";

function App() {
  return (
    <div className="App">
      <div className="layout">
        <div className="container">
          <div className="wrapper">
            <AddressDetail />
            <Form />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
