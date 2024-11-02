// Models

/**
 * @swagger
 * components:
 *   schemas:
 *     Log:
 *       type: object
 *       properties:
 *         ip:
 *           type: string
 *           description: User or author IP address.
 *         user:
 *           type: string
 *           description: Name of the user or author of the event.
 *         description:
 *           type: string
 *           description: Specific description of the event.
 *         geolocation:
 *           type: object
 *           properties:
 *             latitude:
 *               type: number
 *               description: Latitude of the event.
 *             longitude:
 *               type: number
 *               description: Longitude of the event.
 *         navMetadata:
 *           type: object
 *           properties:
 *             userAgent:
 *               type: string
 *               description: Browser User Agent.
 *             browser:
 *               type: string
 *               description: Browser name.
 *             os:
 *               type: string
 *               description: Operating system.
 *         extraMetaData:
 *           type: string
 *           description: Extra metadata information.
 *         timestampUTC:
 *           type: string
 *           format: date-time
 *           description: Log UTC timestamp.
 *         severity:
 *           type: string
 *           enum:
 *             - low
 *             - medium
 *             - high
 *             - critical
 *           description: Log severity level. Possible values are 'low', 'medium', 'high', 'critical'. Default is 'medium'.
 *       required:
 *         - ip
 *         - description
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
*           example: The IP is mandatory and must be a valid IPv4 or IPv6 address.
*         status:
*           type: integer
*           description: The HTTP status code of the error.
*           example: 400
*/