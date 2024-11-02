/**
 * @swagger
 *   /url:
 *     post:
 *       summary: Create a shortened URL and don't obligatory require authentication
 *       tags: [Url]
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   format: uri
 *                   description: The original URL to be shortened.
 *                   example: "https://www.google.com"
 *       responses:
 *         201:
 *           description: URL successfully shortened
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   url:
 *                     type: string
 *                     description: The shortened URL
 *                     example: "http://localhost/4ru9sT"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: The creation timestamp of the shortened URL
 *                     example: "2024-11-02T17:52:24.857Z"
 *                   userId:
 *                     type: integer
 *                     description: The ID of the authenticated user who created the URL
 *                     example: 1
 *         XXX:
 *           description: API Errors
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /url/{shortUrl}:
 *   get:
 *     summary: Redirect to the original URL using a shortened URL
 *     tags: [Url]
 *     parameters:
 *       - in: path
 *         name: shortUrl
 *         required: true
 *         description: The shortened URL code to be redirected.
 *         schema:
 *           type: string
 *           example: "4ru9sT"
 *     responses:
 *       302:
 *         description: Redirects to the original URL successfully.
 *         headers:
 *           Location:
 *             description: The original URL where the request will be redirected.
 *             schema:
 *               type: string
 *               example: "https://www.example.com"  # Substitua pelo valor real se necessário.
 *       XXX:
 *         description: API Errors
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /url:
 *   get:
 *     summary: Retrieve a list of authenticated user URLs
 *     tags: [Url]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: The page number to retrieve (default is 1).
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: The number of URLs to return per page (default is 10, maximum is 100).
 *     responses:
 *       200:
 *         description: A successful response containing a list of URLs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       urlId:
 *                         type: integer
 *                         description: The ID of the URL.
 *                       originalUrl:
 *                         type: string
 *                         description: The original URL.
 *                       shortUrl:
 *                         type: string
 *                         description: The shortened URL.
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: The creation timestamp of the URL.
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: The last update timestamp of the URL.
 *                       clickCount:
 *                         type: integer
 *                         description: The number of clicks on the shortened URL.
 *                 total:
 *                   type: integer
 *                   description: The total number of URLs for the user.
 *                 page:
 *                   type: integer
 *                   description: The current page number.
 *                 lastPage:
 *                   type: integer
 *                   description: The last page number available.
 *       XXX:
 *         description: API Errors
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
