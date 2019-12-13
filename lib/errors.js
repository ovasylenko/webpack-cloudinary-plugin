class GeneralError extends Error {
    constructor(name, prefix, message) {
        super(`${prefix}: ${message}`);
        this.name = name;
    }
}

class FileNotFoundError extends GeneralError {
    constructor(prefix) {
        super("FileNotFoundError", prefix, "No files were found in the dist folder.");
    }
}

class AbsentCredentialsError extends GeneralError {
    constructor(prefix) {
        super("InvalidCredentialsError", prefix, "Credentials were not provided.");
    }
}

module.exports = {
    GeneralError,
    FileNotFoundError,
    AbsentCredentialsError
}