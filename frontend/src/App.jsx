import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./components/Homepage";
import Collection from "./components/Collection";
import Login from "./components/Login";
import Register from "./components/Register";
import Footer from "./components/Footer";
import Women_T_shirt from "./components/Women_T_shirt";
import Women_shirt from "./components/Women_shirt";
import Women_jacket from "./components/Women_jacket";
import Women_shoes from "./components/Women_shoes";
import Women_skirt from "./components/Women_skirt";
import Women_shorts from "./components/Women_shorts";
import Women_jeans from "./components/Women_jeans";
import Women_trouser from "./components/Women_trouser";
import Women_dress from "./components/Women_dress";
import Men_T_shirt from "./components/Men_T_shirt";
import Men_jeans from "./components/Men_jeans";
import Men_jacket from "./components/Men_jacket";
import Men_trouser from "./components/Men_trouser";
import Men_shirt from "./components/Men_shirt";
import Men_shoes from "./components/Men_shoes";
import Girls_shoes from "./components/Girls_shoes";
import Girls_clothing from "./components/Girls_clothing";
import Boys_clothing from "./components/Boys_clothing";
import Boys_shoes from "./components/Boys_shoes";
import Accessories_glasses from "./components/Accessories_glasses";
import Accessories_watches from "./components/Accessories_watches";
import Accessories_gloves from "./components/Accessories_gloves";
import Accessories_belt from "./components/Accessories_belt";
import Accessories_hat from "./components/Accessories_hat";
import Accessories_bag from "./components/Accessories_bag";
import Accessories_wallet from "./components/Accessories_wallet";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HomePage />
                <Collection /> <Footer />{" "}
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/t-shirt" element={<Women_T_shirt />} />
          <Route path="/shirt" element={<Women_shirt />} />
          <Route path="/jacket" element={<Women_jacket />} />
          <Route path="/shoes" element={<Women_shoes />} />
          <Route path="/skirt" element={<Women_skirt />} />
          <Route path="/shorts" element={<Women_shorts />} />
          <Route path="/jeans" element={<Women_jeans />} />
          <Route path="/trouser" element={<Women_trouser />} />
          <Route path="/dress" element={<Women_dress />} />

          <Route path="/men/t-shirt" element={<Men_T_shirt />} />
          <Route path="/men/jeans" element={<Men_jeans />} />
          <Route path="/men/jacket" element={<Men_jacket />} />
          <Route path="/men/trouser" element={<Men_trouser />} />
          <Route path="/men/shirt" element={<Men_shirt />} />
          <Route path="/men/shoes" element={<Men_shoes />} />

          <Route path="/girls/clothing" element={<Girls_clothing />} />
          <Route path="/girls/shoes" element={<Girls_shoes />} />
          <Route path="/boys/clothing" element={<Boys_clothing />} />
          <Route path="/boys/shoes" element={<Boys_shoes />} />

          <Route
            path="/accessories/glasses"
            element={<Accessories_glasses />}
          />
          <Route
            path="/accessories/watches"
            element={<Accessories_watches />}
          />
          <Route path="/accessories/gloves" element={<Accessories_gloves />} />
          <Route path="/accessories/belt" element={<Accessories_belt />} />
          <Route path="/accessories/hat" element={<Accessories_hat />} />
          <Route path="/accessories/bag" element={<Accessories_bag />} />
          <Route path="/accessories/wallet" element={<Accessories_wallet />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
