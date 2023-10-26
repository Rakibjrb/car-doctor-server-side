const {
  client,
  servicesCollection,
  ObjectId,
  ordersCollection,
} = require("../DB/db");
const sendResponse = require("../responseSend");

const rootGet = (req, res) => {
  sendResponse(res, [], 200, "Car doctor node server running fine");
};

const getAllServices = async (req, res) => {
  try {
    await client.connect();
    const data = await servicesCollection.find().toArray();
    sendResponse(res, data, 200, "data get successfully...");
  } catch (error) {
    console.log(error);
    sendResponse(res, [], 201, "something went wrong...");
  } finally {
    await client.close();
  }
};
const getService = async (req, res) => {
  const reqId = req.params.id;
  const filter = { _id: new ObjectId(reqId) };
  try {
    await client.connect();
    const data = await servicesCollection.findOne(filter);
    sendResponse(res, data, 200, "data get successfully...");
  } catch (error) {
    console.log(error);
    sendResponse(res, [], 201, "something went wrong...");
  } finally {
    await client.close();
  }
};

const postCheckout = async (req, res) => {
  const requestData = req.body;
  try {
    await client.connect();
    const serverResponse = await ordersCollection.insertOne(requestData);
    sendResponse(res, serverResponse, 200, "data post successfull...");
  } catch (error) {
    console.log(error);
    sendResponse(res, [], 201, "something went wrong...");
  } finally {
    await client.close();
  }
};

const getAllOrders = async (req, res) => {
  const filter = { userEmail: req.query.userEmail };
  try {
    await client.connect();
    const data = await ordersCollection.find(filter).toArray();
    sendResponse(res, data, 200, "data get successfully...");
  } catch (error) {
    console.log(error);
    sendResponse(res, [], 201, "something went wrong...");
  } finally {
    await client.close();
  }
};

const getAllOrdersForAdmin = async (req, res) => {
  try {
    await client.connect();
    const data = await ordersCollection.find().toArray();
    sendResponse(res, data, 200, "data get successfully...");
  } catch (error) {
    console.log(error);
    sendResponse(res, [], 201, "something went wrong...");
  } finally {
    await client.close();
  }
};

const deleteOneOrder = async (req, res) => {
  const reqId = req.params.id;
  const filter = { _id: new ObjectId(reqId) };
  try {
    await client.connect();
    const data = await ordersCollection.deleteOne(filter);
    sendResponse(res, data, 200, "data deleted successfully...");
  } catch (error) {
    console.log(error);
    sendResponse(res, [], 201, "something went wrong...");
  } finally {
    await client.close();
  }
};

const adminApprove = async (req, res) => {
  const requestData = req.body;
  const filter = { _id: new ObjectId(requestData.id) };
  const doc = {
    $set: {
      status: requestData.status,
    },
  };
  try {
    await client.connect();
    const data = await ordersCollection.updateOne(filter, doc);
    sendResponse(res, data, 200, "data deleted successfully...");
  } catch (error) {
    console.log(error);
    sendResponse(res, [], 201, "something went wrong...");
  } finally {
    await client.close();
  }
};

module.exports = {
  rootGet,
  getAllServices,
  getService,
  postCheckout,
  getAllOrders,
  deleteOneOrder,
  getAllOrdersForAdmin,
  adminApprove,
};
