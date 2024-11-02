
// POST Method

/**
 * @swagger
 * /logs:
 *   post:
 *     summary: Create a new log entry
 *     tags: [Log record]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ip:
 *                 type: string
 *                 description: The IP address of the user.
 *                 example: 192.168.1.1
 *               user:
 *                 type: string
 *                 description: The user associated with the log entry.
 *                 example: john_doe
 *               description:
 *                 type: string
 *                 description: A description of the log entry.
 *                 example: User logged in
 *               geolocation:
 *                 type: object
 *                 properties:
 *                   latitude:
 *                     type: number
 *                     description: Latitude of the user's location.
 *                     example: 37.7749
 *                   longitude:
 *                     type: number
 *                     description: Longitude of the user's location.
 *                     example: -122.4194
 *               navMetadata:
 *                 type: object
 *                 properties:
 *                   userAgent:
 *                     type: string
 *                     description: User agent string of the browser.
 *                     example: Mozilla/5.0
 *                   browser:
 *                     type: string
 *                     description: Browser used by the user.
 *                     example: Chrome
 *                   os:
 *                     type: string
 *                     description: Operating system of the user.
 *                     example: Windows 10
 *               extraMetaData:
 *                 type: string
 *                 description: Extra metadata information.
 *                 example: tags, finance, report
 *               severity:
 *                 type: string
 *                 description: The severity level of the log entry.
 *                 example: high
 *     responses:
 *       201:
 *         description: Log entry created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Log'
 *       400:
 *         description: Bad request due to invalid input.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**

 * @swagger
 * components:
 *   schemas:
 *     Log:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier of the log entry.
 *           example: 66c4932bf007c2bfe03e6b3f3
 *         ip:
 *           type: string
 *           description: The IP address of the user.
 *           example: 192.168.1.1
 *         user:
 *           type: string
 *           description: The user associated with the log entry.
 *           example: john_doe
 *         description:
 *           type: string
 *           description: A description of the log entry.
 *           example: User logged in
 *         geolocation:
 *           type: object
 *           properties:
 *             latitude:
 *               type: number
 *               description: Latitude of the user's location.
 *               example: 37.7749
 *             longitude:
 *               type: number
 *               description: Longitude of the user's location.
 *               example: -122.4194
 *         navMetadata:
 *           type: object
 *           properties:
 *             userAgent:
 *               type: string
 *               description: User agent string of the browser.
 *               example: Mozilla/5.0
 *             browser:
 *               type: string
 *               description: Browser used by the user.
 *               example: Chrome
 *             os:
 *               type: string
 *               description: Operating system of the user.
 *               example: Windows 10
 *         extraMetaData:
 *           type: string
 *           description: Extra metadata information.
 *         timestampUTC:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the log entry was created.
 *           example: 2024-08-20T14:25:00Z
 *         severity:
 *           type: string
 *           description: The severity level of the log entry.
 *           example: high
 */

// GET Method

/**
 * @swagger
 * /logs/{ObjectId}:
 *   get:
 *     summary: Retrieve a single log entry by ObjectId
 *     tags: [Log retrieve]
 *     parameters:
 *       - in: path
 *         name: ObjectId
 *         required: true
 *         description: The unique identifier of the log entry.
 *         schema:
 *           type: string
 *           example: 60b8d295f1b2c64e4a6c20f3
 *     responses:
 *       200:
 *         description: Log entry retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Log'
 *       400:
 *         description: Bad request due to invalid log ID format.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Log entry not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /logs/paginated-by-body:
 *   get:
 *     summary: Retrieve paginated logs with pagination information in body
 *     tags: [Deprecated Log retrieve]
 *     description: Get a list of logs with pagination
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         required: true
 *         description: The page number to retrieve
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         required: true
 *         description: The number of logs per page
 *     responses:
 *       200:
 *         description: A list of logs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalItems:
 *                   type: integer
 *                   description: The total number of logs
 *                   example: 100
 *                 currentPage:
 *                   type: integer
 *                   description: The current page number
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   description: The total number of pages
 *                   example: 10
 *                 logs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 66c4a5f9e572c304eb059c35
 *                       message:
 *                         type: string
 *                         example: 'Log message example'
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: '2024-08-20T12:00:00Z'
 *       400:
 *         description: Invalid page or limit number
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Invalid page number'
 */

