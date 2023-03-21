import { Container } from "react-bootstrap"
import { Route, Routes } from "react-router-dom"
import { About } from "./pages/About"
import { Home } from "./pages/Home"
import { Store } from "./pages/Store"
import { Navbar } from "./components/Navbar"
import { ShoppingCartProvider } from "./context/ShoppingCartContext"

function App() {
  return (
    <ShoppingCartProvider>
      <Navbar></Navbar>

      <Container className="mb-4">
        <Routes>
          <Route
              element={ <Home /> }
              path="/" />
          <Route
              element={ <Store /> }
              path="/store" />
          <Route
              element={ <About /> }
              path="/about" />
        </Routes>
      </Container>
    </ShoppingCartProvider>
  )
}

export default App
