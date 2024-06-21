"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_user = exports.replace_user = exports.ping_database = exports.resetTestDatabase = void 0;
var mongodb_1 = require("mongodb");
var util_1 = require("util");
var mongodb_ip = '127.0.0.1';
var mongodb_port = '27017';
var uri = "mongodb://".concat(mongodb_ip, ":").concat(mongodb_port);
var database_name = 'hello_database_test';
var new_mongodb_client = new mongodb_1.MongoClient(uri, {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
function resetTestDatabase(mongodb_client) {
    if (mongodb_client === void 0) { mongodb_client = new_mongodb_client; }
    return __awaiter(this, void 0, void 0, function () {
        var db, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 6]);
                    return [4 /*yield*/, mongodb_client.connect()];
                case 1:
                    _a.sent();
                    db = mongodb_client.db(database_name);
                    return [4 /*yield*/, db.collection('user_bios').deleteMany({})];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error resetting test database:', error_1);
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, mongodb_client.close()];
                case 5:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.resetTestDatabase = resetTestDatabase;
function ping_database(mongodb_client) {
    if (mongodb_client === void 0) { mongodb_client = new_mongodb_client; }
    return __awaiter(this, void 0, void 0, function () {
        var db, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 6]);
                    return [4 /*yield*/, mongodb_client.connect()];
                case 1:
                    _a.sent();
                    db = mongodb_client.db(database_name);
                    return [4 /*yield*/, db.command({ ping: 1 })];
                case 2:
                    _a.sent();
                    console.log("Pinged your deployment. You've successfully connected to MongoDB!");
                    return [3 /*break*/, 6];
                case 3:
                    error_2 = _a.sent();
                    console.log(error_2);
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, mongodb_client.close()];
                case 5:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.ping_database = ping_database;
function replace_user(name, bio, mongodb_client) {
    if (mongodb_client === void 0) { mongodb_client = new_mongodb_client; }
    return __awaiter(this, void 0, void 0, function () {
        var db, user_bios_collection, user_record, query, result, error_3, error_message;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!name || !bio) {
                        return [2 /*return*/, 'Name or bio missing'];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 7]);
                    return [4 /*yield*/, mongodb_client.connect()];
                case 2:
                    _a.sent();
                    db = mongodb_client.db(database_name);
                    user_bios_collection = db.collection('user_bios');
                    user_record = {
                        name: name,
                        bio: bio,
                    };
                    query = { name: name };
                    return [4 /*yield*/, user_bios_collection.replaceOne(query, user_record, {
                            upsert: true,
                        })];
                case 3:
                    result = _a.sent();
                    console.log("Modified ".concat(result.modifiedCount, " document(s)"));
                    if (result.modifiedCount == 0) {
                        return [2 /*return*/, 'New user added'];
                    }
                    else {
                        return [2 /*return*/, 'User bio updated'];
                    }
                    return [3 /*break*/, 7];
                case 4:
                    error_3 = _a.sent();
                    error_message = "Could not replace user: ".concat(error_3);
                    console.error(error_message);
                    return [2 /*return*/, error_message];
                case 5: return [4 /*yield*/, mongodb_client.close()];
                case 6:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.replace_user = replace_user;
function get_user(name, mongodb_client) {
    if (mongodb_client === void 0) { mongodb_client = new_mongodb_client; }
    return __awaiter(this, void 0, void 0, function () {
        var db, user_bios_collection, query, user_document;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, , 3, 5]);
                    return [4 /*yield*/, mongodb_client.connect()];
                case 1:
                    _a.sent();
                    db = mongodb_client.db(database_name);
                    user_bios_collection = db.collection('user_bios');
                    query = { name: name };
                    return [4 /*yield*/, user_bios_collection.findOne(query, {
                            projection: { _id: 0, name: 1, bio: 1 },
                        })];
                case 2:
                    user_document = _a.sent();
                    console.log("Retrieved document ".concat(util_1.default.inspect(user_document)));
                    return [2 /*return*/, user_document];
                case 3: return [4 /*yield*/, mongodb_client.close()];
                case 4:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.get_user = get_user;
