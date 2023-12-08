"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
function Api(path) {
    return function (target) {
        (0, swagger_1.ApiTags)(path)(target);
        (0, common_1.Controller)(path)(target);
    };
}
exports.Api = Api;
//# sourceMappingURL=api.js.map