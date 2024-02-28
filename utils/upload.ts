import multer from 'multer'

const attachmentsStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/attachments'); // Set your desired folder path
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
 
export const attachmentUpload = multer({ storage: attachmentsStorage });

const csvStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/csvs'); // Set your desired folder path
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
 
export const csvUpload = multer({ storage: csvStorage });