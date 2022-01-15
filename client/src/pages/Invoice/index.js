import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { BounceLoader } from "react-spinners";
import { Table, Text } from "upkit";
import { LayoutOne } from "upkit/dist";
import { getInvoceByOrderId } from "../../app/api/invoice";
import { formatRupiah } from "../../app/utils";
import StatusLabel from "../../components/StatusLabel";
import TopBar from "../../components/TopBar";
import { config } from "../../config";

export default function Invoice() {
  const [invoice, setInvoice] = useState({});
  const [error, setError] = useState("");
  const [status, setStatus] = useState("proccess");
  const { order_id } = useParams();

  useEffect(() => {
    getInvoceByOrderId(order_id)
      .then(({ data }) => {
        if (data.error) {
          setError(data.message);
        }
        setInvoice(data);
        console.log(data);
      })
      .catch((err) => setError(err.message))
      .finally((_) => setStatus("success"));
  }, [order_id]);

  if (status === "process") {
    return (
      <LayoutOne>
        <div className="text-center py-10">
          <div className="inline-block">
            <BounceLoader color="red" />
          </div>
        </div>
      </LayoutOne>
    );
  }

  return (
    <LayoutOne>
      <TopBar />
      <Text as="h3">{error ? error : "Invoice"}</Text>
      <br />
      {invoice && (
        <Table
          showPagination={false}
          items={[
            {
              label: "Status",
              value: <StatusLabel status={invoice?.payment_status} />,
            },
            { label: "Order ID", value: "#" + invoice?.order?.order_number },
            { label: "Total amount", value: formatRupiah(invoice?.total) },
            {
              label: "Billed to",
              value: (
                <div>
                  <b>{invoice?.user?.full_name} </b> <br />
                  {invoice?.user?.email} <br /> <br />
                  {invoice?.delivery_address?.detail} <br />
                  {invoice?.delivery_address?.kelurahan},
                  {invoice?.delivery_address?.kecamatan} <br />
                  {invoice?.delivery_address?.kabupaten} <br />
                  {invoice?.delivery_address?.provinsi}
                </div>
              ),
            },
            {
              label: "Payment to",
              value: (
                <div>
                  {config.owner} <br />
                  {config.contact} <br />
                  {config.billing.account_no} <br />
                  {config.billing.bank_name}
                </div>
              ),
            },
          ]}
          columns={[
            { Header: "Invoice", accessor: "label" },
            { Header: "", accessor: "value" },
          ]}
        />
      )}
    </LayoutOne>
  );
}
