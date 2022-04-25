const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next)=>{
    return res.status(200).send({key: "value"});
});
const companiesRoutes = require("./companies.api.js");
router.use("/companies", companiesRoutes);

module.exports = router;
