const router = require("express").Router();
const statusHandler = require("../helpers/helpers.statusHandler");
const {
    login,
    changePassword
} = require("./authentication.service");


router.post("/auth", async({body}, res)=>{
    try{

        const response = await login(body);

        return res.status(response.status).send(response);
    }catch(error){

        return statusHandler.responseError(error, res);
    }
});

router.put("/changePassword", async({headers, body}, res)=>{
    try{

        const response = await changePassword(body, headers);

        return res.status(response.status).send(response);
    }catch(error){

        return statusHandler.responseError(error, res);
    }
});

module.exports = router;