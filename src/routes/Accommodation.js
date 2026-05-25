const router = require("express").Router();
const controller = require("../controllers/AccommodationController");
const validateAccommodation = require("../middleware/validateAccommodation");

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.get("/user/:userId", controller.getByUserId);
router.post("/", validateAccommodation, controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
