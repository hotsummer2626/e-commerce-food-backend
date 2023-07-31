const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const upload = async (req, res) => {
    let { publicId, folder } = req.body;

    const publicIdConfig = publicId
        ? { public_id: publicId.split("/")[1] }
        : {};
    const options = {
        overwrite: true,
        resource_type: "auto",
        folder,
        ...publicIdConfig,
    };

    try {
        const result = await cloudinary.uploader.upload(req.file.path, options);
        fs.unlink(req.file.path, () => {});
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

module.exports = {
    upload,
};
