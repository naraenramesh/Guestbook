const multer=require('multer');

const dateFormat=require('dateformat')    

 

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

 

  const aws = require('aws-sdk');

  aws.config.update({

    accessKeyId: process.env.AWS_ACCESS_KEY_ID,

    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,

    region: process.env.AWS_REGION

  });

  

  

  const s3 = new aws.S3();

  const multerS3 = require('multer-s3');

  const path = require('path')

  

  let key;

  

  const upload = multer({

    limits: {

      fileSize: 1048576 // 1MB

    },

    fileFilter: fileFilter,

    storage: multerS3({

      s3: s3,

      bucket: 'guestentrybook',

      acl: 'public-read',

      cacheControl: 'max-age=31536000',

      contentType: multerS3.AUTO_CONTENT_TYPE,

      metadata: function (req, file, cb) {

        cb(null, {fieldName: file.fieldname});

      },

      key: function (req, file, cb) {

        const dateform=dateFormat(new Date().toISOString(), "yyyymmddhMMss")

        const fname=file.originalname

      if(req.originalUrl.indexOf('Entry') > 1 )

        {

          key = `images/entryPictures/${dateform}-${fname}`

      

        }

        else if(req.originalUrl.indexOf('signUp') || req.originalUrl.indexOf('ProfilePicture') > 1 )

          { 

       

       key = `images/profilePictures/${dateform}-${(file.originalname)}`

       

          }

          req.filepath=key

          cb(null, key);

      }

    })

  });


 

  const multer_action= upload.single("picture")

 

 

    module.exports=multer_action
