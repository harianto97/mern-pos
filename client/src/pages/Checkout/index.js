import { FaAddressCard, FaArrowLeft, FaArrowRight, FaCartPlus, FaInfoCircle, FaRegCheckCircle, FaUserAlt } from "@meronex/icons/fa";
import React from "react";
import { Link } from "react-router-dom";
import { Button, LayoutOne, Responsive, Steps, Table, Text } from "upkit";
import TopBar from "../../components/TopBar";
import { Redirect, useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { config } from "../../config";
import { formatRupiah, sumPrice } from "../../app/utils";
import { useAddressData } from "../../app/hooks/address";
import { createOrder } from "../../app/api/order";
import { clearItems } from "../../app/features/Cart/actions";

const IconWrapper = ({ children }) => {
  return <div className="text-3xl flex justify-center">{children}</div>;
};

const steps = [
  {
    label: "Item",
    icon: (
      <IconWrapper>
        <FaCartPlus />
      </IconWrapper>
    ),
  },
  {
    label: "Alamat",
    icon: (
      <IconWrapper>
        <FaAddressCard />
      </IconWrapper>
    ),
  },
  {
    label: "Konfirmasi",
    icon: (
      <IconWrapper>
        <FaInfoCircle />
      </IconWrapper>
    ),
  },
];

const columns = [
  {
    Header: "Nama produk",
    accessor: (item) => (
      <div className="flex items-center">
        <img
          src={`${config.api_host}/images/product/${item.image_url}`}
          width={48}
          alt={item.name}
        />
        {item.name}
      </div>
    ),
  },
  {
    Header: "Jumlah",
    accessor: "qty",
  },
  {
    Header: "Harga satuan",
    id: "price",
    accessor: (item) => <span> @ {formatRupiah(item.price)} </span>,
  },
  {
    Header: "Harga total",
    id: "subtotal",
    accessor: (item) => {
      return <div>{formatRupiah(item.price * item.qty)}</div>;
    },
  },
];

const addressColumns = [
  {
    Header: "Nama alamat",
    accessor: (alamat) => {
      return (
        <div>
          {alamat.nama} <br />
          <small>
            {alamat.provinsi}, {alamat.kabupaten}, {alamat.kecamatan},{" "}
            {alamat.kelurahan} <br />
            {alamat.detail}
          </small>
        </div>
      );
    },
  },
];

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedAddress, setSelectedAddress] = React.useState(null);
  const history = useHistory();
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const { count, data, limit, page, setPage, status } = useAddressData();
  const dispatch = useDispatch();

  const handleCreateOrder = async () => {
    let payload = {
      delivery_address: selectedAddress._id,
      delivery_fee: config.global_ongkir,
    };
    const { data } = await createOrder(payload);
    if (!data.error) {
      dispatch(clearItems());
      history.push(`/invoice/${data._id}`);
    }
  };
  if (!cart) {
    return <Redirect to="/" />;
  }
  return (
    <LayoutOne>
      <TopBar />
      <Text as="h3">Checkout</Text>
      <br />
      <Steps steps={steps} />

      {activeStep === 0 && (
        <div>
          <br /> <br />
          <Table
            items={cart}
            columns={columns}
            perPage={cart.length}
            showPagination={false}
          />
          <br />
          <div className="text-right">
            <Text as="h4">Subtotal: {formatRupiah(sumPrice(cart))}</Text>
            <br />
            {!auth.user ? (
              <Button
                onClick={(_) => history.push("/login")}
                color="red"
                iconAfter={<FaUserAlt />}
              >
                Login to Checkout
              </Button>
            ) : (
              <Button
                onClick={(_) => setActiveStep(activeStep + 1)}
                color="red"
                iconAfter={<FaArrowRight />}
              >
                Selanjutnya
              </Button>
            )}
          </div>
        </div>
      )}

      {activeStep === 1 && (
        <div>
          <Table
            items={data}
            columns={addressColumns}
            perPage={limit}
            page={page}
            onPageChange={(page) => setPage(page)}
            totalItems={count}
            isLoading={status === "process"}
            selectable
            primaryKey={"_id"}
            selectedRow={selectedAddress}
            onSelectRow={(item) => setSelectedAddress(item)}
          />
          {!data.length && (
            <div className="text-center my-10">
              <Link to="/alamat-pengiriman/tambah">
                Kamu belum memiliki alamat pengiriman <br /> <br />
                <Button> Tambah alamat </Button>
              </Link>
            </div>
          )}
          <br /> <br />
          <Responsive desktop={2} tablet={2} mobile={2}>
            <div>
              <Button
                onClick={(_) => setActiveStep(activeStep - 1)}
                color="gray"
                iconBefore={<FaArrowLeft />}
              >
                Sebelumnya
              </Button>
            </div>

            <div className="text-right">
              <Button
                onClick={(_) => setActiveStep(activeStep + 1)}
                disabled={!selectedAddress}
                color="red"
                iconAfter={<FaArrowRight />}
              >
                Selanjutnya
              </Button>
            </div>
          </Responsive>
        </div>
      )}

      {activeStep === 2 && (
        <div>
          <Table
            columns={[
              {
                Header: "",
                accessor: "label",
              },
              {
                Header: "",
                accessor: "value",
              },
            ]}
            items={[
              {
                label: "Alamat",
                value: (
                  <div>
                    {selectedAddress.nama} <br />
                    {selectedAddress.provinsi}, {selectedAddress.kabupaten},{" "}
                    {selectedAddress.kecamatan}, {selectedAddress.kelurahan}{" "}
                    <br />
                    {selectedAddress.detail}
                  </div>
                ),
              },
              { label: "Subtotal", value: formatRupiah(sumPrice(cart)) },
              { label: "Ongkir", value: formatRupiah(config.global_ongkir) },
              {
                label: "Total",
                value: (
                  <b>
                    {formatRupiah(
                      parseInt(sumPrice(cart)) + parseInt(config.global_ongkir)
                    )}
                  </b>
                ),
              },
            ]}
            showPagination={false}
          />
          <br />
          <Responsive desktop={2} tablet={2} mobile={2}>
            <div>
              <Button
                onClick={(_) => setActiveStep(activeStep - 1)}
                color="gray"
                iconBefore={<FaArrowLeft />}
              >
                Sebelumnya
              </Button>
            </div>
            <div className="text-right">
              <Button
                color="red"
                size="large"
                iconBefore={<FaRegCheckCircle />}
                onClick={handleCreateOrder}
              >
                Bayar
              </Button>
            </div>
          </Responsive>
        </div>
      )}
    </LayoutOne>
  );
}