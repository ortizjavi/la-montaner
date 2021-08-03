import "./App.css";
import { Route } from "react-router";
import Home from "../components/Home/Home";
import Landing from "../components/Landing/Landing";
import ProductDetail from "../components/ProductDetail/ProductDetail";
import ProductCreation from "../components/ProductCreation/ProductCreation";

function App() {
  return (
    <div>
      <Route exact path="/" component={Landing} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/home/creation" component={ProductCreation} />
      <Route exact path="/home/product/:id" component={ProductDetail} />
    </div>
  );
}

export default App;
