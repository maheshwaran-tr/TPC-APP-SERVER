const errorHandler = (err, req, res, next) => {

    const statusCode = err.statusCode || 500; // Default to 500 if no status code is set
    
    // Log the error
    // console.error(`[${new Date().toISOString()}] ${err.message}`, {
    //     stack: err.stack,
    //     path: req.path,
    // });

    console.error(`${err.message}`, {path:req.path});

    // Send response
    res.status(statusCode).json({
        success: false,
        message: err.message,
    });
};

export default errorHandler;