export function validateInputs(inputs, requiredFields) {
    for (const field of requiredFields) {
        if (!inputs[field]) {
            throw new Error(`${field} is required.`);
        }
    }
}