/**
 * @swagger
 * /logs/paginated-by-header:
 *   get:
 *     summary: Retrieve paginated logs with pagination information in headers
 *     tags: [Deprecated Log retrieve]
 *     description: Get a list of logs with pagination details provided in response header
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         required: true
 *         description: The page number to retrieve
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         required: true
 *         description: The number of logs per page
 *     responses:
 *       200:
 *         description: A list of logs with pagination headers
 *         headers:
 *           X-Total-Items:
 *             description: The total number of logs
 *             schema:
 *               type: integer
 *               example: 100
 *           X-Current-Page:
 *             description: The current page number
 *             schema:
 *               type: integer
 *               example: 1
 *           X-Total-Pages:
 *             description: The total number of pages
 *             schema:
 *               type: integer
 *               example: 10
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 logs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       message:
 *                         type: string
 *                         example: 'Log message example'
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: '2024-08-20T12:00:00Z'
 *       400:
 *         description: Invalid page or limit number
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Invalid page number'
 */

/**
* @swagger
* /logs/period-paginated-by-body:
*   get:
*     summary: Get logs within a specific date range with pagination information in body
*     tags: [Deprecated Log retrieve]
*     description: Retrieves logs within the specified startDate and endDate.
*     parameters:
*       - name: startDate
*         example: '2024/08/19'
*         in: query
*         description: Start date of the period (ISO 8601 format).
*         required: true
*         schema:
*           type: string
*           format: date-time
*       - name: endDate
*         example: '2024/08/21'
*         in: query
*         description: End date of the period (ISO 8601 format).
*         required: true
*         schema:
*           type: string
*           format: date-time
*       - name: page
*         example: 1
*         in: query
*         description: Page number for pagination.
*         required: false
*         schema:
*           type: integer
*       - name: limit
*         example: 10
*         in: query
*         description: Number of items per page for pagination.
*         required: false
*         schema:
*           type: integer
*     responses:
*       200:
*         description: A list of logs.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 totalItems:
*                   type: integer
*                 totalPages:
*                   type: integer
*                 currentPage:
*                   type: integer
*                 logs:
*                   type: array
*                   items:
*                     type: object
*                     properties:
*                       _id:
*                         type: string
*                       ip:
*                         type: string
*                       user:
*                         type: string
*                       description:
*                         type: string
*                       geolocation:
*                         type: object
*                         properties:
*                           latitude:
*                             type: number
*                           longitude:
*                             type: number
*                       navMetadata:
*                         type: object
*                         properties:
*                           userAgent:
*                             type: string
*                           browser:
*                             type: string
*                           os:
*                             type: string
*                       timestampUTC:
*                         type: string
*                         format: date-time
*                       severity:
*                         type: string
*       400:
*         description: Bad request due to invalid input.
*       500:
*         description: Internal server error.
*/

/**
* @swagger
* /logs/period-paginated-by-header:
*   get:
*     summary: Retrieve paginated logs with pagination information in headers
*     tags: [Deprecated Log retrieve]
*     description: Get a list of logs with pagination details provided in response headers.
*     parameters:
*       - name: startDate
*         example: '2024/08/19'
*         in: query
*         description: Start date of the period (ISO 8601 format).
*         required: true
*         schema:
*           type: string
*           format: date-time
*       - name: endDate
*         example: '2024/08/21'
*         in: query
*         description: End date of the period (ISO 8601 format).
*         required: true
*         schema:
*           type: string
*           format: date-time
*       - in: query
*         name: page
*         schema:
*           type: integer
*           example: 1
*         required: true
*         description: The page number to retrieve.
*       - in: query
*         name: limit
*         schema:
*           type: integer
*           example: 10
*         required: true
*         description: The number of logs per page.
*     responses:
*       200:
*         description: A list of logs with pagination headers.
*         headers:
*           X-Total-Items:
*             description: The total number of logs.
*             schema:
*               type: integer
*               example: 100
*           X-Current-Page:
*             description: The current page number.
*             schema:
*               type: integer
*               example: 1
*           X-Total-Pages:
*             description: The total number of pages.
*             schema:
*               type: integer
*               example: 10
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 logs:
*                   type: array
*                   items:
*                     type: object
*                     properties:
*                       _id:
*                         type: string
*                         example: 66c4a5f9e572c304eb059c35
*                       ip:
*                         type: string
*                         example: 192.168.1.1
*                       user:
*                         type: string
*                         example: john_doe
*                       description:
*                         type: string
*                         example: User logged in
*                       geolocation:
*                         type: object
*                         properties:
*                           latitude:
*                             type: number
*                             example: 37.7749
*                           longitude:
*                             type: number
*                             example: -122.4194
*                       navMetadata:
*                         type: object
*                         properties:
*                           userAgent:
*                             type: string
*                             example: Mozilla/5.0
*                           browser:
*                             type: string
*                             example: Chrome
*                           os:
*                             type: string
*                             example: Windows 10
*                       timestampUTC:
*                         type: string
*                         format: date-time
*                         example: 2024-08-20T14:25:00Z
*                       severity:
*                         type: string
*                         example: high
*       400:
*         description: Invalid page or limit number.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   example: Invalid page number.
*/

