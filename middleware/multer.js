
const multer=require('multer');
const dateFormat=require('dateformat')    
  const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      if(req.originalUrl.indexOf('Entry') > 1 )
      {
      cb(null, 'images/entryPictures');
      }
      else if(req.originalUrl.indexOf('signUp') || req.originalUrl.indexOf('ProfilePicture') > 1 )
        { 
     cb(null, 'images/ProfilePictures');
        }
    },
    filename: (req, file, cb) => {
      cb(null, dateFormat(new Date().toISOString(), "yyyymmddhMMss") + '-' + file.originalname);
    }
  });

const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/jfif'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

   const multer_action= multer({storage:fileStorage,fileFilter:fileFilter}).single('picture')
  

   
 
    module.exports=multer_action