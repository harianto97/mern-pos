import axios from "axios";
import { config } from "../../config";

export async function getInvoceByOrderId(order_id) {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};
  return await axios
    .get(`${config.api_host}/api/invoice/${order_id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
}