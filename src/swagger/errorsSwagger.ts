// Errors

/**
 * @swagger
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         errors:
 *           type: object
 *           properties:
 *             BadRequestError:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Custom message for Bad Request errors.
 *                   example: Invalid input data.
 *                 status:
 *                   type: integer
 *                   description: HTTP status code.
 *                   example: 400
 *             NotFoundError:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Custom message for Not Found errors.
 *                   example: Resource not found.
 *                 status:
 *                   type: integer
 *                   description: HTTP status code.
 *                   example: 404
 *             UnauthorizedError:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Custom message for Unauthorized errors.
 *                   example: Token expired or invalid.
 *                 status:
 *                   type: integer
 *                   description: HTTP status code.
 *                   example: 401
 *             ServiceUnavailableError:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Custom message for Service Unavailable errors.
 *                   example: Service is temporarily unavailable.
 *                 status:
 *                   type: integer
 *                   description: HTTP status code.
 *                   example: 503
 */
