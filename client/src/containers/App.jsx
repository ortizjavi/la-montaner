import "./App.css";
import { Route, Switch } from "react-router";
import Home from "../components/Home/Home";
import Landing from "../components/Landing/Landing";
import ProductDetail from "../components/ProductDetail/ProductDetail";
import ProductCreation from "../components/ProductCreation/ProductCreation";
import CategoryCreation from "../components/CategoryCreation/CategoryCreation";

export default function App() {
  return (
    <div>
      <Route exact path="/" component={Landing} />
      <Route exact path="/home" component={Home} />
      <Switch>
        <Route exact path="/home/creation" component={ProductCreation} />
        <Route exact path="/admin/creation" component={CategoryCreation} />
        <Route exact path="/home/:id" component={ProductDetail} />
      </Switch>
    </div>
  );
}
