const InvariantError = require('../../exceptions/InvariantError');
const {
    submissionQuerySchema,
    submissionIdSchema,
    createSubmissionSchema,
    approveSubmissionSchema,
    rejectSubmissionSchema
} = require('./schema');

const SubmissionValidator = {
    validateSubmissionQuery: (query) => {
        const result = submissionQuerySchema.validate(query);
        if (result.error) {
            throw new InvariantError(result.error.message);
        }
        return result.value;
    },

    validateSubmissionId: (params) => {
        const result = submissionIdSchema.validate(params);
        if (result.error) {
            throw new InvariantError(result.error.message);
        }
        return result.value;
    },

    validateCreateSubmission: (payload) => {
        const result = createSubmissionSchema.validate(payload);
        if (result.error) {
            throw new InvariantError(result.error.message);
        }
        return result.value;
    },

    validateApproveSubmission: (params) => {
        const result = approveSubmissionSchema.validate(params);
        if (result.error) {
            throw new InvariantError(result.error.message);
        }
        return result.value;
    },

    validateRejectSubmission: (params, body) => {
        const combined = { ...params, ...body };
        const result = rejectSubmissionSchema.validate(combined);
        if (result.error) {
            throw new InvariantError(result.error.message);
        }
        return result.value;
    }
};

module.exports = SubmissionValidator;