const express = require("express");
const Order = require("../models/Order");

module.exports = function (io) {
  const router = express.Router();

  // ✅ Save multiple orders
  router.post("/", async (req, res) => {
    try {
      const orders = req.body.orders;
      const savedOrders = await Order.insertMany(orders);
      io.emit("ordersUpdated");
      res.status(201).json({ message: "Orders saved", saved: savedOrders });
    } catch (err) {
      res.status(500).json({ message: "Failed to save orders" });
    }
  });

  // ✅ Admin: Get all orders
  router.get("/", async (req, res) => {
    try {
      const allOrders = await Order.find({});
      res.json(allOrders);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch all orders" });
    }
  });

  // ✅ User: Get grouped orders by email
  router.get("/:email", async (req, res) => {
    try {
      const email = req.params.email;
      const all = await Order.find({ email });

      const grouped = {};
      all.forEach((order) => {
        const key = `${order.email}-${order.date}`;
        if (!grouped[key]) {
          grouped[key] = {
            _id: order._id,
            customerName: order.customerName,
            email: order.email,
            mobile: order.mobile,
            area: order.area,
            town: order.town,
            city: order.city,
            state: order.state,
            pincode: order.pincode,
            message: order.message,
            date: order.date,
            products: [],
          };
        }

        grouped[key].products.push({
          _id: order._id,
          name: order.name,
          price: order.price,
          image: order.image,
          status: order.status, // include product delivery status
        });
      });

      res.json({ groupedOrders: grouped });
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  // ✅ Cancel a product (by product ID)
  router.delete("/cancel/:id", async (req, res) => {
    try {
      const deleted = await Order.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ message: "Order not found" });
      io.emit("ordersUpdated");
      res.json({ message: "Order cancelled" });
    } catch {
      res.status(500).json({ message: "Server error while deleting" });
    }
  });

  // ✅ Update address or customer details (user edit)
  router.put("/update/:id", async (req, res) => {
    try {
      const updated = await Order.findByIdAndUpdate(
        req.params.id,
        {
          customerName: req.body.customerName,
          mobile: req.body.mobile,
          area: req.body.area,
          town: req.body.town,
          city: req.body.city,
          state: req.body.state,
          pincode: req.body.pincode,
          message: req.body.message,
        },
        { new: true }
      );
      if (!updated) return res.status(404).json({ message: "Order not found" });
      io.emit("ordersUpdated");
      res.json({ message: "Order updated", updated });
    } catch {
      res.status(500).json({ message: "Server error while updating" });
    }
  });

  // ✅ Mark a product as delivered (admin action)
  router.put("/bulk-status", async (req, res) => {
    try {
      const { ids, status } = req.body;
      await Order.updateMany(
        { _id: { $in: ids } },
        { $set: { status: status || "delivered" } }
      );
      io.emit("ordersUpdated");
      res.json({ message: "All products marked as delivered" });
    } catch {
      res.status(500).json({ message: "Failed to update multiple statuses" });
    }
  });


  return router;
};
