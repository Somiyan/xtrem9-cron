import * as _ from "lodash";
import fastify from "fastify";
const DevConfig = require("./config/development");
const StageConfig = require("./config/stage");
const ProdConfig = require("./config/deployment");



const server = fastify({ logger: true });

export class Env {
    private static _instance: Env;
    private config: any;

    constructor() {
        this.config = {};
    }

    public static get Instance(): Env {
        return this._instance || (this._instance = new this());
    }

    public get Config(): any {
        if (_.isEmpty(this.config)) {
            return this.setConfig();
        } else {
            return this.config;
        }
    }

    private setConfig() {
        if (process.env.NODE_ENV === "development") {
            this.config = DevConfig;
        } else if (process.env.NODE_ENV === "stage") {
            this.config = StageConfig;
        } else if (process.env.NODE_ENV === "production") {
            this.config = ProdConfig;
        }
        else {
            this.config = DevConfig;
        }
        return this.config;
    }
}