const noteService = require("../services/note.service");

exports.createNote = async (req, res) => {
  try {
    console.log("===== HEADERS =====");
    console.log(req.headers); // Xem toàn bộ header gửi từ frontend
    console.log("===================");

    const device =
      req.headers["user-agent"] || req.get("User-Agent") || "Unknown";

    console.log("Thiết bị (User-Agent):", device);

    const { name, phone, address } = req.body;

    if (!name || !phone || !address) {
      return res.status(400).json({
        success: false,
        message: "Thiếu thông tin từ frontend",
      });
    }

    const note = await noteService.createNote({
      name,
      phone,
      address,
      device,
      user_id: req.user?.id || null,
    });

    return res.json({
      success: true,
      message: "Đã lưu thông tin liên hệ",
      note_id: note.id,
    });
  } catch (error) {
    console.error("Lỗi contact API:", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};

exports.getAllNotes = async (req, res) => {
  try {
    const notes = await noteService.getAllNotes();

    return res.json({
      success: true,
      data: notes,
    });
  } catch (error) {
    console.error("Lỗi lấy danh sách Notes:", error);
    return res.status(500).json({
      success: false,
      message: "Không thể lấy dữ liệu thông báo",
    });
  }
};

exports.getNoteDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await noteService.getNoteById(id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy thông báo",
      });
    }

    return res.json({
      success: true,
      data: note,
    });
  } catch (error) {
    console.error("Lỗi lấy chi tiết Note:", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};

exports.markNoteAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    await noteService.markAsRead(id);
    return res.json({ success: true, message: "Đã đánh dấu đã đọc" });
  } catch (e) {
    return res.status(500).json({ success: false });
  }
};

exports.countUnread = async (req, res) => {
  const total = await noteService.countUnread();
  res.json({ success: true, total });
};
