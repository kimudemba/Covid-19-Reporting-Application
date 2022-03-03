class RouteErrorHandler extends Error {
    constructor(message, errorCode) {
        super(message); // add message to the Error object
        this.statusCode = errorCode; //adds a code property to the Error object
    }
}
module.exports = RouteErrorHandler;