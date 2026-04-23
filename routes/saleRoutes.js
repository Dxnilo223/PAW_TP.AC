var express = require("express");
const saleController = require("../controllers/sale");
const {
  requireAuth /* , requireAdmin */,
} = require("../middleWares/authenticationMW");
var router = express.Router();
//status
router.get("/status", requireAuth, saleController.status_list);
router.get("/status/create", requireAuth, saleController.status_create);
router.post("/status/save", requireAuth, saleController.status_save);
router.get("/status/:id", requireAuth, saleController.status_edit);
router.delete("/status/:id", requireAuth, saleController.status_delete);
router.post("/status/:id", requireAuth, saleController.status_update);
router.put("/status/:id", requireAuth, saleController.status_put);
router.get("/status/:id/check", requireAuth, saleController.check_status);

//sale
router.get("/", requireAuth, saleController.list);

//router.post("/", requireAuth, saleController.list_filter);

router.get("/create", requireAuth, saleController.create);

router.post("/save", requireAuth, saleController.save);

router.get("/:id", requireAuth, saleController.view);

//router.get("/edit/:id", requireAuth, saleController.edit);

router.post("/update/:id", requireAuth, saleController.update);
router.post("/:id/upload-proof", requireAuth, saleController.upload_image);

module.exports = router;