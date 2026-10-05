const { Note } = require("../../models");

exports.createNote = async ({
  name,
  phone,
  address,
  device,
  user_id = null,
}) => {
  return await Note.create({
    title: "Khách hàng gửi liên hệ",
    content: `Họ tên: ${name} | SĐT: ${phone} | Địa chỉ: ${address}`,
    device: device,
    user_id,
  });
};

exports.getAllNotes = async () => {
  return await Note.findAll({
    order: [["createdAt", "DESC"]],
  });
};

exports.getNoteById = async (id) => {
  return await Note.findByPk(id);
};

exports.markAsRead = async (id) => {
  return await Note.update({ is_read: true }, { where: { id } });
};

exports.countUnread = async () => {
  return await Note.count({ where: { is_read: false } });
};