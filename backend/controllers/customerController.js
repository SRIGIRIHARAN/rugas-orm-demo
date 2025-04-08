const Customer = require('../models/Customer');

exports.createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json({
      status: "success",
      message: "Customer created successfully",
      data: customer,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json({
      status: "success",
      message: "Customers fetched successfully",
      data: customers,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({
        status: "error",
        message: "Customer not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Customer fetched successfully",
      data: customer,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({
      status: "success",
      message: "Customer updated successfully",
      data: customer,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
    if (!deletedCustomer) {
      return res.status(404).json({
        status: "error",
        message: "Customer not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Customer deleted successfully",
      data: deletedCustomer,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
