import Order from "../models/order.js";
import Product from "../models/product.js";

export const create = async (req, res) => {
  try {
    const {
      product_id,
      asker_id,
      size,
      price,
      order_type,
      active,
      sold,
      contactNum,
      address,
    } = req.body;

    const newOrder = new Order({
      product_id,
      asker_id,
      size,
      price,
      order_type,
      active,
      sold,
      contactNum,
      address,
    });

    const saved = await newOrder.save();

    res.status(200).json(saved);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

Number.prototype.padLeft = function (base, chr) {
  var len = String(base || 10).length - String(this).length + 1;
  return len > 0 ? new Array(len).join(chr || "0") + this : this;
};

export const getAll = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("product_id")
      .populate("asker_id");

    var stt = 1;

    let payload = [];

    for (let order of orders) {
      const date = new Date(order.createdAt);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).padLeft();
      const dt = date.getDate().padLeft();
      const h = date.getHours().padLeft();
      const m = date.getMinutes().padLeft();
      const s = date.getSeconds().padLeft();

      let result = {};
      result.order_id = stt;
      result.date_create = [dt, month, year].join("/");
      result.time_create = [h, m, s].join(":");
      result.user = order.asker_id.name;
      result.product = order.product_id.name;
      result.size = order.size;
      result.price = order.price;
      result.order_type = order.order_type;
      payload.push(result);
      stt++;
    }

    res.status(200).json(payload);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};
export const getByProductID = async (req, res) => {
  const id = req.params.id;
  try {
    const orders = await Order.find({ product_id: id });

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

export const update = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

export const updateActive = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        active: false,
      },
      { new: true }
    );
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};
export const deleteById = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};
