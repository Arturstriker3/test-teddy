// Models

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "John Doe"
 *         email:
 *           type: string
 *           example: "john.doe@example.com"
 *         password:
 *           type: string
 *           example: "securepassword"
 *         urls:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Url'
 *         isActive:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-11-02T12:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           example: "2024-11-02T12:00:00Z"
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           example: null
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Url:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         shortUrl:
 *           type: string
 *           example: "http://short.url/abc123"
 *         originalUrl:
 *           type: string
 *           example: "http://example.com/some/long/url"
 *         user:
 *           $ref: '#/components/schemas/User'
 *           nullable: true
 *         clickCount:
 *           type: integer
 *           example: 10
 *         isActive:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-11-02T12:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           example: "2024-11-02T12:00:00Z"
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           example: null
 */

// Errors

/**
 * @swagger
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: The error message.
 *           example: Not Authorized
 *         status:
 *           type: integer
 *           description: The HTTP status code of the error.
 *           example: 401
 */
