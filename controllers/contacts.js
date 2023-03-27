const {
  contacts: { Contact },
} = require("../models");
const { ctrlWrapper, HttpError } = require("../helpers");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;

  const query = {
    owner,
  };

  if (favorite === "true") {
    query.favorite = true;
  }

  const result = await Contact.find(query, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email subscription");

  res.json({
    status: "success",
    code: 200,
    data: {
      contacts: result,
    },
  });
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  res.json({
    status: "success",
    code: 200,
    data: {
      contact: result,
    },
  });
};

const create = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      contact: result,
    },
  });
};

const remove = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  } else {
    res.json({ message: "contact deleted" });
  }
};

const update = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  res.json({
    status: "success",
    code: 200,
    data: {
      contact: result,
    },
  });
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  res.json({
    status: "success",
    code: 200,
    data: {
      contact: result,
    },
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  create: ctrlWrapper(create),
  remove: ctrlWrapper(remove),
  update: ctrlWrapper(update),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
