class statusHandler {
    constructor(status, content){
        this.status = status;
        this.content = content;
    }

    static newResponse(status, content){
        
        return new statusHandler(status, content);
    };

    static serviceError(error){
        console.error("Service error", error);

        if(error.status){

            return error;
        }

        return new statusHandler(500, "Erro interno");
    };

    static responseError (error, res){
        console.error("Response error", error);

        if(error.status){

            return res.status(error.status).send(error);
        }

        return res.status(500).send({status:500, content:"Erro interno"});
    }

};

module.exports = statusHandler;