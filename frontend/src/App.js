import "./App.css";
import { React, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { PaymentSingular } from "./components/PaymentSingular";
import { PaymentMethod } from "./components/PaymentMethod";

export const App = () => {
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<PaymentMethod></PaymentMethod>} />
            <Route
              path="/view/:id"
              element={<PaymentSingular></PaymentSingular>}
            />
          </Routes>
        </div>
      </Router>
    </>
  );
};
