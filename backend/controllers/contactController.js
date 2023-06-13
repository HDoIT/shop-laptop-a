const Contact = require("../models/contactModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Get All Contacts (Admin)
exports.getAllContacts = catchAsyncErrors(async (req, res, next) => {
  const contacts = await Contact.find();

  res.status(200).json({
    success: true,
    contacts,
  });
});

// Get Contact Details
exports.getContactDetails = catchAsyncErrors(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    return next(new ErrorHander("Không tìm thấy liên hệ này", 404));
  }

  res.status(200).json({
    success: true,
    contact,
  });
});

// Create Contact (User)
exports.createContact = catchAsyncErrors(async (req, res, next) => {
  const contact = await Contact.create(req.body);

  console.log(req.body)

  res.status(201).json({
    success: true,
    contact,
  });
});

// Update Contact -- Admin
exports.updateContact = catchAsyncErrors(async (req, res, next) => {
  let contact = await Contact.findById(req.params.id);

  if (!contact) {
    return next(new ErrorHander("Không tìm thấy liên hệ này", 404));
  }

  contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    contact,
  });
});

// Delete Contact
exports.deleteContact = catchAsyncErrors(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    return next(new ErrorHander("Không tìm thấy liên hệ", 404));
  }

  await contact.remove();

  res.status(200).json({
    success: true,
    message: "Xóa thành công liên hệ",
  });
});
