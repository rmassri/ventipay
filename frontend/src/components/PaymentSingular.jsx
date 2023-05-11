import { useParams } from "react-router-dom";
import { getPaymentMethods } from "../helper/getPaymentMethods";
import { useEffect, useState } from "react";
export const PaymentSingular = (props) => {
  const { id } = useParams();
  const [getPayment, setGetPayment] = useState("");

  const dataPayment = async () => {
    let dataPaymentSingular = await getPaymentMethods();
    const result = dataPaymentSingular.find((data) => data.id === parseInt(id));
    setGetPayment(result);
  };

  useEffect(() => {
    dataPayment();
  }, []);

  return (
    <>
      {getPayment && (
        <>
          <div>{getPayment.brand}</div>
          <div>{getPayment.created_at}</div>
          <div>{getPayment.id}</div>
          <div>{getPayment.last4}</div>
          <div>{getPayment.type}</div>
        </>
      )}
    </>
  );
};