/**
* @swagger
* /logs/search-by:
*   get:
*     summary: "Retrieve logs by query parameters with pagination"
*     tags: [Deprecated Log retrieve]
*     description: "Retrieve logs from the database based on the provided query parameters with pagination support. Supports filtering by IP address, user, and description."
*     parameters:
*       - in: query
*         name: ip
*         schema:
*           type: string
*         description: "The IP address to filter logs by. Must be a valid IPv4 or IPv6 address."
*       - in: query
*         name: user
*         schema:
*           type: string
*         description: "The username to filter logs by."
*       - in: query
*         name: description
*         schema:
*           type: string
*         description: "The description to filter logs by."
*       - in: query
*         name: page
*         schema:
*           type: integer
*           format: int32
*           default: 1
*         description: "The page number for pagination."
*       - in: query
*         name: limit
*         schema:
*           type: integer
*           format: int32
*           default: 10
*         description: "The number of items per page."
*     responses:
*       200:
*         description: "A paginated list of logs matching the provided criteria."
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 totalItems:
*                   type: integer
*                   example: 100
*                 totalPages:
*                   type: integer
*                   example: 10
*                 currentPage:
*                   type: integer
*                   example: 1
*                 logs:
*                   type: array
*                   items:
*                     $ref: '#/components/schemas/Log'
*       400:
*         description: "Bad request. Validation failed."
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*       404:
*         description: "No logs found matching the criteria."
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*       500:
*         description: "Internal server error."
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*/

/**
 * @swagger
 * /logs:
 *   get:
 *     summary: Retrieve logs based on dynamic query parameters (period, IP, user, description)
 *     tags: [Log retrieve]
 *     parameters:
 *       - in: query
 *         name: paginated
 *         required: true
 *         description: Defines if the response should include pagination details in the body or header.
 *         schema:
 *           type: string
 *           enum: [body, header]
 *           example: body
 *       - in: query
 *         name: page
 *         required: false
 *         description: The page number to retrieve (for pagination).
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         description: The number of logs to retrieve per page.
 *         schema:
 *           type: integer
 *           example: 10
 *       - in: query
 *         name: startDate
 *         required: false
 *         description: The start date for the log search (ISO format).
 *         schema:
 *           type: string
 *           format: date-time
 *           example: 2024/09/01
 *       - in: query
 *         name: endDate
 *         required: false
 *         description: The end date for the log search (ISO format).
 *         schema:
 *           type: string
 *           format: date-time
 *           example: 2024/09/30
 *       - in: query
 *         name: ip
 *         required: false
 *         description: Filter logs by a specific IP address (IPv4 or IPv6).
 *         schema:
 *           type: string
 *           example: 192.168.0.1
 *       - in: query
 *         name: user
 *         required: false
 *         description: Filter logs by a specific user.
 *         schema:
 *           type: string
 *           example: johndoe
 *       - in: query
 *         name: description
 *         required: false
 *         description: Filter logs by a specific description.
 *         schema:
 *           type: string
 *           example: User logged in
 *     responses:
 *       200:
 *         description: Logs retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalItems:
 *                   type: integer
 *                   description: Total number of log entries matching the query.
 *                   example: 100
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages.
 *                   example: 10
 *                 currentPage:
 *                   type: integer
 *                   description: The current page number.
 *                   example: 1
 *                 logs:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Log'
 *       400:
 *         description: Bad request due to invalid query parameters.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: No logs found matching the query.
 */