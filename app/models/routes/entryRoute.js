const express=require('express')
const EntryCtl=require('../../controllers/EntryController');
const router=express.Router();
const error_handler=require("../../middleware/error_handler");
const auth_validate=require("../../middleware/auth_validate");
const Picture_upload=require("../../middleware/multer");
const entryValidator=require("../../controllers/validators/entryValidator");


router.get("/getAllEntries",
auth_validate, entryValidator.getAllEntriesValidator,
EntryCtl.getAllEntries,error_handler);
router.get("/getAllEntries/:pageNumber",
auth_validate, entryValidator.getAllEntriesValidator,
EntryCtl.getAllEntries,error_handler);
router.get("/getUserEntries",
auth_validate,entryValidator.getUserEntriesValidator,
EntryCtl.getUserEntries,error_handler)
router.get("/getUserEntries/:pageNumber",
auth_validate,entryValidator.getUserEntriesValidator,
EntryCtl.getUserEntries,error_handler)
router.post("/createEntry", 
auth_validate,entryValidator.createEntryValidator,
Picture_upload,EntryCtl.createEntry,error_handler)
router.post("/updateEntry",
auth_validate,
entryValidator.updateEntryValidator,
 Picture_upload,EntryCtl.updateEntry,error_handler)
router.post("/deleteEntry", 
auth_validate,entryValidator.deleteEntryValidator,
EntryCtl.deleteEntry,error_handler);
router.post("/approveEntry", 
auth_validate,entryValidator.approveEntryValidator,
EntryCtl.approveEntry,error_handler);

module.exports=router