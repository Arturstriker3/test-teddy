
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