/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TaskController } from './../controllers/task.controller';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "CreateTaskDto": {
        "dataType": "refObject",
        "properties": {
            "title": {"dataType":"string","required":true},
            "description": {"dataType":"string"},
            "dueDate": {"dataType":"string"},
            "assignedTo": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TaskResponseDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "title": {"dataType":"string","required":true},
            "description": {"dataType":"string"},
            "dueDate": {"dataType":"string"},
            "status": {"dataType":"string","required":true},
            "createdBy": {"dataType":"string","required":true},
            "assignedTo": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TaskStatus": {
        "dataType": "refEnum",
        "enums": ["TODO","IN_PROGRESS","DONE","BLOCKED"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserRole": {
        "dataType": "refEnum",
        "enums": ["ADMIN","USER"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Task": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "created_at": {"dataType":"datetime","required":true},
            "updated_at": {"dataType":"datetime"},
            "deleted_at": {"dataType":"datetime"},
            "title": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "status": {"ref":"TaskStatus","required":true},
            "createdBy": {"ref":"User","required":true},
            "assignedTo": {"ref":"User","required":true},
            "dueDate": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "User": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "created_at": {"dataType":"datetime","required":true},
            "updated_at": {"dataType":"datetime"},
            "deleted_at": {"dataType":"datetime"},
            "name": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "role": {"ref":"UserRole","required":true},
            "assignedTasks": {"dataType":"array","array":{"dataType":"refObject","ref":"Task"},"required":true},
            "createdTasks": {"dataType":"array","array":{"dataType":"refObject","ref":"Task"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateTaskDto": {
        "dataType": "refObject",
        "properties": {
            "title": {"dataType":"string"},
            "description": {"dataType":"string"},
            "status": {"ref":"TaskStatus"},
            "assignedToId": {"dataType":"string"},
            "dueDate": {"dataType":"datetime"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsTaskController_createTask: Record<string, TsoaRoute.ParameterSchema> = {
                requestBody: {"in":"body","name":"requestBody","required":true,"ref":"CreateTaskDto"},
        };
        app.post('/tasks',
            ...(fetchMiddlewares<RequestHandler>(TaskController)),
            ...(fetchMiddlewares<RequestHandler>(TaskController.prototype.createTask)),

            async function TaskController_createTask(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsTaskController_createTask, request, response });

                const controller = new TaskController();

              await templateService.apiHandler({
                methodName: 'createTask',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsTaskController_getTasks: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/tasks',
            ...(fetchMiddlewares<RequestHandler>(TaskController)),
            ...(fetchMiddlewares<RequestHandler>(TaskController.prototype.getTasks)),

            async function TaskController_getTasks(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsTaskController_getTasks, request, response });

                const controller = new TaskController();

              await templateService.apiHandler({
                methodName: 'getTasks',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsTaskController_getTaskById: Record<string, TsoaRoute.ParameterSchema> = {
                taskId: {"in":"path","name":"taskId","required":true,"dataType":"string"},
        };
        app.get('/tasks/:taskId',
            ...(fetchMiddlewares<RequestHandler>(TaskController)),
            ...(fetchMiddlewares<RequestHandler>(TaskController.prototype.getTaskById)),

            async function TaskController_getTaskById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsTaskController_getTaskById, request, response });

                const controller = new TaskController();

              await templateService.apiHandler({
                methodName: 'getTaskById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsTaskController_updateTask: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                updateTaskDto: {"in":"body","name":"updateTaskDto","required":true,"ref":"UpdateTaskDto"},
        };
        app.put('/tasks/:id',
            ...(fetchMiddlewares<RequestHandler>(TaskController)),
            ...(fetchMiddlewares<RequestHandler>(TaskController.prototype.updateTask)),

            async function TaskController_updateTask(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsTaskController_updateTask, request, response });

                const controller = new TaskController();

              await templateService.apiHandler({
                methodName: 'updateTask',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsTaskController_deleteTask: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.delete('/tasks/:id',
            ...(fetchMiddlewares<RequestHandler>(TaskController)),
            ...(fetchMiddlewares<RequestHandler>(TaskController.prototype.deleteTask)),

            async function TaskController_deleteTask(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsTaskController_deleteTask, request, response });

                const controller = new TaskController();

              await templateService.apiHandler({
                methodName: 'deleteTask',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
