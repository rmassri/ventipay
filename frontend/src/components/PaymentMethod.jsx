/**
 * Instructions
 *
 * 1. Show a list of payment methods filtered by type "credit_card".
 * 2. Get the list data from the API when the component is rendered and refresh it automatically every 30 seconds.
 * 3. Show a loading component while getting the list data but only on the first pull.
 * 4. Show the total number of credit cards
 * 5. Show the total number of credit cards ending in an even number (check the "last4" attribute).
 * 6. Implement a button to delete a credit card
 */

import { React, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import { getPaymentMethods } from "../helper/getPaymentMethods";

export const PaymentMethod = () => {
  const [paymentMethodsCount, setPaymentMethodsCount] = useState();
  const [paymentMethods, setpaymentMethods] = useState();
  const [isLoading, setIsLoading] = useState(0);
  const [type, setType] = useState(0);
  const [valueInput, setValueInput] = useState("");
  console.log("****");
  console.log(paymentMethods);
  console.log("****");

  const handleChange = (event) => {
    setValueInput(event.target.value);
    setType(event.target.value);
  };

  const handleClickDelete = (id) => {
    const filter = paymentMethods.filter((data) => data.id !== parseInt(id));
    setpaymentMethods(filter);
  };

  const exportToCSV = (data, filename) => {
    // Convierte los datos a CSV
    const csv = Papa.unparse(data);

    // Crea un archivo Blob con el contenido CSV
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    // Guarda el archivo CSV en el dispositivo del usuario
    saveAs(blob, filename);
  };

  const handleExport = () => {
    const dataToExport = paymentMethods;

    exportToCSV(dataToExport, "my-data.csv");
  };

  const handleClickView = () => {};

  const getPayment = async () => {
    let filter = await getPaymentMethods();
    filter = filter.filter((data) => data.type.includes(valueInput));
    setPaymentMethodsCount(filter.length);
    setpaymentMethods(filter);
    setIsLoading(1);
    setType(type);
    return filter;
  };

  useEffect(() => {
    setPaymentMethodsCount(0);
    getPayment("");
  }, [type]);

  return (
    <>
      {isLoading && (
        <div className="App">
          <h1>Payment Methods.</h1>
          <h2>Total: ({paymentMethodsCount})</h2>
          <h2>Total ending in an even number: 0 </h2>
          <input type="text" value={valueInput} onChange={handleChange}></input>
          <hr />
          <button onClick={handleExport}>Exportar datos a CSV</button>

          <ul>
            {paymentMethods.map((element, i) => {
              return (
                <>
                  <li key={i}>
                    Brand: {element.brand}, Last 4: {element.last4}, Created At:
                    {element.created_at}
                    &nbsp;&nbsp;
                    <Link to={`view/${element.id}`}>Ver</Link> &nbsp;&nbsp;
                    <Link onClick={() => handleClickDelete(element.id)}>
                      Eliminar
                    </Link>
                  </li>
                </>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};
