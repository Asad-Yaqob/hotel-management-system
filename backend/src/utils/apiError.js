class ApiError extends Error {
  constructor(
    statusCode,
    message = 'Something wend wronge',
    errors = [],
    stack = ""
     ){
        super(message)
        this.message = message
        this.statusCode = statusCode,
        this.errors = errors 
        this.data = null
        this.success = false
        if (stack) {
            this.stack = stack
        } else{
            Error.captureStackTrace(this, this.constructor)
        }
  }
}