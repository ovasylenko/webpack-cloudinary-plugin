export class GeneralError extends Error {
    constructor(name, prefix, message) {
        super(`${prefix}: ${message}`);
        this.name = name;
    }
}

export class FileNotFoundError extends GeneralError {
    constructor(prefix) {
        super("FileNotFoundError", prefix, "No files were found in the dist folder.");
    }
}

export class AbsentCredentialsError extends GeneralError {
    constructor(prefix) {
        super("InvalidCredentialsError", prefix, "Credentials were not provided.");
    }
}