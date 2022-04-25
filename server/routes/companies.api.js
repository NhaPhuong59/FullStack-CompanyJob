const express = require("express");
const router = express.Router();
const fs = require("fs");
const { sendResponse, generateRandomHexString } = require("../helpers/uti");

let data;
try {
  const res = fs.readFileSync("data.json", "utf8");
  data = JSON.parse(res);
} catch (error) {
  console.log(error);
}

router.get("/", (req, res, next) => {
  try {
    let db;
    let { companies, jobs } = data;
    let { page, limit, city } = req.query;
    limit = limit || 20;
    page = page || 1;
    if (city) {
      let cityArray = city.split(",");
      let jobsfilter;
      let companiesfilter = companies;
      cityArray.forEach((city) => {
        jobsfilter = jobs
          .filter((job) => job.city === city)
          .map((job) => job.companyId);
        companiesfilter = companiesfilter.filter((company) =>
          jobsfilter.includes(company.id)
        );
      });
      db = companiesfilter;
    } else {
      db = companies;
    }
    const dataToRes = db.slice(limit * (page - 1), limit * page);
    return res.status(200).send({
      data: dataToRes,
      length: db.length,
      message: "Get data companies success",
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", (req, res, next) => {
  try {
    const { name, benefits, description, ratings, jobs } = req.body;
    if (!name || !benefits || !description || !ratings || !jobs) {
      const error = new Error("Missing info");
      error.statusCode = 400;
      throw error;
    }
    let dataToPost = data;
    let a = dataToPost.companies;
    const found = a.find((el) => el.name === name);
    if (found) {
      const error = new Error("Company is already exist");
      error.statusCode = 400;
      throw error;
    }
    const companyObj = {
      id: `_${generateRandomHexString(9)}`,
      name,
      benefits,
      description,
      ratings,
      jobs,
      numOfJobs: jobs.length,
      numOfRatings: ratings.length,
    };
    dataToPost.companies.push(companyObj);
    dataToPost = JSON.stringify(dataToPost);
    fs.writeFileSync("data.json", dataToPost);
    return sendResponse(200, companyObj, "Create company success", res, next);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    const { companies } = data;
    const message = `Get single company by id ${id}`;
    const selectedCompany = companies.find((student) => student.id === id);
    if (!selectedCompany) {
      message = "Student with given ID is not found";
    }
    return res.status(200).send({ data: selectedCompany || {}, message });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    let message = `Update single company by id ${id}`;
    let selectedCompany = data.companies;
    selectedCompany = selectedCompany.find((company) => company.id === id);
    if (!selectedCompany) {
      message = "Company with given ID is not found";
    }
    const { enterprise } = req.body;
    if (!enterprise) {
      const error = new Error("Missing info");
      error.statusCode = 400;
      throw error;
    }

    let dataUpdate = data;
    let dataCompanyUpdate = dataUpdate.companies;
    dataCompanyUpdate = dataCompanyUpdate.map((company) => {
      if (company.id === id) {
        company.enterprise = enterprise;
        return company;
      } else {
        return company;
      }
    });
    dataUpdate = { ...dataUpdate, companies: dataCompanyUpdate };
    dataUpdate = JSON.stringify(dataUpdate);
    fs.writeFileSync("data.json", dataUpdate);
    return sendResponse(200, dataCompanyUpdate, message, res, next);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", function (req, res, next) {
  try {
    const { id } = req.params;
    let selectedCompany = data.companies;
    const found = selectedCompany.find((company) => company.id === id);
    if (!found) {
      message = "Company with given ID is not found";
    }
    const { name } = req.body;
    if (!name) {
      const error = new Error("Missing info");
      error.statusCode = 400;
      throw error;
    }
    let dataToSave = data;
    let dataDeleted = selectedCompany.filter((e) => e.name !== name);
    console.log(dataDeleted.length);
    dataToSave = { ...dataToSave, companies: dataDeleted };
    dataToSave = JSON.stringify(dataToSave);
    fs.writeFileSync("data.json", dataToSave);
    return sendResponse(200, dataDeleted, "update success", res, next);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
